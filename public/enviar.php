<?php
/**
 * Form Handler para MR ATEducativa
 * 
 * Seguridad implementada:
 * - Rate limiting por IP
 * - Honeypot anti-bot
 * - Time-based bot detection
 * - Sanitización de inputs
 * - Validación de email
 * - Protección contra inyección de headers
 * - CSRF token validation
 * - Validación de longitud máxima
 */

header('Content-Type: application/json; charset=UTF-8');

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

// ─── Configuration ───
require __DIR__ . '/config-form.php';

// Validar configuración
if (empty($DEST_EMAIL) || empty($FROM_EMAIL)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error de configuración del servidor.']);
    error_log('MR Ateducativa: Configuración de email faltante');
    exit;
}

$RATE_DIR = sys_get_temp_dir() . '/mr_ateducativa_rate';

// Crear directorio si no existe
if (!is_dir($RATE_DIR)) {
    mkdir($RATE_DIR, 0700, true);
}

// ─── CSRF Token Validation ───
if (empty($_POST['csrf_token']) || !isset($_COOKIE['csrf_token'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Token de seguridad inválido.']);
    exit;
}

if ($_POST['csrf_token'] !== $_COOKIE['csrf_token']) {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Token de seguridad inválido.']);
    exit;
}

// ─── Rate Limiting ───
$rawIp = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rawIp = trim(explode(',', $rawIp)[0]);
$safeIp = preg_replace('/[^0-9a-fA-F.:]/', '', $rawIp);
$rateFile = $RATE_DIR . '/rl_' . md5($safeIp);

$now = time();
$attempts = [];

// Leer intentos anteriores con file locking
if (file_exists($rateFile)) {
    $fp = fopen($rateFile, 'r');
    if (flock($fp, LOCK_SH)) {
        $data = fread($fp, filesize($rateFile) ?: 1);
        flock($fp, LOCK_UN);
        fclose($fp);
        if ($data !== '') {
            foreach (explode(',', $data) as $ts) {
                $ts = (int) $ts;
                if (($now - $ts) < $RATE_WINDOW) {
                    $attempts[] = $ts;
                }
            }
        }
    } else {
        fclose($fp);
    }
}

// Verificar límite
if (count($attempts) >= $RATE_LIMIT) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Demasiados intentos. Por favor, inténtelo de nuevo más tarde.']);
    exit;
}

// ─── Helpers ───
function sanitize($data) {
    if (!is_string($data)) return '';
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    return $data;
}

function sanitizeHeader($data) {
    // Eliminar CR, LF y variantes URL-encoded para prevenir inyección de headers
    return str_replace(["\r", "\n", '%0a', '%0A', '%0d', '%0D'], '', $data);
}

function validateMaxLength($data, $maxLength) {
    return mb_strlen($data, 'UTF-8') <= $maxLength;
}

// ─── Honeypot check ───
if (!empty($_POST['website']) || !empty($_POST['botcheck'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Envío no permitido.']);
    exit;
}

// ─── Time-based bot detection ───
$submitTime = (int) ($_POST['submit_time'] ?? 0);
if ($submitTime > 0 && (time() - $submitTime) < $MIN_SUBMIT_TIME) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Envío rechazado. Por favor, inténtelo de nuevo.']);
    exit;
}

// ─── Collect and sanitize form data ───
$formType = sanitize($_POST['form_type'] ?? 'contact');
$name = sanitize($_POST['nombre'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$phone = sanitize($_POST['telefono'] ?? '');
$institution = sanitize($_POST['institucion'] ?? '');
$cargo = sanitize($_POST['cargo'] ?? '');
$tipoAyuda = sanitize($_POST['tipo_ayuda'] ?? '');
$mensaje = sanitize($_POST['mensaje'] ?? '');
$colegio = sanitize($_POST['colegio'] ?? '');
$comunaRegion = sanitize($_POST['comuna_region'] ?? '');
$numAlumnos = sanitize($_POST['num_alumnos'] ?? '');

// Áreas de interés (puede ser array)
$areasInteres = [];
if (isset($_POST['area_interes'])) {
    if (is_array($_POST['area_interes'])) {
        foreach ($_POST['area_interes'] as $area) {
            $areasInteres[] = sanitize($area);
        }
    } else {
        $areasInteres[] = sanitize($_POST['area_interes']);
    }
}

// ─── Validate required fields ───
$errors = [];

if (empty($name)) {
    $errors[] = 'El nombre es obligatorio.';
} elseif (!validateMaxLength($name, 100)) {
    $errors[] = 'El nombre es demasiado largo.';
}

if (empty($email)) {
    $errors[] = 'El correo electrónico es obligatorio.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'El correo electrónico no es válido.';
} elseif (!validateMaxLength($email, 254)) {
    $errors[] = 'El correo electrónico es demasiado largo.';
}

if (!empty($phone) && !validateMaxLength($phone, 20)) {
    $errors[] = 'El teléfono es demasiado largo.';
}

if (!empty($mensaje) && !validateMaxLength($mensaje, 2000)) {
    $errors[] = 'El mensaje es demasiado largo.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// ─── Record rate limit attempt ───
$attempts[] = $now;
$fp = fopen($rateFile, 'c');
if (flock($fp, LOCK_EX)) {
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, implode(',', $attempts));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
} else {
    fclose($fp);
}

// ─── Build email content ───
$safeEmail = sanitizeHeader($email);
$safeName = sanitizeHeader($name);

if ($formType === 'diagnostico') {
    $subject = '[MR ATEducativa] Solicitud de diagnóstico gratuito — ' . $name;
    $body = "═══════════════════════════════════════\n";
    $body .= "  MR ATEducativa — Diagnóstico Gratuito\n";
    $body .= "═══════════════════════════════════════\n\n";
    $body .= "───────────────────────────────────────\n";
    $body .= "  DATOS DEL CONTACTO\n";
    $body .= "───────────────────────────────────────\n";
    $body .= "  Nombre:        {$name}\n";
    $body .= "  Email:         {$email}\n";
    if (!empty($phone))         $body .= "  Teléfono:      {$phone}\n";
    if (!empty($colegio))       $body .= "  Colegio:       {$colegio}\n";
    if (!empty($comunaRegion))  $body .= "  Comuna/Región: {$comunaRegion}\n";
    if (!empty($numAlumnos))    $body .= "  N° Alumnos:    {$numAlumnos}\n";
    $body .= "\n";
    
    if (!empty($areasInteres)) {
        $body .= "───────────────────────────────────────\n";
        $body .= "  ÁREAS DE INTERÉS\n";
        $body .= "───────────────────────────────────────\n";
        foreach ($areasInteres as $area) {
            $body .= "  • {$area}\n";
        }
        $body .= "\n";
    }
    
    $body .= "═══════════════════════════════════════\n";
    $body .= "Enviado: " . date('Y-m-d H:i:s') . "\n";
    $body .= "IP: " . $safeIp . "\n";
    $body .= "═══════════════════════════════════════\n";
    
} else {
    // Formulario de contacto general
    $subject = '[MR ATEducativa] Nueva consulta desde el sitio web';
    $body = "═══════════════════════════════════════\n";
    $body .= "  MR ATEducativa — Consulta General\n";
    $body .= "═══════════════════════════════════════\n\n";
    $body .= "───────────────────────────────────────\n";
    $body .= "  DATOS DEL CONTACTO\n";
    $body .= "───────────────────────────────────────\n";
    $body .= "  Nombre:        {$name}\n";
    $body .= "  Email:         {$email}\n";
    if (!empty($phone))         $body .= "  Teléfono:      {$phone}\n";
    if (!empty($institution))   $body .= "  Institución:   {$institution}\n";
    if (!empty($cargo))         $body .= "  Cargo:         {$cargo}\n";
    if (!empty($tipoAyuda))     $body .= "  Tipo de ayuda: {$tipoAyuda}\n";
    $body .= "\n";
    
    if (!empty($mensaje)) {
        $body .= "───────────────────────────────────────\n";
        $body .= "  MENSAJE\n";
        $body .= "───────────────────────────────────────\n";
        $body .= "  {$mensaje}\n\n";
    }
    
    $body .= "═══════════════════════════════════════\n";
    $body .= "Enviado: " . date('Y-m-d H:i:s') . "\n";
    $body .= "IP: " . $safeIp . "\n";
    $body .= "═══════════════════════════════════════\n";
}

// ─── Send email ───
$headers = "From: {$FROM_EMAIL}\r\n";
$headers .= "Reply-To: {$safeEmail}\r\n";
$headers .= "Return-Path: {$FROM_EMAIL}\r\n";
$headers .= "X-Mailer: MR-ATEducativa-ContactForm/1.0\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

$success = mail($DEST_EMAIL, $subject, $body, $headers);

if ($success) {
    echo json_encode([
        'success' => true,
        'message' => '¡Gracias! Tu solicitud fue enviada correctamente. Te contactaremos pronto.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'No se pudo enviar el correo. Intente nuevamente más tarde.'
    ]);
    error_log('MR Ateducativa: Error al enviar email desde ' . $email);
}

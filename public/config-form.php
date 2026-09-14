<?php
/**
 * Configuración de formularios para MR ATEducativa
 * 
 * IMPORTANTE: Cambia estos valores antes de subir a producción
 */

// ── Email Configuration ───
// Correo donde se recibirán los formularios
$DEST_EMAIL = 'Info@mr-ateducativa.cl';

// Correo que aparecerá como remitente (debe existir en el hosting)
$FROM_EMAIL = 'noreply@mr-ateducativa.cl';

// ─── Rate Limiting ───
// Máximo de envíos por IP
$RATE_LIMIT = 5;

// Ventana de tiempo en segundos (1 hora)
$RATE_WINDOW = 3600;

// ─── Bot Detection ───
// Tiempo mínimo en segundos para llenar el formulario
// Un humano necesita al menos 3-5 segundos, los bots lo hacen en < 1 segundo
$MIN_SUBMIT_TIME = 3;

// ─── Form Validation ───
// Longitudes máximas permitidas
$MAX_LENGTHS = [
    'nombre' => 100,
    'email' => 254,
    'telefono' => 20,
    'institucion' => 150,
    'mensaje' => 2000,
    'colegio' => 150,
    'comuna_region' => 100,
];

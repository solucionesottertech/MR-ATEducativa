export interface ServiceArea {
  slug: string;
  name: string;
  tagline: string;
  color: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  icon: string;
  iconPath: string;
  subdimensions: Subdimension[];
}

export interface Subdimension {
  name: string;
  services: string[];
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'liderazgo',
    name: 'Liderazgo',
    tagline: 'Sostenedores y equipos directivos que movilizan la mejora.',
    color: 'primary',
    description: 'Fortalecemos a quienes lideran la mejora educativa. Acompañamos a directores, equipos directivos y líderes intermedios en el desarrollo de capacidades para conducir sus instituciones, fortalecer sus equipos y transformar los desafíos cotidianos en oportunidades de mejora.',
    metaDescription: 'Asesoría en liderazgo institucional para colegios en Chile. Liderazgo directivo, sostenedor, planificación estratégica con MR Ateducativa.',
    keywords: ['liderazgo institucional', 'liderazgo directivo', 'sostenedor', 'planificación estratégica', 'coaching directivo'],
    icon: '⭐',
    iconPath: '/iconos/liderazgo.svg',
    subdimensions: [
      {
        name: 'Liderazgo del sostenedor',
        services: [
          'Asesoría y acompañamiento al sostenedor',
          'Definición de roles y atribuciones sostenedor–dirección',
          'Acompañamiento en procesos de transición y sucesión directiva',
          'Gestión del cambio organizacional',
        ],
      },
      {
        name: 'Liderazgo del director',
        services: [
          'Mentoría y coaching directivo',
          'Desarrollo de competencias de liderazgo',
          'Liderazgo pedagógico y estratégico',
          'Coaching ejecutivo para líderes educativos',
          'Fortalecimiento de equipos de gestión',
          'Liderazgo distribuido y delegación efectiva',
          'Organización y funcionamiento del equipo directivo',
          'Gestión efectiva de reuniones y acuerdos',
          'Gestión del tiempo y priorización estratégica',
          'Comunicación efectiva y retroalimentación',
          'Gestión de conflictos',
          'Toma de decisiones basada en evidencia',
          'Desarrollo de liderazgos intermedios',
          'Definición y actualización de perfiles de cargo',
          'Evaluación y retroalimentación del desempeño',
        ],
      },
      {
        name: 'Planificación y gestión de resultados',
        services: [
          'Elaboración y actualización del PME',
          'Planificación estratégica institucional',
          'Acompañamiento en el ciclo completo de mejora',
          'Definición de metas e indicadores',
          'Diseño de sistemas de seguimiento',
          'Seguimiento y monitoreo de acciones',
          'Evaluación de resultados',
        ],
      },
    ],
  },
  {
    slug: 'gestion-pedagogica',
    name: 'Gestión Pedagógica',
    tagline: 'Prácticas que impactan directamente en el aprendizaje.',
    color: 'rosa',
    description: 'Asesoramos a equipos técnico-pedagógicos y docentes para fortalecer la gestión curricular, la enseñanza, la evaluación y los procesos de acompañamiento pedagógico.',
    metaDescription: 'Asesoría pedagógica para colegios en Chile. Gestión curricular, acompañamiento docente, análisis SIMCE con MR Ateducativa.',
    keywords: ['asesoría pedagógica', 'gestión curricular', 'acompañamiento docente', 'SIMCE', 'resultados aprendizaje'],
    icon: '',
    iconPath: '/iconos/pedagogica.svg',
    subdimensions: [
      {
        name: 'Gestión pedagógica y curricular',
        services: [
          'Diagnóstico de la gestión pedagógica',
          'Fortalecimiento de la Unidad Técnico-Pedagógica',
          'Gestión y apropiación curricular',
          'Cobertura curricular',
          'Planificación de la enseñanza',
          'Evaluación para el aprendizaje',
          'Estrategias de enseñanza efectiva',
          'Desarrollo de habilidades de comprensión lectora',
          'Estrategias para el fortalecimiento de aprendizajes',
          'Trabajo colaborativo docente',
          'Comunidades profesionales de aprendizaje',
          'Articulación entre ciclos y niveles',
          'Diseño de planes de mejoramiento pedagógico',
        ],
      },
      {
        name: 'Acompañamiento al aula',
        services: [
          'Observación y retroalimentación de clases',
          'Desarrollo de pautas de observación',
          'Análisis de prácticas pedagógicas',
          'Uso de evidencias para la toma de decisiones pedagógicas',
        ],
      },
      {
        name: 'Análisis de datos y resultados',
        services: [
          'Análisis de resultados SIMCE',
          'Análisis de Indicadores de Desarrollo Personal y Social (IDPS)',
          'Análisis histórico y evolución de resultados',
          'Identificación de tendencias y brechas',
          'Comparaciones con referentes nacionales',
          'Elaboración de informes ejecutivos',
          'Construcción de indicadores institucionales',
          'Tableros de seguimiento',
          'Diseño de planes de acción derivados de resultados',
        ],
      },
    ],
  },
  {
    slug: 'formacion-convivencia',
    name: 'Formación y Convivencia',
    tagline: 'De la gestión de casos a la construcción de capacidades institucionales.',
    color: 'naranja',
    description: 'Acompañamos a los establecimientos para avanzar desde una convivencia centrada exclusivamente en la resolución de situaciones particulares hacia una gestión preventiva, formativa e institucional.',
    metaDescription: 'Asesoría en convivencia escolar para colegios en Chile. Clima escolar, inclusión, desarrollo profesional docente con MR Ateducativa.',
    keywords: ['convivencia escolar', 'clima escolar', 'inclusión educativa', 'desarrollo docente', 'carrera docente'],
    icon: '🤝',
    iconPath: '/iconos/convivencia.svg',
    subdimensions: [
      {
        name: 'Convivencia educativa e inclusión',
        services: [
          'Diagnóstico de convivencia educativa',
          'Fortalecimiento de equipos de convivencia',
          'Asesoría a equipos psicosociales',
          'Gestión institucional de la convivencia',
          'Prevención y abordaje de conflictos',
          'Resolución colaborativa de conflictos',
          'Desarrollo socioemocional',
          'Autorregulación y gestión emocional',
          'Clima escolar',
          'Inclusión educativa',
          'Gestión institucional de la diversidad',
          'Participación y formación ciudadana',
          'Estrategias de vinculación con familias',
          'Fortalecimiento de protocolos institucionales',
          'Prevención de violencia escolar',
          'Desarrollo de capacidades preventivas y formativas',
          'Bienestar de los equipos educativos',
        ],
      },
      {
        name: 'Desarrollo profesional y carrera docente',
        services: [
          'Asesoría en Carrera Docente',
          'Preparación para procesos de evaluación docente',
          'Acompañamiento individual a docentes',
          'Mentoría profesional',
          'Orientación y fortalecimiento del Portafolio',
          'Análisis de evidencias de la práctica pedagógica',
          'Formación de mentores',
          'Desarrollo de competencias pedagógicas',
          'Retroalimentación efectiva',
          'Diseño del Plan Local de Formación',
          'Programas institucionales de desarrollo profesional',
          'Talleres y capacitaciones según necesidades detectadas',
        ],
      },
    ],
  },
  {
    slug: 'gestion-recursos',
    name: 'Gestión de Recursos',
    tagline: 'Optimización de recursos para una gestión más eficiente.',
    color: 'teal',
    description: 'Apoyamos a los equipos en la gestión de recursos humanos y financieros, la normativa educacional y la consultoría institucional para una gestión más eficiente y sostenible.',
    metaDescription: 'Asesoría en gestión de recursos para colegios en Chile. Normativa educacional, consultoría, sostenedores con MR Ateducativa.',
    keywords: ['gestión de recursos', 'normativa educacional', 'consultoría educativa', 'sostenedores', 'financiamiento SEP'],
    icon: '⚙️',
    iconPath: '/iconos/gestion.svg',
    subdimensions: [
      {
        name: 'Normativa y gestión educacional',
        services: [
          'Actualización en normativa educacional',
          'Capacitación para equipos directivos y docentes',
          'Implementación institucional de nuevas normativas',
          'Capacitación y asesoría en Ley 21.809',
          'Revisión y actualización de procedimientos',
          'Revisión de protocolos institucionales',
          'Roles y responsabilidades de los distintos integrantes',
          'Gestión documental',
          'Análisis de implicancias de cambios normativos',
          'Talleres de aplicación práctica',
        ],
      },
      {
        name: 'Diagnóstico y consultoría',
        services: [
          'Diagnóstico integral institucional',
          'Diagnóstico por áreas de gestión',
          'Levantamiento de necesidades',
          'Análisis documental',
          'Entrevistas a actores clave',
          'Encuestas institucionales',
          'Grupos focales',
          'Análisis FODA',
          'Análisis FODA–CAME',
          'Mapeo de procesos',
          'Análisis de estructura organizacional',
          'Identificación de nudos críticos',
          'Diseño de planes de intervención',
        ],
      },
      {
        name: 'Asesoría a sostenedores y redes',
        services: [
          'Diagnóstico de establecimientos de una red',
          'Análisis comparativo institucional',
          'Identificación de necesidades comunes y diferenciadas',
          'Acompañamiento a directores',
          'Formación de equipos directivos',
          'Diseño de estándares comunes de gestión',
          'Desarrollo de sistemas de seguimiento',
          'Informes ejecutivos para sostenedores',
          'Diseño de estrategias de acompañamiento diferenciadas',
          'Jornadas de trabajo con redes de directores',
        ],
      },
      {
        name: 'Capacitación a medida',
        services: [
          'Cursos y talleres especializados',
          'Jornadas institucionales',
          'Seminarios y charlas especializadas',
          'Programas modulares',
          'Formación presencial, online e híbrida',
          'Mentorías individuales y coaching',
          'Programas de actualización profesional',
          'Capacitaciones diseñadas exclusivamente para una institución',
        ],
      },
    ],
  },
  {
    slug: 'mentoria-directores',
    name: 'Mentoría para Directores',
    tagline: 'Fortalecemos el liderazgo directivo desde la realidad de cada escuela.',
    color: 'mentoria',
    description: 'Acompañamos a directores y sostenedores con un proceso de mentoría situada que desarrolla capacidades de liderazgo, gestión y toma de decisiones sin generar dependencia.',
    metaDescription: 'Mentoría estratégica para directores escolares en Chile. Fortalecimiento del liderazgo directivo con acompañamiento situado de MR Ateducativa.',
    keywords: ['mentoría para directores', 'liderazgo directivo', 'fortalecimiento directivo', 'acompañamiento a directores', 'gestión escolar'],
    icon: '◎',
    iconPath: '/iconos/mentoria.svg',
    subdimensions: [
      {
        name: 'Mentoría situada',
        services: [
          'Diagnóstico inicial del liderazgo directivo',
          'Análisis de desafíos reales de gestión',
          'Sesiones individuales de acompañamiento',
        ],
      },
      {
        name: 'Plan individual',
        services: [
          'Definición de focos prioritarios',
          'Plan Individual de Fortalecimiento Directivo',
          'Acciones concretas entre sesiones',
        ],
      },
      {
        name: 'Seguimiento',
        services: [
          'Revisión de evidencias de gestión',
          'Evaluación de avances y prácticas instaladas',
          'Informe Ejecutivo de Avance para el sostenedor',
        ],
      },
    ],
  },
];

// Legacy support for existing components
export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  icon: string;
  iconPath: string;
  schemaType: string;
  color: string;
}

export const services: Service[] = serviceAreas.map((area) => ({
  slug: area.slug,
  title: area.name,
  shortTitle: area.name,
  description: area.description,
  metaDescription: area.metaDescription,
  keywords: area.keywords,
  icon: area.icon,
  iconPath: area.iconPath,
  schemaType: 'Service',
  color: area.color,
}));

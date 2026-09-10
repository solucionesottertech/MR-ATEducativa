export const site = {
  name: 'MR ATEducativa',
  url: 'https://mr-ateducativa.cl',
  lang: 'es-CL',
  ogImage: '/og-default.svg',
  email: 'info@mr-ateducativa.cl',
  phone: '+56 9 27659269',
  phoneGeneral: '+56 2 32100922',
  phoneInternational: '+351 910 171 760',
  address: 'Santiago, Chile',
  description:
     'Asesoría técnica educativa para colegios en Chile. Liderazgo institucional, pedagogía, convivencia escolar, gestión de recursos y mentoría directiva.',
  admin: {
    name: 'Pedro Reyes Álvarez',
    role: 'Coordinador de Administración y Finanzas',
    email: 'pedro@mr-ateducativa.cl',
    phone: '+56 9 7261 8887',
  },
};

export const nav = [
  { name: 'Inicio', path: '/' },
  { name: 'Nosotros', path: '/sobre-nosotros' },
  {
    name: 'Servicios',
    path: '/servicios',
    children: [
      { name: 'Liderazgo', path: '/servicios/liderazgo' },
      { name: 'Gestión Pedagógica', path: '/servicios/gestion-pedagogica' },
      { name: 'Formación y Convivencia', path: '/servicios/formacion-convivencia' },
      { name: 'Gestión de Recursos', path: '/servicios/gestion-recursos' },
      { name: 'Mentoría para Directores', path: '/servicios/mentoria-directores' },
    ],
  },
  { name: 'Contacto', path: '/contacto' },
];

export const social = {
  linkedin: 'https://www.linkedin.com/company/mr-ateducativa/',
  instagram: 'https://www.instagram.com/mr_ateducativa/',
};

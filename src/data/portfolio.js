// ══════════════════════════════════════════════════════════════
// PORTFOLIO DATA — STEP 1 PLACEHOLDERS
// All personal data will be replaced in Step 2.
// ══════════════════════════════════════════════════════════════

const portfolio = {
  // ── Identity ──
  name: 'AKSHAY',
  firstName: 'AKSHAY',
  lastName: '',
  role: 'Full-Stack Developer',
  tagline: 'Engineering Digital Experiences',
  location: '[LOCATION]',
  bio: "I'm a Full-Stack Developer focused on building responsive, scalable web applications with modern frontend and backend technologies. I work with the MERN stack, Next.js, JavaScript, REST APIs, and modern UI technologies to turn ideas into clean, functional digital experiences.",

  // ── Hero Lines ──
  heroLines: [
    'FULL-STACK',
    'DEVELOPER',
  ],
  heroSubLines: [
    'ENGINEERING',
    'EXPERIENCE',
  ],
  heroDescription: 'Building premium digital experiences with modern frontend technologies, immersive interactions, and pixel-perfect design systems.',

  // ── Navigation ──
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],

  // ── About ──
  about: {
    sectionNumber: '01',
    sectionLabel: 'SYSTEM PROFILE',
    heading: "HELLO, I'M",
    description: "I'm a Full-Stack Developer focused on building responsive, scalable web applications with modern frontend and backend technologies. I work with the MERN stack, Next.js, JavaScript, REST APIs, and modern UI technologies to turn ideas into clean, functional digital experiences.",
    highlights: [
      {
        title: 'FULL-STACK DEVELOPMENT',
        description: 'Building end-to-end web applications using the MERN stack and Next.js.',
      },
      {
        title: 'MODERN FRONTEND',
        description: 'Creating responsive interfaces with React, JavaScript, HTML5, CSS3, and Tailwind CSS.',
      },
      {
        title: 'PROBLEM SOLVING',
        description: 'Strong foundation in C++ and Data Structures & Algorithms for logical and efficient solutions.',
      },
    ],
  },

  // ── Skills ──
  skills: {
    sectionNumber: '02',
    sectionLabel: 'CAPABILITIES',
    heading: 'TECHNOLOGIES & TOOLS',
    categories: [
      {
        title: 'FULL-STACK DEVELOPMENT',
        items: ['MERN Stack', 'Next.js', 'JavaScript', 'REST APIs'],
      },
      {
        title: 'FRONTEND',
        items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS'],
      },
      {
        title: 'BACKEND & DATABASE',
        items: ['Node.js', 'Express.js', 'MongoDB'],
      },
      {
        title: 'PROGRAMMING',
        items: ['C++', 'Data Structures & Algorithms'],
      },
      {
        title: 'TOOLS',
        items: ['Git', 'GitHub'],
      },
    ],
  },

  // ── Process ──
  process: {
    sectionNumber: '03',
    sectionLabel: 'WORKFLOW',
    heading: 'ENGINEERING PROCESS',
    steps: [
      {
        number: '01',
        title: 'DISCOVER',
        description: 'Research, analysis, and strategic planning to understand project requirements and user needs.',
        category: 'Research & Strategy',
      },
      {
        number: '02',
        title: 'DESIGN',
        description: 'Visual design, prototyping, and design system creation with attention to every detail.',
        category: 'Visual & UX Design',
      },
      {
        number: '03',
        title: 'DEVELOP',
        description: 'Clean, performant code with modern frameworks, component architecture, and best practices.',
        category: 'Engineering & Code',
      },
      {
        number: '04',
        title: 'DEPLOY',
        description: 'Testing, optimization, and deployment with monitoring and continuous improvement.',
        category: 'Launch & Iterate',
      },
    ],
  },

  // ── Projects ──
  projects: {
    sectionNumber: '04',
    sectionLabel: 'SELECTED WORK',
    heading: 'FEATURED PROJECTS',
    marqueeItems: [
      'SELECTED WORK',
      'FEATURED PROJECTS',
      'DIGITAL ENGINEERING',
      'CREATIVE DEVELOPMENT',
      'IMMERSIVE EXPERIENCES',
    ],
    items: [
      {
        number: '01',
        title: 'SecureAuth — Production-Ready Authentication System',
        category: 'Backend & Security',
        description: 'A secure, production-oriented authentication backend with JWT and refresh token authentication, PostgreSQL persistence, Redis-backed security state, automated testing, API documentation, and Dockerized local deployment.',
        tags: [
          'Node.js',
          'TypeScript',
          'Express.js',
          'PostgreSQL',
          'Redis',
          'JWT + Refresh Tokens',
          'Argon2 / bcrypt',
          'OpenAPI / Swagger',
          'Jest + Supertest',
          'Docker + Compose',
          'Next.js',
          'Tailwind CSS',
        ],
        image: '/assets/projects/secureauth.png',
        github: 'https://github.com/akshay-kumar414/authentication_system',
        live: null,
      },
      {
        number: '02',
        title: '[Project Title 02]',
        category: 'Frontend Architecture',
        description: 'Project description placeholder. This will be replaced with an actual project description in Step 2.',
        tags: ['React', 'TypeScript', 'Design Systems', 'Vite'],
        image: null,
        github: '#',
        live: '#',
      },
      {
        number: '03',
        title: '[Project Title 03]',
        category: 'Creative Engineering',
        description: 'Project description placeholder. This will be replaced with an actual project description in Step 2.',
        tags: ['Next.js', 'ScrollTrigger', 'Motion UX', 'CSS3'],
        image: null,
        github: '#',
        live: '#',
      },
      {
        number: '04',
        title: '[Project Title 04]',
        category: 'Performance & Systems',
        description: 'Project description placeholder. This will be replaced with an actual project description in Step 2.',
        tags: ['TypeScript', 'Full-Stack', 'APIs', 'Optimization'],
        image: null,
        github: '#',
        live: '#',
      },
    ],
  },

  // ── Contact ──
  contact: {
    sectionNumber: '05',
    sectionLabel: "LET'S CONNECT",
    heading: "LET'S BUILD SOMETHING.",
    email: 'akshayjann02@gmail.com',
    links: [
      { label: 'Email', href: 'mailto:akshayjann02@gmail.com', icon: 'email' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akshay9/', icon: 'linkedin' },
      { label: 'GitHub', href: 'https://github.com/akshay-kumar414', icon: 'github' },
    ],
  },

  // ── Social ──
  socialLinks: {
    github: 'https://github.com/akshay-kumar414',
    linkedin: 'https://www.linkedin.com/in/akshay9/',
    email: 'mailto:akshayjann02@gmail.com',
  },

  // ── Footer ──
  footer: {
    copyright: `© ${new Date().getFullYear()} AKSHAY. All rights reserved.`,
    tagline: 'Crafted with precision.',
  },
}

export default portfolio

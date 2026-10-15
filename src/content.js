
export const profile = {
  name: 'Matheus Coelho',
  city: 'Belo Horizonte, Brasil',
  email: 'matheusnicoli30@gmail.com', 
  whatsapp: '5531975805352', 
  github: 'https://github.com/matheusnNicoli', 
  linkedin: 'https://www.linkedin.com/in/matheus-coelho-749590206/',
  photo: '/EUEU.jpg', 
  resume: '', 
}


export const biography = {
  pt: [
    'Sou estudante de Engenharia de Software na PUC Minas e tenho formação técnica em Informática pelo COTEMIG. Minha trajetória na tecnologia inclui experiências profissionais, projetos acadêmicos e estudos em diferentes áreas do desenvolvimento de software.',

    'Minha primeira experiência profissional na área foi na Thynkr AI, onde participei do desenvolvimento e aprimoramento de soluções de inteligência artificial para automação de atendimento. Trabalhei com testes, correção de problemas, fluxos automatizados e integração entre sistemas.',

    'Posteriormente, estagiei na Supply Brain, onde tive contato com backend, APIs, bancos de dados, programação orientada a objetos e arquitetura de sistemas, ampliando meus conhecimentos em desenvolvimento de software.',

    'Também trabalhei no Camp Manitou for Boys, nos Estados Unidos, como orientador de jovens e instrutor de futebol. A experiência fortaleceu habilidades que sempre fizeram parte do meu perfil, como liderança, organização de grupos, comunicação e resolução de conflitos, além de proporcionar uma vivência internacional e o uso diário do inglês.',

    'Gosto especialmente das etapas de planejamento e resolução de problemas, desde entender o que precisa ser feito até organizar as tarefas e pensar em como executar um projeto. Tenho facilidade para trabalhar em equipe, assumir responsabilidades e coordenar atividades.',

    'Como estou no início da carreira, quero conhecer e atuar em diferentes áreas da Engenharia de Software para construir uma base sólida. Tenho interesse em desenvolvimento frontend, backend, arquitetura de sistemas e, principalmente, inteligência artificial. Ainda não pretendo me limitar a uma especialização, pois quero explorar diferentes possibilidades ao longo da minha formação.',
  ],

  en: [
    'I am a Software Engineering student at PUC Minas with a technical background in Information Technology from COTEMIG. My experience in technology includes professional work, academic projects, and studies across different areas of software development.',

    'My first professional experience in technology was at Thynkr AI, where I contributed to the development and improvement of AI-powered customer service automation solutions. I worked with testing, troubleshooting, automation workflows, and system integrations.',

    'I later interned at Supply Brain, where I gained experience with backend development, APIs, databases, object-oriented programming, and system architecture, expanding my software development knowledge.',

    'I also worked at Camp Manitou for Boys in the United States as a camp counselor and soccer instructor. This experience strengthened skills that have always been part of my profile, such as leadership, group organization, communication, and conflict resolution. It also gave me international experience and the opportunity to use English daily.',

    'I particularly enjoy planning and problem-solving, from understanding what needs to be done to organizing tasks and deciding how to approach a project. I am comfortable working in teams, taking responsibility, and coordinating activities.',

    'As I am still at the beginning of my career, I want to explore different areas of Software Engineering to build a strong foundation. I am interested in frontend and backend development, system architecture, and especially artificial intelligence. Rather than focusing on a single specialization right now, I want to explore different opportunities throughout my education.',
  ],
}


export const education = [
  { institution: 'PUC Minas', period: '2025 — 2027', label: { pt: 'Engenharia de Software', en: 'Software Engineering' }, status: { pt: 'Em andamento · conclusão prevista em dez. 2027', en: 'In progress · expected graduation Dec. 2027' }, description: { pt: 'Bacharelado iniciado em fevereiro de 2025. Estudos em programação, lógica, estruturas de dados, desenvolvimento web, arquitetura de sistemas e metodologias de projeto. Participação em projetos acadêmicos, atividades em grupo, eventos e oficinas de tecnologia e inovação.', en: 'Bachelor’s degree started in February 2025. Studies in programming, logic, data structures, web development, system architecture, and project methodologies. Participation in academic projects, teamwork, technology events, and workshops.' } },
  { institution: 'COTEMIG', period: '2023 — 2024', label: { pt: 'Ensino médio técnico em Informática', en: 'Technical high school in Information Technology' }, status: { pt: 'Jan. 2023 — nov. 2024 · concluído', en: 'Jan. 2023 — Nov. 2024 · completed' }, description: { pt: 'Formação em lógica de programação, desenvolvimento de interfaces, HTML, CSS e fundamentos de tecnologia. Contato com edição de imagens e vídeos e ferramentas digitais.', en: 'Training in programming logic, interface development, HTML, CSS, and technology fundamentals, including image and video editing and digital tools.' } },
]

export const skillGroups = [
  { name: { pt: 'Linguagens & web', en: 'Languages & web' }, items: ['C', 'C/C++', 'C#', 'HTML / HTML5', 'CSS', 'Desenvolvimento front-end', 'Desenvolvimento web'] },
  { name: { pt: 'Backend & dados', en: 'Backend & data' }, items: ['APIs', 'ASP.NET Core', '.NET Framework', '.NET CLI', 'MVC / Razor Pages / Blazor', 'Middlewares', 'Injeção de dependência', 'Banco de dados', 'Análise de dados', 'Manipulação de dados'] },
  { name: { pt: 'Engenharia & automação', en: 'Engineering & automation' }, items: ['Lógica de programação', 'POO', 'Arquitetura de sistemas', 'Testes unitários', 'Depuração', 'Metodologias ágeis', 'Boas práticas web', 'Desenvolvimento full stack', 'Desenvolvimento de software', 'Inteligência artificial', 'Soluções com IA', 'n8n', 'Automação de processos', 'Integração de sistemas', 'Gestão de projetos'] },
  { name: { pt: 'Criação & ferramentas', en: 'Creative work & tools' }, items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro', 'Adobe After Effects', 'Microsoft Office', 'Microsoft Excel', 'Edição de imagens', 'Edição de vídeo', 'Edição de roteiros', 'Edição de texto', 'Gestão de conteúdo', 'Design gráfico', 'Design de logotipos', 'Design de produtos'] },
  { name: { pt: 'Comunicação & colaboração', en: 'Communication & collaboration' }, items: ['Liderança', 'Trabalho em equipe', 'Comunicação', 'Comunicação em inglês', 'Comunicação intercultural', 'Comunicação interpessoal', 'Organização', 'Adaptabilidade', 'Resolução de conflitos', 'Resolução de problemas', 'Inteligência emocional', 'Atenção aos detalhes', 'Atendimento ao cliente', 'Integração de equipe', 'Supervisão de jovens', 'Coordenação de atividades', 'Desenvolvimento de jovens', 'Instrução de futebol'] },
]

export const certificates = [
  { name: 'ASP.NET Core', issuer: 'desenvolvedor.io', date: { pt: 'Fevereiro de 2026', en: 'February 2026' }, id: 'e14aaee2-96ea-4fdd-ad1f-a5404901aaae', url: 'https://desenvolvedor.io/certificado/e14aaee2-96ea-4fdd-ad1f-a5404901aaae', description: { pt: 'Estrutura de projetos, ambientes, middlewares, MVC, Razor Pages, Blazor e Web APIs.', en: 'Project structure, environments, middleware, MVC, Razor Pages, Blazor, and Web APIs.' } },
  { name: 'Fundamentos do C#', issuer: 'balta.io', date: { pt: 'Fevereiro de 2026', en: 'February 2026' }, id: 'ecce4216-4e5d-45dd-a181-9be6a5c407c4', url: 'https://balta.io/certificados/ecce4216-4e5d-45dd-a181-9be6a5c407c4', description: { pt: 'Lógica de programação, estrutura da linguagem C# e conceitos básicos de orientação a objetos.', en: 'Programming logic, C# language structure, and object-oriented programming fundamentals.' } },
]

export const experiences = [
  { id: 'manitou', initials: 'CM', company: 'Camp Manitou for Boys', date: { pt: 'Jun. — ago. 2026', en: 'Jun. — Aug. 2026' }, role: { pt: 'Summer Camp Counselor & Soccer Instructor', en: 'Summer Camp Counselor & Soccer Instructor' }, location: { pt: 'Maine, Estados Unidos · temporário · presencial', en: 'Maine, United States · temporary · on-site' }, description: { pt: 'Atuei como orientador responsável por 11 jovens e instrutor de futebol. Organizei atividades diárias, supervisionei excursões e eventos, acompanhei o bem-estar dos participantes e auxiliei na resolução de conflitos. Trabalhei com equipes multiculturais, usando inglês no cotidiano e contribuindo para um ambiente seguro e positivo.', en: 'Worked as a cabin counselor responsible for 11 campers and as a soccer instructor. Led daily activities, supervised trips and events, supported campers’ well-being, and helped resolve conflicts. Collaborated with multicultural teams, communicating in English and helping maintain a safe, positive environment.' }, skills: ['Leadership', 'English', 'Teamwork', 'Adaptability', 'Conflict resolution'] },
  { id: 'supply', initials: 'SB', company: 'Supply Brain', date: { pt: 'Mar. — jul. 2026', en: 'Mar. — Jul. 2026' }, role: { pt: 'Estagiário em Tecnologia', en: 'Technology Intern' }, location: { pt: 'Belo Horizonte, Brasil · estágio · remoto', en: 'Belo Horizonte, Brazil · internship · remote' }, description: { pt: 'Estágio com foco no aprendizado de backend, dados e arquitetura de sistemas. Estudei APIs, bancos de dados, programação orientada a objetos, testes unitários e práticas de engenharia de software, em uma fase de adaptação às tecnologias e aos processos da empresa.', en: 'Internship focused on learning backend development, data, and system architecture. Studied APIs, databases, object-oriented programming, unit testing, and software engineering practices while adapting to the company’s technologies and processes.' }, skills: ['Backend', 'APIs', 'Dados', 'POO', 'Testes unitários'] },
  { id: 'thynkr', initials: 'TA', company: 'Thynkr AI', date: { pt: 'Out. 2025 — jan. 2026', en: 'Oct. 2025 — Jan. 2026' }, role: { pt: 'Estagiário em Desenvolvimento de IA', en: 'AI Development Intern' }, location: { pt: 'Belo Horizonte, Brasil · estágio · híbrido', en: 'Belo Horizonte, Brazil · internship · hybrid' }, description: { pt: 'Participei do desenvolvimento e aprimoramento de soluções de IA para atendimento automatizado de clínicas de estética. Realizei testes, identificação e correção de erros, ajustes em fluxos de automação e validação de integrações. Também apoiei a organização de processos internos e melhorias em soluções de produção, incluindo atendimento via WhatsApp.', en: 'Contributed to AI solutions for automated customer service at aesthetic clinics. Tested AI behavior, identified and fixed issues, adjusted automation workflows, and validated system integrations. Supported internal processes and improvements to production solutions, including WhatsApp customer service automation.' }, skills: ['IA', 'n8n', 'APIs', 'Automação', 'Integração de sistemas'] },
]

export const projects = [
  
{
  id: 'chatbot-whatsapp',
  date: '2025-10-01',

  title: {
    pt: 'Chatbot Inteligente para Atendimento via WhatsApp',
    en: 'AI-Powered WhatsApp Chatbot',
  },

  
description: {
  pt: 'Desenvolvi um protótipo de chatbot para automatizar o atendimento de uma professora particular pelo WhatsApp, permitindo responder dúvidas, consultar horários e gerenciar agendamentos. O projeto envolveu levantamento de requisitos, planejamento no Miro e desenvolvimento com n8n, agentes de IA, RAG e Supabase. Foi descontinuado após eu receber uma oportunidade de trabalhar em uma empresa com uma solução semelhante.',

  en: 'I developed a WhatsApp chatbot prototype to automate customer service for a private tutor, answering questions, checking availability, and managing bookings. The project involved requirements gathering, planning in Miro, and development using n8n, AI agents, RAG, and Supabase. It was discontinued after I joined a company developing a similar solution.',
},


  photos: [
    {
      src: '/funcioSiam.png',
      caption: {
        pt: 'Planejamento dos requisitos e funcionalidades no Miro.',
        en: 'Requirements and feature planning in Miro.',
      },
    },
    {
      src: '/telaFinanceiro.jpg',
      caption: {
        pt: 'Painel do SIAM com indicadores e gráficos.',
        en: 'SIAM dashboard with indicators and charts.',
      },
    },
  ],

  image: '/siamEx.png',

  technologies: [
    'n8n',
    'WhatsApp API',
    'Supabase',
    'RAG',
    'AI Agents',
    'Miro',
  ],

  repository: '',
  live: '',
  featured: true,
},

]


export const interests = [
  {
    title: 'Full Stack',
    description: {
      pt: 'Explorando o desenvolvimento frontend e backend.',
      en: 'Exploring frontend and backend development.',
    },
  },
  {
    title: { pt: 'Inteligência Artificial', en: 'Artificial Intelligence' },
    description: {
      pt: 'Aprendendo sobre IA e suas aplicações em software.',
      en: 'Learning about AI and its applications in software.',
    },
  },
  {
    title: { pt: 'Automação', en: 'Automation' },
    description: {
      pt: 'Explorando automação de processos e integração de sistemas.',
      en: 'Exploring process automation and system integration.',
    },
  },
  
  {
    title: { pt: 'Gestão de Projetos', en: 'Project Management' },
    description: {
      pt: 'Buscando desenvolver habilidades de liderança e organização de equipes.',
      en: 'Working on leadership and team organization skills.',
    },
  },
];


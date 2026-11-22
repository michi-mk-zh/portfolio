// =============================================================
//  Inhalte in zwei Sprachen (Deutsch / Englisch).
//  Die Projekte werden LIVE von GitHub geladen (siehe unten).
// =============================================================

// Sprach-unabhängige Angaben
export const profile = {
  name: 'Michael Stefanoski',
  githubUser: 'michi-mk-zh',
  githubUrl: 'https://github.com/michi-mk-zh',
}

// Einstellungen für die GitHub-Projekte
export const config = {
  // Wie viele Projekte höchstens angezeigt werden
  maxProjects: 6,
  // Repos, die NICHT angezeigt werden sollen (Namen exakt wie auf GitHub)
  hiddenRepos: ['Contact-Book-CLI', 'grade-calculator', 'Currency-Calculator', 'dev_minikube', 'WeatherApp',
    'Desktop_Calculator', 'Panzer', 'tank', 'clock'],
  // Tipp: Damit bei einem Projekt der "Live"-Button erscheint, trage auf
  // GitHub beim Repository im Feld "Website" die Adresse der Live-Seite ein.
}

export const content = {
  de: {
    role: 'Angehender Applikationsentwickler EFZ',
    tagline:
      'Informatikmittelschüler an der Kantonsschule Hottingen. Ich baue an einer Idee, bis sie zuverlässig läuft.',
    about: [
      'Ich besuche die Informatikmittelschule an der Kantonsschule Hottingen und stehe kurz vor meinem Praxisjahr als Applikationsentwickler. Mein Interesse an der Informatik entstand in der Sekundarstufe, als ich mit TigerJython erste Programme schrieb.',
      'Am meisten begeistert mich, an einer Lösung zu tüfteln, bis sie zuverlässig funktioniert. Neben der Schule setze ich eigene Projekte um und sammle an Hackathons praktische Erfahrung im Team.',
    ],
    // Wird nur angezeigt, falls GitHub nicht erreichbar ist.
    fallbackProjects: [
      {
        title: 'Notenrechner',
        description:
          'Ein Programm, das Schulnoten erfasst, Durchschnitte berechnet und die Daten in einer Excel-Datei speichert. Umgesetzt mit Python und der Bibliothek pandas.',
        tags: ['Python', 'pandas', 'Excel'],
        codeUrl: '',
        liveUrl: '',
      },
    ],
    skills: [
      { group: 'Programmiersprachen', items: ['Python', 'Java', 'Kotlin', 'JavaScript'] },
      { group: 'Frontend', items: ['React', 'Next.js', 'HTML', 'CSS / Tailwind'] },
      { group: 'Datenbanken', items: ['MySQL', 'SQLite', 'MongoDB'] },
      { group: 'Werkzeuge', items: ['Git', 'Bash', 'Figma'] },
    ],
    education: [
      {
        period: '2023 – 2027',
        title: 'Informatikmittelschule Hottingen',
        detail: 'Ausbildung als Applikationsentwickler EFZ',
      },
      {
        period: '2020 – 2023',
        title: 'Sekundarstufe',
        detail: 'Erste Programmiererfahrung mit TigerJython',
      },
    ],
    experience: [
      { period: 'Aug 2026', title: 'Renuo Hackts! – Hackathon', detail: 'Kantonsschule Hottingen' },
      { period: 'Jul 2026', title: 'Ferienjob, Strabag AG', detail: 'Strassenbau, Gossau ZH' },
      { period: 'Aug 2025', title: 'Renuo Hackts! – Hackathon', detail: 'Kantonsschule Hottingen' },
      { period: 'Jun 2025', title: 'Hack and Harvest – Hackathon', detail: 'Konstanz' },
    ],
    ui: {
      nav: { about: 'Über mich', projects: 'Projekte', skills: 'Fähigkeiten', path: 'Werdegang' },
      cta: 'Projekte ansehen',
      education: 'Ausbildung',
      experience: 'Erfahrung',
      code: 'Code',
      live: 'Live',
      projectsLoading: 'Projekte werden von GitHub geladen …',
      noDescription: 'Noch keine Beschreibung auf GitHub hinterlegt.',
      allProjects: 'Alle Projekte auf GitHub',
    },
  },

  en: {
    role: 'Aspiring Software Developer (EFZ)',
    tagline:
      'Computer science student at Kantonsschule Hottingen. I keep building on an idea until it runs reliably.',
    about: [
      'I attend the IT-focused high school (Informatikmittelschule) at Kantonsschule Hottingen and am about to start my practical year as a software developer. My interest in computer science began in secondary school, when I wrote my first programs with TigerJython.',
      'What excites me most is tinkering with a solution until it works reliably. Alongside school I build my own projects and gain hands-on team experience at hackathons.',
    ],
    fallbackProjects: [
      {
        title: 'Grade Calculator',
        description:
          'A program that records school grades, calculates averages and stores the data in an Excel file. Built with Python and the pandas library.',
        tags: ['Python', 'pandas', 'Excel'],
        codeUrl: '',
        liveUrl: '',
      },
    ],
    skills: [
      { group: 'Languages', items: ['Python', 'Java', 'Kotlin', 'JavaScript'] },
      { group: 'Frontend', items: ['React', 'Next.js', 'HTML', 'CSS / Tailwind'] },
      { group: 'Databases', items: ['MySQL', 'SQLite', 'MongoDB'] },
      { group: 'Tools', items: ['Git', 'Bash', 'Figma'] },
    ],
    education: [
      {
        period: '2023 – 2027',
        title: 'Informatikmittelschule Hottingen',
        detail: 'Training as a Software Developer (EFZ)',
      },
      {
        period: '2020 – 2023',
        title: 'Secondary school',
        detail: 'First programming experience with TigerJython',
      },
    ],
    experience: [
      { period: 'Aug 2026', title: 'Renuo Hackts! – Hackathon', detail: 'Kantonsschule Hottingen' },
      { period: 'Jul 2026', title: 'Summer job, Strabag AG', detail: 'Road construction, Gossau ZH' },
      { period: 'Aug 2025', title: 'Renuo Hackts! – Hackathon', detail: 'Kantonsschule Hottingen' },
      { period: 'Jun 2025', title: 'Hack and Harvest – Hackathon', detail: 'Konstanz' },
    ],
    ui: {
      nav: { about: 'About', projects: 'Projects', skills: 'Skills', path: 'Background' },
      cta: 'View projects',
      education: 'Education',
      experience: 'Experience',
      code: 'Code',
      live: 'Live',
      projectsLoading: 'Loading projects from GitHub …',
      noDescription: 'No description set on GitHub yet.',
      allProjects: 'All projects on GitHub',
    },
  },
}

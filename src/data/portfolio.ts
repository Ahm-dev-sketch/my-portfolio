import type {
  Education,
  Experience,
  PortfolioProject,
  Profile,
  SkillGroup,
} from "@/types/portfolio";

export const profile: Profile = {
  name: "Mutiah Ulfa Sitompul",
  pronouns: "She/Her",
  location: {
    en: "Pekanbaru, Riau, Indonesia",
    id: "Pekanbaru, Riau, Indonesia",
  },
  monogram: "MUS",
  linkedinUrl: "https://www.linkedin.com/in/mutiah-ulfa-/",
  headline: {
    en: "Information Systems Graduate | Administration | HR Operations | Data Management",
    id: "Lulusan Sistem Informasi | Administrasi | Operasional SDM | Pengelolaan Data",
  },
};

export const experiences: Experience[] = [
  {
    id: "bps-uiux-intern",
    role: {
      en: "UI/UX & Front-End Intern",
      id: "Magang UI/UX & Front-End",
    },
    organization: "Badan Pusat Statistik (BPS)",
    employmentType: {
      en: "Internship",
      id: "Magang",
    },
    period: {
      en: "January 2025 – February 2025",
      id: "Januari 2025 – Februari 2025",
    },
    location: {
      en: "Pekanbaru, Riau, Indonesia",
      id: "Pekanbaru, Riau, Indonesia",
    },
    description: {
      en: [
        "Worked on a web-based performance monitoring project, focusing on UI/UX design and the presentation of performance data. The main challenge was designing an interface that could present information clearly while making the system easy to navigate and use.",
        "Developed a structured and user-friendly interface with clear navigation and data visualization, helping create a more accessible monitoring experience for users.",
      ],
      id: [
        "Berpartisipasi dalam proyek pemantauan kinerja berbasis web dengan fokus pada desain UI/UX dan penyajian data kinerja. Tantangan utamanya adalah merancang antarmuka yang mampu menyajikan informasi secara jelas serta mudah dinavigasi dan digunakan.",
        "Mengembangkan antarmuka yang terstruktur dan mudah digunakan, dengan navigasi yang jelas serta visualisasi data untuk mendukung pengalaman pemantauan yang lebih mudah diakses.",
      ],
    },
    skills: [
      "UI/UX Design",
      "Frontend Development",
      "CSS",
      "Laravel",
      "Data Visualization",
    ],
  },
  {
    id: "urc-hrd",
    role: {
      en: "Human Resources Development Specialist / HRD Staff",
      id: "Spesialis Pengembangan SDM / Staf HRD",
    },
    organization: "Universitas Riau Cendekia (URC)",
    employmentType: {
      en: "Seasonal / Organizational Role",
      id: "Musiman / Peran Organisasi",
    },
    period: {
      en: "February 2024 – November 2024",
      id: "Februari 2024 – November 2024",
    },
    location: {
      en: "Universitas Riau",
      id: "Universitas Riau",
    },
    description: {
      en: [
        "Supported the recruitment, selection, and development of new members within the organization. Assisted in organizing training and capacity-building activities while coordinating with team members to ensure programs were carried out effectively. Also handled departmental administration and reporting to maintain well-organized documentation.",
      ],
      id: [
        "Mendukung proses rekrutmen, seleksi, dan pengembangan anggota baru dalam organisasi. Membantu penyelenggaraan pelatihan dan kegiatan peningkatan kapasitas, serta berkoordinasi dengan anggota tim agar program berjalan secara efektif. Turut menangani administrasi dan pelaporan departemen untuk menjaga dokumentasi tetap terorganisasi.",
      ],
    },
    skills: [
      "Human Resource Development",
      "Recruitment Support",
      "Member Development",
      "Leadership Development",
      "Training Coordination",
      "Administration",
      "Reporting",
    ],
  },
  {
    id: "himalkom-secretary",
    role: {
      en: "General Secretary",
      id: "Sekretaris Umum",
    },
    organization:
      "Computer Science Student Association (HIMALKOM FMIPA Universitas Riau)",
    employmentType: {
      en: "Organizational Role",
      id: "Peran Organisasi",
    },
    period: {
      en: "May 2023 – December 2023",
      id: "Mei 2023 – Desember 2023",
    },
    location: {
      en: "Universitas Riau",
      id: "Universitas Riau",
    },
    description: {
      en: [
        "Managed the organization's administrative and documentation needs, including correspondence, meeting records, and organizational reports. Worked closely with board members and committee teams to coordinate meetings and support various organizational programs.",
        "Prepared meeting minutes and compiled the final organizational accountability report. Coordinated seven division secretaries to help maintain proper documentation, organized administrative processes, and timely reporting.",
      ],
      id: [
        "Mengelola kebutuhan administrasi dan dokumentasi organisasi, termasuk korespondensi, catatan rapat, dan laporan organisasi. Bekerja sama dengan pengurus dan tim kepanitiaan untuk mengoordinasikan rapat serta mendukung berbagai program organisasi.",
        "Bertanggung jawab menyusun notulensi dan mengompilasi laporan pertanggungjawaban akhir organisasi. Mengoordinasikan tujuh sekretaris divisi untuk membantu menjaga kelengkapan dokumentasi, keteraturan proses administrasi, dan ketepatan waktu pelaporan.",
      ],
    },
    skills: [
      "Administration",
      "Document Management",
      "Meeting Coordination",
      "Report Preparation",
      "Leadership",
      "Communication",
      "Time Management",
      "Problem Solving",
    ],
  },
];

export const projects: PortfolioProject[] = [
  {
    id: "performance-monitoring-app",
    accent: "primary",
    title: {
      en: "Web-Based Performance Monitoring Application",
      id: "Aplikasi Pemantauan Kinerja Berbasis Web",
    },
    category: {
      en: "UI/UX Design & Frontend Development",
      id: "Desain UI/UX & Pengembangan Frontend",
    },
    context: {
      en: "BPS Internship",
      id: "Magang BPS",
    },
    description: {
      en: "A web-based performance monitoring application focused on presenting performance information through a clear, structured, and user-friendly interface.",
      id: "Aplikasi pemantauan kinerja berbasis web yang berfokus pada penyajian informasi kinerja melalui antarmuka yang jelas, terstruktur, dan mudah digunakan.",
    },
    highlights: {
      en: [
        "Interface structure and navigation",
        "Performance data presentation",
        "User experience considerations",
        "Frontend implementation",
      ],
      id: [
        "Struktur antarmuka dan navigasi",
        "Penyajian data kinerja",
        "Pertimbangan pengalaman pengguna",
        "Implementasi frontend",
      ],
    },
    skills: ["Laravel", "CSS", "UI/UX Design", "Data Visualization"],
  },
  {
    id: "org-administration",
    accent: "ink",
    title: {
      en: "Organizational Administration & Documentation",
      id: "Administrasi & Dokumentasi Organisasi",
    },
    category: {
      en: "Administration & Operations",
      id: "Administrasi & Operasional",
    },
    context: {
      en: "HIMALKOM FMIPA Universitas Riau",
      id: "HIMALKOM FMIPA Universitas Riau",
    },
    description: {
      en: "Administrative coordination and documentation covering correspondence, meeting minutes, activity schedules, organizational reports, and accountability reporting.",
      id: "Koordinasi administrasi dan dokumentasi yang mencakup korespondensi, notulensi rapat, jadwal kegiatan, laporan organisasi, dan penyusunan laporan pertanggungjawaban.",
    },
    highlights: {
      en: [
        "Documentation management",
        "Coordination with seven division secretaries",
        "Meeting records",
        "Report preparation",
      ],
      id: [
        "Pengelolaan dokumentasi",
        "Koordinasi dengan tujuh sekretaris divisi",
        "Catatan rapat",
        "Penyusunan laporan",
      ],
    },
    skills: [
      "Administration",
      "Document Management",
      "Meeting Coordination",
      "Report Preparation",
    ],
  },
  {
    id: "hr-recruitment",
    accent: "sage",
    title: {
      en: "HR Development & Recruitment Support",
      id: "Pengembangan SDM & Dukungan Rekrutmen",
    },
    category: {
      en: "Human Resources",
      id: "Sumber Daya Manusia",
    },
    context: {
      en: "Universitas Riau Cendekia (URC)",
      id: "Universitas Riau Cendekia (URC)",
    },
    description: {
      en: "Organizational HR support involving member recruitment, selection administration, orientation, development activities, and training coordination.",
      id: "Dukungan pengelolaan SDM organisasi yang mencakup rekrutmen anggota, administrasi seleksi, orientasi, kegiatan pengembangan, dan koordinasi pelatihan.",
    },
    highlights: {
      en: [
        "Recruitment administration",
        "Member development",
        "Training coordination",
        "HR documentation",
      ],
      id: [
        "Administrasi rekrutmen",
        "Pengembangan anggota",
        "Koordinasi pelatihan",
        "Dokumentasi SDM",
      ],
    },
    skills: [
      "Human Resource Development",
      "Recruitment Support",
      "Training Coordination",
      "Administration",
    ],
  },
  {
    id: "village-profile-data",
    accent: "sand",
    title: {
      en: "Village Profile Data Collection & Infographics",
      id: "Pengumpulan Data Profil Desa & Infografis",
    },
    category: {
      en: "Data Management & Community Engagement",
      id: "Pengelolaan Data & Pengabdian Masyarakat",
    },
    context: {
      en: "Kukerta Sains Desa Cantik",
      id: "Kukerta Sains Desa Cantik",
    },
    description: {
      en: "Participation in village profile data collection and infographic-related activities as part of a community engagement program.",
      id: "Partisipasi dalam pengumpulan data profil desa dan kegiatan terkait infografis sebagai bagian dari program pengabdian kepada masyarakat.",
    },
    highlights: {
      en: [
        "Village profile data collection",
        "Information organization",
        "Infographic-related activities",
      ],
      id: [
        "Pengumpulan data profil desa",
        "Pengorganisasian informasi",
        "Kegiatan terkait infografis",
      ],
    },
    skills: ["Data Processing", "Data Management", "Information Organization"],
  },
];

export const education: Education = {
  institution: "Universitas Riau",
  degree: {
    en: "Bachelor of Computer Science, Information Systems",
    id: "Sarjana Ilmu Komputer, Sistem Informasi",
  },
  period: {
    en: "August 2022 – May 2026",
    id: "Agustus 2022 – Mei 2026",
  },
  location: "Pekanbaru, Riau, Indonesia",
  gpaValue: "3.69",
  gpaScale: "4.00",
  activities: {
    en: [
      "General Secretary, HIMALKOM FMIPA Universitas Riau",
      "HRD Staff, Universitas Riau Cendekia (URC)",
      "Student Organization and Committee Activities",
      "Kukerta Sains Desa Cantik — Data Collection for Village Profiles and Infographics",
    ],
    id: [
      "Sekretaris Umum, HIMALKOM FMIPA Universitas Riau",
      "Staf HRD, Universitas Riau Cendekia (URC)",
      "Kegiatan Organisasi dan Kepanitiaan Mahasiswa",
      "Kukerta Sains Desa Cantik — Pengumpulan Data Profil Desa dan Infografis",
    ],
  },
  summary: {
    en: "An Information Systems graduate with knowledge of data management, systems analysis, and the use of information technology to support organizational needs. Academic and organizational activities strengthened administrative coordination, document management, reporting, communication, and analytical thinking.\n\nAcademic experience also included research in information security risk management, supporting an interest in structured analysis, risk awareness, and documentation.",
    id: "Lulusan Sistem Informasi dengan pengetahuan mengenai pengelolaan data, analisis sistem, dan pemanfaatan teknologi informasi untuk mendukung kebutuhan organisasi. Kegiatan akademik dan organisasi memperkuat kemampuan dalam koordinasi administrasi, pengelolaan dokumen, pelaporan, komunikasi, dan pemikiran analitis.\n\nPengalaman akademik juga mencakup penelitian mengenai manajemen risiko keamanan informasi yang mendukung ketertarikan pada analisis terstruktur, kesadaran risiko, dan dokumentasi.",
  },
};

export const skillGroups: SkillGroup[] = [
  {
    id: "administration",
    title: {
      en: "Administration & Operations",
      id: "Administrasi & Operasional",
    },
    skills: [
      "Administrative Management",
      "Document Management",
      "Correspondence",
      "Meeting Minutes",
      "Report Preparation",
      "Records Management",
      "Activity Coordination",
      "Communication",
      "Time Management",
    ],
  },
  {
    id: "human-resources",
    title: {
      en: "Human Resources",
      id: "Sumber Daya Manusia",
    },
    skills: [
      "Recruitment Support",
      "Selection Administration",
      "Member Orientation",
      "Human Resource Development",
      "Training Coordination",
      "Leadership Development",
      "Organizational Coordination",
      "HR Documentation",
    ],
  },
  {
    id: "digital-technical",
    title: {
      en: "Digital & Technical",
      id: "Digital & Teknis",
    },
    skills: [
      "Information Systems",
      "Data Processing",
      "Systems Analysis",
      "UI/UX Design",
      "Frontend Development",
      "CSS",
      "Laravel",
      "Data Visualization",
      "Information Security Risk Management",
    ],
  },
];

export type Language = "en" | "id";

export type LocalizedText = Record<Language, string>;

export type LocalizedList = Record<Language, string[]>;

export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "work"
  | "education"
  | "skills"
  | "contact";

/** Visual variant used by abstract project thumbnails. */
export type ProjectAccent = "primary" | "sage" | "ink" | "sand";

export interface Experience {
  id: string;
  role: LocalizedText;
  organization: string;
  employmentType: LocalizedText;
  period: LocalizedText;
  location: LocalizedText;
  description: LocalizedList;
  skills: string[];
}

export interface PortfolioProject {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  context: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedList;
  skills: string[];
  accent: ProjectAccent;
}

export interface Education {
  institution: string;
  degree: LocalizedText;
  period: LocalizedText;
  location: string;
  gpaValue: string;
  gpaScale: string;
  activities: LocalizedList;
  summary: LocalizedText;
}

export interface SkillGroup {
  id: string;
  title: LocalizedText;
  skills: string[];
}

export interface Profile {
  name: string;
  pronouns: string;
  location: LocalizedText;
  monogram: string;
  linkedinUrl: string;
  headline: LocalizedText;
}

export interface TranslationContent {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    wordmark: string;
    items: Record<SectionId, string>;
    languageLabel: string;
  };
  a11y: {
    skipToContent: string;
    primaryNavigation: string;
    mobileNavigation: string;
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
    externalLink: string;
    backToTop: string;
    projectHighlights: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    card: {
      name: string;
      descriptor: string;
      gpaLabel: string;
      gpaValue: string;
      gpaMeta: string;
      summaryLabel: string;
      summary: string;
      locationLabel: string;
      location: string;
      availabilityLabel: string;
      availability: string;
    };
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    competenciesLabel: string;
    competencies: string[];
  };
  experience: {
    eyebrow: string;
    heading: string;
    description: string;
    skillsLabel: string;
  };
  work: {
    eyebrow: string;
    heading: string;
    description: string;
    highlightsLabel: string;
    skillsLabel: string;
  };
  education: {
    eyebrow: string;
    heading: string;
    gpaLabel: string;
    periodLabel: string;
    activitiesLabel: string;
    summaryLabel: string;
  };
  skills: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    description: string;
    linkedinCta: string;
    copyLinkCta: string;
    copyLinkSuccess: string;
    locationLabel: string;
    footerNote: string;
  };
  footer: {
    backToTop: string;
    rights: string;
    builtWith: string;
  };
}

export type Translations = Record<Language, TranslationContent>;

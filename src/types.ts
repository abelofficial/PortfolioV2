import { Maybe } from 'graphql/jsutils/Maybe';

export interface PromptContext {
  title: string;
  category: string;
  slug: string;
  readMinutes: string;
  excerpt: string;
  published: string;
  fullLink: string;
  text: string;
}

export interface TechnicalLedgerForPrompt {
  id: string;
  slugId: string;
  title: string;
  date: string;
  category: string;
  readMinutes: number;
  promptNotes: TechnicalLedgerForPromptMote[];
}

export interface TechnicalLedgerForPromptMote {
  id: string;
  contextTitle: string;
  contextContent: string;
}

export interface TechnicalLedgerPage {
  title: string;
  description: string;
  explanation: string;
  all: string;
  backButtonLabel: string;
  minRead: string;
  chatBox: ChatBoxInfo;
  seo: SEOData;
}

export interface BookSummariesPage {
  title: string;
  description: string;
  all: string;
  backButtonLabel: string;
  chatBox: ChatBoxInfo;
  seo: SEOData;
}

export interface BookSummary {
  id: string;
  slugId: string;
  title: string;
  author: string;
  bookImage: {
    responsiveImage: ResponsiveImageType;
  };
  category: string;
  excerpt: string;
  tags: {
    id: string;
    tag: string;
  }[];
  chatBox: {
    questions: {
      singleQuestion: string;
    }[];
  };
  introduction: LedgerContent;
  seo: SEOData;
}

export interface SEOData {
  title: string;
  description: string;
  twitterCard: string;
  image: {
    responsiveImage: ResponsiveImageType;
  };
}

export interface SingleTechnicalLedger {
  technicalLedger: TechnicalLedger;
}

export interface TechnicalLedger {
  id: string;
  slugId: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readMinutes: number;
  chatBox: ChatBoxInfo;
  tag: {
    id: string;
    tag: string;
  }[];
  fullNote: LedgerContent;
  seo: SEOData;
}

export interface LedgerContent {
  value: LedgerNote;
}

export interface LedgerNote {
  schema: string;
  document: {
    type: string;
    children: LedgerNoteBlock[];
  };
}

export interface LedgerNoteBlock {
  type?: string;
  level?: number;
  children?: LedgerNoteBlockChild[];
  code?: string;
  language?: string;
}

export interface LedgerNoteBlockChild {
  type?: string;
  value?: string;
  marks?: string[];
  children?: LedgerNoteBlockSubChild[];
}

export interface LedgerNoteBlockSubChild {
  type?: string;
  marks?: string[];
  children?: LedgerNoteBlockSubSubChild[];
}

export interface LedgerNoteBlockSubSubChild {
  type?: string;
  value?: string;
  marks?: string[];
}

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  order: number;
}

export interface Prompt {
  coreRule: string;
  safetyLimitations: string;
  toneAndStyle: string;
  formattingAndStructure: string;
  contextualKnowledge: string;
  rateLimitMessage: string;
}

export interface HomePage {
  id: string;
  name: string;
  intro: string;
  connect: string;
  jobTitle: string;
  workPlace: string;
  workExperience: string;
  education: string;
  at: string;
  months: string;
  totalContributionLabel: string;
  techStackTitle: string;
  chatBox: ChatBoxInfo;
  seo: SEOData;
  avatar: {
    responsiveImage: ResponsiveImageType;
  };
}

export interface ChatBoxInfo {
  hint: string;
  openButtonLabel: string;
  chatTitle: string;
  chatInputPlaceholder: string;
  suggestionLabel: string;
  questions: {
    singleQuestion: string;
  }[];
}

export interface FullChatBoxData {
  homePage: {
    chatBox: ChatBoxInfo;
  };
  allTechnicalLedgers: TechnicalLedgerChatBox[];
  technicalLedgersPage: {
    chatBox: {
      questions: {
        singleQuestion: string;
      }[];
    };
  };
  bookSummaryPage: {
    chatBox: {
      questions: {
        singleQuestion: string;
      }[];
    };
  };
  allBookSummaries: BookSummaryChatBox[];
}

export interface BookSummaryChatBox {
  slugId: string;
  chatBox: {
    questions: {
      singleQuestion: string;
    }[];
  };
}

export interface TechnicalLedgerChatBox {
  slugId: string;
  chatBox: {
    questions: {
      singleQuestion: string;
    }[];
  };
}

export interface ContactInfoList {
  allContacts: ContactInfo[];
}

export interface ContactInfo {
  id: string;
  address: string;
  title: string;
  icon: {
    responsiveImage: ResponsiveImageType;
  };
}

export interface EducationExperienceList {
  allEducations: Experience[];
}

export interface WorkExperienceList {
  allWorks: Experience[];
}

export interface Experience {
  id: string;
  order: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  place: string;
  logo: {
    responsiveImage: ResponsiveImageType;
  };
}

export declare type ResponsiveImageType = {
  aspectRatio: number;
  base64?: Maybe<string>;
  height?: Maybe<number>;
  width: number;
  sizes?: Maybe<string>;
  src: string;
  srcSet?: Maybe<string>;
  webpSrcSet?: Maybe<string>;
  bgColor?: Maybe<string>;
  alt?: Maybe<string>;
  title?: Maybe<string>;
};

export interface TestimonialsList {
  allTestimonials: Testimonial[];
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  workPlace: string;
  workPosition: string;
}

export interface TechStackList {
  allTechstacks: TechStack[];
}

export interface TechStack {
  id: string;
  title: string;
  name: string;
  icon: {
    url: string;
  };
}

export interface IGithubProfile {
  name: string;
  avatar_url: string;
  followers: string;
  following: string;
  orgs: string;
  public_repos: string;
  total_private_repos: string;
  company: string;
  bio: string;
}

export interface IGithubOrgs {
  avatar_url: string;
  description: string;
  events_url: string;
  hooks_url: string;
  id: number;
  issues_url: string;
  login: string;
  members_url: string;
  node_id: string;
  public_members_url: string;
  repos_url: string;
  url: string;
}

export type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE';

export interface GithubGraphQLResponse {
  data: {
    viewer: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionCount: number;
              date: string;
              contributionLevel: ContributionLevel;
            }[];
          }[];
        };
      };
    };
  };
}

export interface ContributionData {
  totalContributions: number;
  contributionsByDate: ContributionDay[];
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

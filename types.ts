export enum EducationLevel {
  CLASS_10 = '10th Pass',
  CLASS_12 = '12th Pass',
  GRADUATE = 'Graduate',
  POST_GRADUATE = 'Post Graduate'
}

export enum Stream {
  SCIENCE_PCM = 'Science (PCM)',
  SCIENCE_PCB = 'Science (PCB)',
  COMMERCE = 'Commerce',
  ARTS = 'Arts/Humanities',
  VOCATIONAL = 'Vocational',
  OTHER = 'Other'
}

export enum SectorPreference {
  GOVERNMENT = 'Government Only',
  PRIVATE = 'Private Only',
  BOTH = 'Both Government & Private'
}

export enum JobDifficulty {
  HIGH = 'High Competition / Elite',
  MODERATE = 'Moderate / Accessible',
  HIDDEN = 'Hidden Gem / Low Competition'
}

export interface UserProfile {
  level: EducationLevel;
  stream: Stream;
  subjects: string;
  targetDomains: string[]; // e.g. Army, Police, Bank, IT
  preference: SectorPreference;
  locationScope: 'All India' | 'State Specific';
  targetState: string;
  salaryExpectation: string;
}

export interface CareerPath {
  id: string;
  title: string;
  sector: 'Government' | 'Private';
  category: 'High Competition' | 'Moderate Competition' | 'Hidden Gem'; // New categorization
  description: string;
  eligibility: string;
  competitionLevel: string;
  estimatedApplicants?: string;
  hiddenGem: boolean;
  officialWebsite?: string;
  sourceUrls: string[];
  averageSalary?: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}
import fs from 'fs';
import path from 'path';

// Define the structure of your data (optional but recommended for TypeScript)
export interface PortfolioData {
  name: string;
  title?: string;
  description: string;
  birthDate?: string;
  location?: string;
  maritalStatus?: string;
  projects: {
    id: number;
    slug: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    screenshots?: string[];
    link: string | null;
    tags?: string[];
    category?: string;
    role?: string;
    features?: string[];
  }[];
  skills: string[];
  contact: {
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    github?: string;
    linkedin?: string;
  };
  languages: {
    name: string;
    level: string;
    score?: string;
    flag?: string;
    details?: {
      reading: string;
      writing: string;
      speaking: string;
      listening: string;
    };
  }[];
  education: {
    id: number;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    technologies?: string[];
  }[];
  workExperience: {
    id: number;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    technologies?: string[];
  }[];
  stats: {
    yearsOfExperience: string;
    projectsCompleted: string;
    clientsSatisfied: string;
    linesOfCode: string;
  };
}

// Reusable function to fetch data with locale support
export async function getData(locale: string = 'en'): Promise<PortfolioData> {
  const fileName = locale === 'fa' ? 'data-fa.json' : 'data.json';
  const filePath = path.join(process.cwd(), 'data', fileName);
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}
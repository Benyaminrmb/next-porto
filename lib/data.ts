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
    title: string;
    description: string;
    image: string;
    link: string;
    tags?: string[];
  }[];
  skills: string[];
  contact: {
    email: string;
    phone: string;
    website?: string;
    github: string;
    linkedin: string;
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
    degree: string;
    institution: string;
    location: string;
    duration: string;
    gpa: string;
  }[];
  workExperience: {
    title: string;
    company: string;
    location: string;
    duration: string;
    current?: boolean;
    responsibilities: string[];
  }[];
  stats?: {
    yearsOfExperience: string;
    projectsCompleted: string;
    clientsSatisfied: string;
    linesOfCode: string;
  };
}

// Reusable function to fetch data
export async function getData(): Promise<PortfolioData> {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}
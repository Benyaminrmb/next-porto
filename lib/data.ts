import fs from 'fs';
import path from 'path';

// Define the structure of your data (optional but recommended for TypeScript)
export interface PortfolioData {
  name: string;
  description: string;
  projects: {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
  }[];
  skills: string[];
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
  languages: {
    name: string;
    level: string;
    details: {
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
    responsibilities: string[];
  }[];
}

// Reusable function to fetch data
export async function getData(): Promise<PortfolioData> {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}
// data.ts
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
    github: string;
    linkedin: string;
  };
}

// Simulate fetching data (replace this with actual fetching logic)
export async function getData(): Promise<PortfolioData> {
  // In a real app, you might fetch this from an API or database
  return {
    name: "John Doe",
    description: "A passionate web developer and designer.",
    projects: [
      {
        id: 1,
        title: "Project 1",
        description: "A web app for managing tasks.",
        image: "/images/project1.jpg",
        link: "https://project1.com",
      },
      {
        id: 2,
        title: "Project 2",
        description: "A portfolio website built with Next.js.",
        image: "/images/project2.jpg",
        link: "https://project2.com",
      },
    ],
    skills: ["JavaScript", "React", "Next.js", "CSS"],
    contact: {
      email: "john.doe@example.com",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
  };
}
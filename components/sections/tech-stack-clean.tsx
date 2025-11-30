"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TechCategory {
  title: string;
  description: string;
  skills: string[];
}

export function TechStackClean() {
  const techCategories: TechCategory[] = [
    {
      title: "Backend Development",
      description: "Server-side technologies and frameworks",
      skills: ["PHP", "Laravel", "Filament", "Livewire", "REST API", "MySQL", "Redis"]
    },
    {
      title: "Frontend Development",
      description: "Modern UI frameworks and libraries",
      skills: ["React", "Next.js", "Vue.js", "Nuxt.js", "JavaScript", "TypeScript", "Tailwind CSS"]
    },
    {
      title: "Development Tools",
      description: "Tools and practices for efficient development",
      skills: ["Git & GitHub", "CI/CD", "Docker", "Scrum", "Project Management"]
    },
    {
      title: "Specialized Skills",
      description: "Additional expertise and focus areas",
      skills: ["SEO Optimization", "PWA Development", "Database Design", "Multilingual Websites", "Firebase"]
    }
  ];

  return (
    <section id="skills" className="section-padding border-b">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Tech Stack</h2>
          <p className="text-muted-foreground">
            Technologies and tools I work with
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {techCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

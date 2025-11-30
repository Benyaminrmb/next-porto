"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
}

interface ExperienceCleanProps {
  experiences: Experience[];
}

export function ExperienceClean({ experiences }: ExperienceCleanProps) {
  // Separate work and education
  const workExperience = experiences.filter(exp =>
    !exp.company.toLowerCase().includes('school') &&
    !exp.title.toLowerCase().includes('diploma')
  );

  const education = experiences.filter(exp =>
    exp.company.toLowerCase().includes('school') ||
    exp.title.toLowerCase().includes('diploma')
  );

  const ExperienceCard = ({ exp }: { exp: Experience }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">{exp.title}</CardTitle>
            <CardDescription className="flex flex-col gap-1">
              <span className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {exp.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {exp.location}
              </span>
            </CardDescription>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {exp.period}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {exp.description.map((item, idx) => (
            <li key={idx} className="flex items-start text-sm text-muted-foreground">
              <span className="mr-2 mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {exp.technologies && exp.technologies.length > 0 && (
          <div className="pt-4 border-t">
            <p className="text-xs font-medium mb-2 text-muted-foreground">Technologies</p>
            <div className="flex flex-wrap gap-1.5">
              {exp.technologies.map((tech, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <section id="experience" className="section-padding border-b">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Experience & Education</h2>
          <p className="text-muted-foreground">
            My professional journey and academic background
          </p>
        </div>

        <Tabs defaultValue="work" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="work" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Work Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Education
            </TabsTrigger>
          </TabsList>

          <TabsContent value="work" className="mt-6 space-y-6">
            {workExperience.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </TabsContent>

          <TabsContent value="education" className="mt-6 space-y-6">
            {education.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

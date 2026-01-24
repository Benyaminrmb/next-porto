"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Project {
  id: number;
  slug?: string;
  title: string;
  description: string;
  image?: string;
  link?: string | null;
  tags?: string[];
  category?: string;
}

interface ProjectsCleanProps {
  projects: Project[];
}

export function ProjectsClean({ projects }: ProjectsCleanProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';

  return (
    <section id="projects" className="section-padding border-b">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Projects</h2>
          <p className="text-muted-foreground">
            Some of the projects I&apos;ve worked on
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col group hover:shadow-lg transition-shadow">
              {project.image && (
                <Link href={project.slug ? `/${locale}/projects/${project.slug}` : '#'}>
                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg border-b">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                </Link>
              )}
              <CardHeader>
                <Link href={project.slug ? `/${locale}/projects/${project.slug}` : '#'}>
                  <CardTitle className="hover:text-primary transition-colors">{project.title}</CardTitle>
                </Link>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="gap-2">
                {project.slug && (
                  <Button variant="default" size="sm" className="flex-1" asChild>
                    <Link href={`/${locale}/projects/${project.slug}`}>
                      View Details
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                )}
                {project.link && (
                  <Button variant="outline" size="sm" className={project.slug ? "" : "w-full"} asChild>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

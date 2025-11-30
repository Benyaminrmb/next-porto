"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

interface HeroCleanProps {
  name: string;
  title?: string;
  description: string;
}

export function HeroClean({ name, title, description }: HeroCleanProps) {
  return (
    <section className="section-padding border-b">
      <div className="section-container">
        <div className="max-w-3xl">
          {/* Status badge */}
          <Badge variant="secondary" className="mb-6">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </Badge>

          {/* Name and title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {name}
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
            {title || "Full Stack Developer"}
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button size="lg" asChild>
              <a href="#projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </a>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/benyaminrmb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://linkedin.com/in/benyaminrmb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

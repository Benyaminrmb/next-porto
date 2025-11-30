"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AboutCleanProps {
  name: string;
  description: string;
  highlights: string[];
}

export function AboutClean({ name, description, highlights }: AboutCleanProps) {
  return (
    <section id="about" className="section-padding border-b">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">About</h2>
          <p className="text-muted-foreground">
            Get to know more about my background and expertise
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
              <CardDescription>Who I am and what I do</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Highlights</CardTitle>
              <CardDescription>Key achievements and focus areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

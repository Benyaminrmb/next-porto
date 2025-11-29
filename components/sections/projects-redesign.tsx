"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Star } from "lucide-react";
import Image from "next/image";

interface Project {
  id?: number;
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  link?: string;
  category?: string;
  featured?: boolean;
}

interface ProjectsRedesignProps {
  projects: Project[];
}

export function ProjectsRedesign({ projects = [] }: ProjectsRedesignProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("all");

  const categories: string[] = ["all", "featured", ...Array.from(new Set(projects.map(p => p.category).filter((c): c is string => typeof c === 'string')))];

  const filteredProjects = filter === "all"
    ? projects
    : filter === "featured"
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="projects" ref={ref} className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-4 py-2" variant="outline">
            <Star className="w-4 h-4 mr-2" />
            Featured Work
          </Badge>
          <h2 className="text-5xl md:text-7xl text-display gradient-text mb-6">
            Selected Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, spanning web applications, tools, and creative experiments
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <Tabs value={filter} onValueChange={setFilter} className="w-full max-w-2xl">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 glass-card p-2">
              {categories.slice(0, 5).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} variants={cardVariants} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No projects found in this category</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, variants }: { project: Project; index: number; variants: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      <Card className="glass-card overflow-hidden h-full group border-2 hover:border-primary/50 transition-colors">
        {/* Project Image */}
        {project.image && (
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {project.featured && (
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            )}
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-2xl text-display group-hover:gradient-text transition-all">
            {project.title}
          </CardTitle>
          <CardDescription className="text-base">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(project.technologies || project.tags || []).slice(0, 5).map((tech, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {(project.technologies || project.tags || []).length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{(project.technologies || project.tags || []).length - 5}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="gap-2">
          {project.githubUrl && (
            <Button variant="outline" size="sm" className="flex-1 glass-card" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          {(project.liveUrl || project.link) && (
            <Button size="sm" className="flex-1" asChild>
              <a href={project.liveUrl || project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

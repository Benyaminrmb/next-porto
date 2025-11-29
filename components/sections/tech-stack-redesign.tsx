"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Code2,
  Database,
  Wrench,
  Globe,
  Zap,
  Palette,
  Server,
  Cloud
} from "lucide-react";

interface TechCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  technologies: TechItem[];
}

interface TechItem {
  name: string;
  level?: string;
  description?: string;
}

export function TechStackRedesign() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const techStack: TechCategory[] = [
    {
      name: "Frontend",
      icon: <Palette className="w-5 h-5" />,
      color: "from-pink-500 to-rose-500",
      technologies: [
        { name: "React", level: "Expert", description: "Building dynamic UIs with hooks and context" },
        { name: "Next.js", level: "Expert", description: "Server-side rendering and static generation" },
        { name: "TypeScript", level: "Advanced", description: "Type-safe JavaScript development" },
        { name: "Tailwind CSS", level: "Expert", description: "Utility-first CSS framework" },
        { name: "Framer Motion", level: "Advanced", description: "Animation library for React" },
      ]
    },
    {
      name: "Backend",
      icon: <Server className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      technologies: [
        { name: "Laravel", level: "Expert", description: "PHP framework for web applications" },
        { name: "PHP", level: "Expert", description: "Server-side scripting language" },
        { name: "Node.js", level: "Advanced", description: "JavaScript runtime for backend" },
        { name: "Express", level: "Advanced", description: "Web framework for Node.js" },
      ]
    },
    {
      name: "Database",
      icon: <Database className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      technologies: [
        { name: "MySQL", level: "Expert", description: "Relational database management" },
        { name: "PostgreSQL", level: "Advanced", description: "Advanced relational database" },
        { name: "MongoDB", level: "Intermediate", description: "NoSQL document database" },
        { name: "Redis", level: "Advanced", description: "In-memory data structure store" },
      ]
    },
    {
      name: "DevOps & Tools",
      icon: <Wrench className="w-5 h-5" />,
      color: "from-orange-500 to-amber-500",
      technologies: [
        { name: "Git", level: "Expert", description: "Version control system" },
        { name: "Docker", level: "Advanced", description: "Containerization platform" },
        { name: "AWS", level: "Intermediate", description: "Cloud computing services" },
        { name: "CI/CD", level: "Advanced", description: "Continuous integration and deployment" },
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
    <section id="tech-stack" ref={ref} className="section-padding bg-gradient-to-b from-background to-primary/5">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-4 py-2" variant="outline">
            <Zap className="w-4 h-4 mr-2" />
            Technologies
          </Badge>
          <h2 className="text-5xl md:text-7xl text-display gradient-text mb-6">
            Tech Stack
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <TooltipProvider delayDuration={100}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {techStack.map((category, categoryIndex) => (
              <motion.div key={category.name} variants={itemVariants}>
                <Card className="glass-card overflow-hidden h-full border-2 hover:border-primary/30 transition-all group">
                  <div className={`h-2 bg-gradient-to-r ${category.color}`} />

                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                        {category.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-display">
                        {category.name}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {category.technologies.map((tech, techIndex) => (
                        <Tooltip key={techIndex}>
                          <TooltipTrigger asChild>
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: categoryIndex * 0.1 + techIndex * 0.05
                              }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge
                                variant="secondary"
                                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all"
                              >
                                {tech.name}
                                {tech.level && (
                                  <span className="ml-2 text-xs opacity-70">
                                    {getLevelDots(tech.level)}
                                  </span>
                                )}
                              </Badge>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="max-w-xs glass-card"
                          >
                            <div className="space-y-1">
                              <p className="font-semibold">{tech.name}</p>
                              {tech.level && (
                                <p className="text-xs text-muted-foreground">
                                  Level: {tech.level}
                                </p>
                              )}
                              {tech.description && (
                                <p className="text-sm text-muted-foreground">
                                  {tech.description}
                                </p>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TooltipProvider>

        {/* Additional Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-display">
            Other Skills & Interests
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "REST APIs",
              "GraphQL",
              "WebSockets",
              "Microservices",
              "Test-Driven Development",
              "Agile/Scrum",
              "UI/UX Design",
              "Performance Optimization",
              "SEO",
              "Accessibility",
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2 glass-card hover-lift cursor-default"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function getLevelDots(level: string): string {
  const levels: Record<string, string> = {
    "Expert": "●●●",
    "Advanced": "●●○",
    "Intermediate": "●○○",
    "Beginner": "○○○",
  };
  return levels[level] || "";
}

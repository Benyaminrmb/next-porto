"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

interface Experience {
  id?: number;
  title: string;
  company?: string;
  organization?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  period?: string;
  description: string | string[];
  type?: string;
  technologies?: string[];
}

interface ExperienceRedesignProps {
  experiences: Experience[];
}

export function ExperienceRedesign({ experiences = [] }: ExperienceRedesignProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const workExperience = experiences.filter(exp => exp.company || exp.type === 'work');
  const education = experiences.filter(exp => exp.organization || exp.type === 'education');

  return (
    <section id="experience" ref={ref} className="section-padding bg-gradient-to-b from-secondary/20 to-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-4 py-2" variant="outline">
            <Briefcase className="w-4 h-4 mr-2" />
            Career Journey
          </Badge>
          <h2 className="text-5xl md:text-7xl text-display gradient-text mb-6">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and educational background
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-display">Work Experience</h3>
              </motion.div>

              <div className="space-y-6 relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-transparent">
                {workExperience.map((exp, index) => (
                  <ExperienceCard
                    key={index}
                    experience={exp}
                    index={index}
                    isInView={isInView}
                    icon={<Briefcase className="w-4 h-4" />}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-3 rounded-full bg-accent/10 border border-accent/20">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-3xl font-bold text-display">Education</h3>
              </motion.div>

              <div className="space-y-6 relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-accent before:to-transparent">
                {education.map((exp, index) => (
                  <ExperienceCard
                    key={index}
                    experience={exp}
                    index={index}
                    isInView={isInView}
                    icon={<GraduationCap className="w-4 h-4" />}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* If no work/education split, show all in single timeline */}
        {workExperience.length === 0 && education.length === 0 && experiences.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6 relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-accent before:to-transparent">
              {experiences.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  experience={exp}
                  index={index}
                  isInView={isInView}
                  icon={<Briefcase className="w-4 h-4" />}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
  isInView,
  icon
}: {
  experience: Experience;
  index: number;
  isInView: boolean;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="relative"
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute -left-[34px] top-6 w-3 h-3 rounded-full bg-primary border-4 border-background"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
      />

      <Card className="glass-card border-l-4 border-l-primary/50 hover-lift group">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-xl group-hover:gradient-text transition-all">
                {experience.title}
              </CardTitle>
              <CardDescription className="text-base font-semibold mt-1">
                {experience.company || experience.organization}
              </CardDescription>
            </div>
            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              {icon}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
            {(experience.startDate || experience.endDate || experience.period) && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>
                  {experience.period || `${experience.startDate}${experience.endDate ? ` - ${experience.endDate}` : ' - Present'}`}
                </span>
              </div>
            )}
            {experience.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {Array.isArray(experience.description) ? (
            <ul className="text-muted-foreground leading-relaxed mb-4 space-y-2">
              {experience.description.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground leading-relaxed mb-4">
              {experience.description}
            </p>
          )}

          {experience.technologies && experience.technologies.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

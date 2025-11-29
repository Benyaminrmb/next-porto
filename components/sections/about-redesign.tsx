"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Code,
  Coffee,
  Sparkles,
  Target,
  Users,
  Rocket,
  Award
} from "lucide-react";

interface AboutRedesignProps {
  name: string;
  description: string;
  highlights?: string[];
}

export function AboutRedesign({ name, description, highlights = [] }: AboutRedesignProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Years Experience", value: "6+", icon: <Award className="w-5 h-5" /> },
    { label: "Projects Completed", value: "50+", icon: <Rocket className="w-5 h-5" /> },
    { label: "Happy Clients", value: "30+", icon: <Users className="w-5 h-5" /> },
    { label: "Coffee Consumed", value: "∞", icon: <Coffee className="w-5 h-5" /> },
  ];

  const values = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Clean Code",
      description: "I believe in writing maintainable, scalable, and well-documented code that stands the test of time."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "User-Centric",
      description: "Every line of code I write is focused on creating exceptional user experiences."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Innovation",
      description: "Constantly exploring new technologies and approaches to solve complex problems creatively."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion",
      description: "Driven by genuine love for development and commitment to continuous learning and growth."
    },
  ];

  return (
    <section id="about" ref={ref} className="section-padding bg-gradient-to-b from-primary/5 to-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-4 py-2" variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            About Me
          </Badge>
          <h2 className="text-5xl md:text-7xl text-display gradient-text mb-6">
            Who I Am
          </h2>
        </motion.div>

        {/* Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="glass-card h-full p-8 border-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-display mb-4">
                    Hello! I'm {name}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>

                {highlights.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="text-xl font-semibold">Highlights</h4>
                      <ul className="space-y-2">
                        {highlights.map((highlight, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span>{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <Separator />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="text-center p-4 rounded-lg glass-card"
                    >
                      <div className="flex justify-center mb-2 text-primary">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold gradient-text">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Side Cards - Stacked vertically */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Floating Image Card */}
            <Card className="glass-card overflow-hidden border-2 hover-lift">
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Code className="w-24 h-24 text-primary/40" />
                  </motion.div>
                </div>
              </div>
            </Card>

            {/* Quick Info Card */}
            <Card className="glass-card border-2 p-6 hover-lift">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Quick Facts
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🎯 Based in Remote</li>
                <li>💼 Open to freelance</li>
                <li>🚀 Love building SaaS</li>
                <li>🎨 Design enthusiast</li>
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-display">
            My Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="glass-card h-full p-6 text-center border-2 hover:border-primary/50 transition-colors">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent text-white">
                      {value.icon}
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

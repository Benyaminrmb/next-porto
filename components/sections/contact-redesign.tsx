"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
  Calendar
} from "lucide-react";

interface ContactRedesignProps {
  email?: string;
  phone?: string;
  location?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export function ContactRedesign({
  email = "hello@example.com",
  phone,
  location,
  social = {}
}: ContactRedesignProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      color: "from-pink-500 to-rose-500",
    },
    ...(phone ? [{
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: phone,
      href: `tel:${phone}`,
      color: "from-blue-500 to-cyan-500",
    }] : []),
    ...(location ? [{
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: location,
      href: null,
      color: "from-green-500 to-emerald-500",
    }] : []),
  ];

  const socialLinks = [
    ...(social.github ? [{
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: social.github,
      username: social.github.split('/').pop() || 'GitHub',
    }] : []),
    ...(social.linkedin ? [{
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: social.linkedin,
      username: social.linkedin.split('/').pop() || 'LinkedIn',
    }] : []),
    ...(social.twitter ? [{
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      href: social.twitter,
      username: social.twitter.split('/').pop() || 'Twitter',
    }] : []),
  ];

  return (
    <section id="contact" ref={ref} className="section-padding bg-gradient-to-b from-background to-primary/10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-4 py-2" variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Get In Touch
          </Badge>
          <h2 className="text-5xl md:text-7xl text-display gradient-text mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-display mb-6">
              Contact Information
            </h3>

            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 8 }}
              >
                {method.href ? (
                  <a href={method.href}>
                    <Card className="glass-card border-2 hover:border-primary/50 transition-all cursor-pointer">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${method.color} text-white shadow-lg`}>
                          {method.icon}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {method.label}
                          </p>
                          <p className="text-lg font-semibold">
                            {method.value}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Card className="glass-card border-2">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${method.color} text-white shadow-lg`}>
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {method.label}
                        </p>
                        <p className="text-lg font-semibold">
                          {method.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <h4 className="text-xl font-semibold mb-4">
                  Find me on
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-3 glass-card rounded-full border-2 hover:border-primary/50 transition-all"
                    >
                      {social.icon}
                      <span className="font-medium">
                        {social.username}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-card border-2 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-3xl text-display">
                  Start a Project
                </CardTitle>
                <CardDescription className="text-base">
                  Ready to bring your ideas to life? Let's discuss how we can work together.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <div className="p-6 rounded-lg glass-dark border border-white/10">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Quick Response
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      I typically respond within 24 hours on business days
                    </p>
                  </div>

                  <div className="p-6 rounded-lg glass-dark border border-white/10">
                    <h4 className="font-semibold mb-2">
                      📋 What to Include
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Project description and goals</li>
                      <li>• Timeline and budget expectations</li>
                      <li>• Any relevant links or documents</li>
                    </ul>
                  </div>
                </div>

                {/* Email CTA Button with Sheet */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      size="lg"
                      className="w-full group relative overflow-hidden text-lg py-6 rounded-full shadow-xl glow-purple"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Send a Message
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="glass-card sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle className="text-2xl">Get in Touch</SheetTitle>
                      <SheetDescription>
                        Choose your preferred way to reach out
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-8 space-y-4">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full justify-start glass-card text-left h-auto py-4"
                        asChild
                      >
                        <a href={`mailto:${email}`}>
                          <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                          <div>
                            <div className="font-semibold">Email Me</div>
                            <div className="text-xs text-muted-foreground">{email}</div>
                          </div>
                        </a>
                      </Button>

                      {phone && (
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full justify-start glass-card text-left h-auto py-4"
                          asChild
                        >
                          <a href={`tel:${phone}`}>
                            <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                            <div>
                              <div className="font-semibold">Call Me</div>
                              <div className="text-xs text-muted-foreground">{phone}</div>
                            </div>
                          </a>
                        </Button>
                      )}

                      {social.linkedin && (
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full justify-start glass-card text-left h-auto py-4"
                          asChild
                        >
                          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-5 h-5 mr-3 flex-shrink-0" />
                            <div>
                              <div className="font-semibold">LinkedIn</div>
                              <div className="text-xs text-muted-foreground">Connect with me</div>
                            </div>
                          </a>
                        </Button>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-xs text-center text-muted-foreground">
                  Or email me directly at{" "}
                  <a href={`mailto:${email}`} className="text-primary hover:underline font-medium">
                    {email}
                  </a>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

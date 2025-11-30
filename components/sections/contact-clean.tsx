"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";

interface ContactCleanProps {
  email: string;
  phone?: string;
  location?: string;
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
}

export function ContactClean({ email, phone, location, social }: ContactCleanProps) {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    phone && {
      icon: Phone,
      label: "Phone",
      value: phone,
      href: `tel:${phone}`,
    },
    location && {
      icon: MapPin,
      label: "Location",
      value: location,
      href: null,
    },
  ].filter(Boolean) as Array<{
    icon: any;
    label: string;
    value: string;
    href: string | null;
  }>;

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: social.github,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: social.linkedin,
    },
  ];

  return (
    <section id="contact" className="section-padding border-b">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Get in Touch</h2>
          <p className="text-muted-foreground">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How to reach me</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Connect with me online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {socialLinks.map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-between"
                  asChild
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

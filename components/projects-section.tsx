"use client";

import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "A web app for managing tasks.",
      image: "/images/project1.jpg",
      link: "https://project1.com",
    },
    {
      id: 2,
      title: "Project 2",
      description: "A portfolio website built with Next.js.",
      image: "/images/project2.jpg",
      link: "https://project2.com",
    },
  ];

  return (
    <div className="py-20 bg-slate-950" id="projects">
      <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
        My Projects
      </h2>
      <div className="flex flex-wrap justify-center gap-10">
        {projects.map((project) => (
          <CardContainer key={project.id} className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {project.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {project.description}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-60 object-cover rounded-xl"
                />
              </CardItem>
              <CardItem
                translateZ="80"
                className="w-full mt-4 flex justify-center"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-black dark:bg-white dark:text-black"
                >
                  Visit Project →
                </a>
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}
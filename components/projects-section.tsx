"use client";

export function ProjectsSection({ projects }: { projects: { id: number; title: string; description: string; image: string; link: string }[] }) {
  return (
    <div className="py-20 bg-slate-800" id="projects">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                >
                  Visit Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
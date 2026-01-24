import BCard from '@/components/main/b-card';
import { getData } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default async function Projects() {
  const data = await getData();
  return (
    <BCard>
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        Projects
      </h1>
      <div className="grid gap-4 mt-4">
        {data.projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {project.link && (
                <a href={project.link} className="text-primary hover:underline">
                  View Project
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </BCard>
  );
}
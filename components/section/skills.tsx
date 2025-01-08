import BCard from '@/components/main/b-card';
import { getData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export default async function Skills() {
  const data = await getData();
  return (
    <BCard>
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        Skills
      </h1>
      <div className="flex flex-wrap gap-2 mt-4">
        {data.skills.map((skill, index) => (
          <Badge key={index} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>
    </BCard>
  );
}
export function SkillsSection({ skills }: { skills: string[] }) {
  return (
    <div className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Skills
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
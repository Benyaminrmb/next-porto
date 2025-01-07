export function ContactSection({ contact }: { contact: { email: string; phone: string; github: string; linkedin: string } }) {
  return (
    <div className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Get in Touch
        </h2>
        <div className="flex flex-col items-center space-y-6">
          <a
            href={`mailto:${contact.email}`}
            className="text-lg text-white hover:text-slate-300 transition-colors"
          >
            📧 {contact.email}
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="text-lg text-white hover:text-slate-300 transition-colors"
          >
            📞 {contact.phone}
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-white hover:text-slate-300 transition-colors"
          >
            🐙 GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-white hover:text-slate-300 transition-colors"
          >
            🔗 LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
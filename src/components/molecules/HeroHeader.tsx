interface HeroHeaderProps {
  title: string;
  subtitle: string;
  userName?: string;
}

export function HeroHeader({ title, subtitle, userName }: HeroHeaderProps) {
  return (
    <section className="ml-2 mr-4 lg:ml-8 lg:mr-12">
      <p className="text-[10px] font-light tracking-[0.05em] uppercase text-neutral-500 mb-1">{subtitle}</p>
      <h2 className="text-4xl font-bold tracking-tight text-on-surface">
        {title}
        {userName && <span className="text-primary">, {userName}</span>}
      </h2>
    </section>
  );
}
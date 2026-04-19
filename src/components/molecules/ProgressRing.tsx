interface ProgressRingProps {
  value: number;
  max: number;
  currentLabel: string;
  subtitle: string;
  title: string;
  colorClass: string;
  bgColorClass?: string;
}

export function ProgressRing({ value, max, currentLabel, subtitle, title, colorClass, bgColorClass = 'text-surface-container-highest' }: ProgressRingProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden group">
      <div className={`absolute -top-4 -right-4 w-24 h-24 ${colorClass}/10 rounded-full blur-2xl group-hover:${colorClass}/20 transition-all`} />
      <div className="relative flex items-center justify-center mb-6">
        <svg className="w-40 h-40">
          <circle className={`${bgColorClass} stroke-current`} cx="80" cy="80" fill="transparent" r={radius} strokeWidth="12" />
          <circle
            className={`${colorClass} stroke-current progress-ring-circle`}
            cx="80"
            cy="80"
            fill="transparent"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            strokeWidth="12"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tracking-tight">{currentLabel}</span>
          <span className="text-[10px] font-light tracking-widest uppercase text-neutral-400">{subtitle}</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-neutral-500">{Math.round(percentage * 100)}% de la meta diaria alcanzada</p>
      </div>
    </div>
  );
}
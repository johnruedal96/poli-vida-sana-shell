interface NutrientBarProps {
  label: string;
  current: number;
  max: number;
  colorClass: string;
}

export function NutrientBar({ label, current, max, colorClass }: NutrientBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-semibold uppercase tracking-wider">
        <span>{label}</span>
        <span>{current}g / {max}g</span>
      </div>
      <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
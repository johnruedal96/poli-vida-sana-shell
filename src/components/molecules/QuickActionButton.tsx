import type { ReactNode } from 'react';

interface QuickActionButtonProps {
  icon: ReactNode;
  label: string;
  colorClass: string;
  bgColorClass: string;
  onClick: () => void;
}

export function QuickActionButton({ icon, label, colorClass, bgColorClass, onClick }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-full group hover:shadow-lg transition-all active:scale-95 w-full"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full ${bgColorClass} flex items-center justify-center ${colorClass} group-hover:bg-primary group-hover:text-white transition-colors`}>
          {icon}
        </div>
        <span className="font-semibold text-lg">{label}</span>
      </div>
      <span className="material-symbols-outlined text-neutral-300 group-hover:text-primary transition-colors">add_circle</span>
    </button>
  );
}
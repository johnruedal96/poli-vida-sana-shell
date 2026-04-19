import { colors, spacing, borderRadius } from '../../styles/tokens';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
}

export function ProgressBar({ value, max, label, color = colors.primary }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const containerStyles: React.CSSProperties = {
    width: '100%',
  };

  const labelStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
    fontSize: '14px',
    color: colors.text,
  };

  const barContainerStyles: React.CSSProperties = {
    width: '100%',
    height: '12px',
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  };

  const barStyles: React.CSSProperties = {
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: color,
    borderRadius: borderRadius.full,
    transition: 'width 0.3s ease',
  };

  return (
    <div style={containerStyles}>
      {label && (
        <div style={labelStyles}>
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div style={barContainerStyles}>
        <div style={barStyles} />
      </div>
    </div>
  );
}
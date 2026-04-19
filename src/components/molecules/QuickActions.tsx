import { colors, spacing, borderRadius, shadows } from '../../styles/tokens';

interface QuickActionsProps {
  onAddFood: () => void;
  onAddWorkout: () => void;
}

export function QuickActions({ onAddFood, onAddWorkout }: QuickActionsProps) {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing.md,
    padding: spacing.md,
  };

  const actionStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.md,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  };

  const iconStyles: React.CSSProperties = {
    fontSize: '32px',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
  };

  return (
    <div style={containerStyles}>
      <div style={actionStyles} onClick={onAddFood}>
        <div style={{ ...iconStyles, backgroundColor: '#E8F5E9' }}>
          🍎
        </div>
        <span style={{ fontWeight: 500 }}>Añadir Comida</span>
      </div>
      <div style={actionStyles} onClick={onAddWorkout}>
        <div style={{ ...iconStyles, backgroundColor: '#E3F2FD' }}>
          💪
        </div>
        <span style={{ fontWeight: 500 }}>Añadir Ejercicio</span>
      </div>
    </div>
  );
}
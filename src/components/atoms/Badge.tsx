import { colors, spacing, borderRadius, typography } from '../../styles/tokens';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error';
}

export function Badge({ children, variant = 'primary' }: BadgeProps) {
  const variantColors = {
    primary: colors.primary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  };

  const badgeStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: borderRadius.full,
    fontSize: typography.caption.fontSize,
    fontWeight: 600,
    color: '#fff',
    backgroundColor: variantColors[variant],
  };

  return <span style={badgeStyles}>{children}</span>;
}
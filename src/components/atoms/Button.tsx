import { colors, spacing, borderRadius, typography, shadows } from '../../styles/tokens';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  fullWidth = false,
  style 
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    border: 'none',
    borderRadius: borderRadius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: typography.body.fontWeight,
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: `${spacing.xs} ${spacing.sm}`, fontSize: '14px' },
    md: { padding: `${spacing.sm} ${spacing.md}`, fontSize: '16px' },
    lg: { padding: `${spacing.md} ${spacing.lg}`, fontSize: '18px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: { 
      backgroundColor: colors.primary, 
      color: '#fff',
      boxShadow: shadows.sm,
    },
    secondary: { 
      backgroundColor: colors.secondary, 
      color: '#fff',
      boxShadow: shadows.sm,
    },
    outline: { 
      backgroundColor: 'transparent', 
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyles, ...sizeStyles[size], ...variantStyles[variant], ...style }}
    >
      {children}
    </button>
  );
}
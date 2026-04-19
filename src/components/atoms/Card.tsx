import { colors, spacing, borderRadius, shadows } from '../../styles/tokens';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export function Card({ children, onClick, padding = 'md', style }: CardProps) {
  const paddingMap = { none: '0', sm: spacing.sm, md: spacing.md, lg: spacing.lg };
  
  const cardStyles: React.CSSProperties = {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.md,
    padding: paddingMap[padding],
    cursor: onClick ? 'pointer' : 'default',
    transition: onClick ? 'transform 0.2s ease, box-shadow 0.2s ease' : 'none',
    ...style,
  };

  return (
    <div 
      style={cardStyles}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
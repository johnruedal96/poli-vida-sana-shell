import { colors, spacing, borderRadius, typography } from '../../styles/tokens';
import { Card } from '../atoms/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: string;
  color?: string;
}

export function StatCard({ title, value, unit, icon, color = colors.primary }: StatCardProps) {
  return (
    <Card padding="md">
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: borderRadius.full,
          backgroundColor: `${color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}>
          {icon}
        </div>
        <div>
          <div style={{ ...typography.caption, color: colors.textSecondary }}>{title}</div>
          <div style={{ ...typography.h2, color: colors.text }}>
            {value}
            {unit && <span style={{ ...typography.body, color: colors.textSecondary }}> {unit}</span>}
          </div>
        </div>
      </div>
    </Card>
  );
}
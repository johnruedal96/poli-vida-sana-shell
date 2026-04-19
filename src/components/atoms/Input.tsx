import { colors, spacing, borderRadius, typography } from '../../styles/tokens';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'date';
  label?: string;
  error?: string;
}

export function Input({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  label,
  error 
}: InputProps) {
  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: borderRadius.md,
    border: `1px solid ${error ? colors.error : colors.border}`,
    fontSize: typography.body.fontSize,
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  };

  const labelStyles: React.CSSProperties = {
    display: 'block',
    marginBottom: spacing.xs,
    color: colors.text,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: 500,
  };

  return (
    <div style={{ width: '100%' }}>
      {label && <label style={labelStyles}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyles}
      />
      {error && (
        <span style={{ color: colors.error, fontSize: '12px', marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
}
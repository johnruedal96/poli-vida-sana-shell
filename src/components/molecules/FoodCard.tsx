import { colors, spacing, typography } from '../../styles/tokens';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
  time: string;
}

interface FoodCardProps {
  food: FoodItem;
  onDelete?: (id: string) => void;
}

export function FoodCard({ food, onDelete }: FoodCardProps) {
  const cardStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const infoStyles: React.CSSProperties = {
    flex: 1,
  };

  const deleteButton: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: spacing.sm,
    color: colors.textSecondary,
  };

  return (
    <Card padding="md">
      <div style={cardStyles}>
        <div style={infoStyles}>
          <div style={{ ...typography.body, fontWeight: 500 }}>{food.name}</div>
          <div style={{ ...typography.caption, color: colors.textSecondary, marginTop: '4px' }}>
            {food.portion} • {food.time}
          </div>
          <div style={{ display: 'flex', gap: spacing.sm, marginTop: spacing.sm }}>
            <Badge variant="success">{food.calories} kcal</Badge>
            <Badge variant="primary">P: {food.protein}g</Badge>
            <Badge variant="warning">C: {food.carbs}g</Badge>
            <Badge variant="error">G: {food.fat}g</Badge>
          </div>
        </div>
        {onDelete && (
          <button style={deleteButton} onClick={() => onDelete(food.id)}>✕</button>
        )}
      </div>
    </Card>
  );
}
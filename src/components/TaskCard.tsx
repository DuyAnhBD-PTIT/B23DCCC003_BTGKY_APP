import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Task } from '../types/tasks';
import { isTaskOverdue } from '../utils/date';
import { Checkbox } from './Checkbox';
import { Badge } from './Badge';
import { COLORS, FONT_SIZE, RADIUS, SHADOW, SPACING } from '../theme/color';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onLongPress: () => void;
  onToggleDone: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  onLongPress,
  onToggleDone,
}) => {
  const overdue = isTaskOverdue(task.dueDate, task.done);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={350}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Checkbox
        checked={task.done}
        onPress={onToggleDone}
        style={styles.checkboxMargin}
      />

      <View style={styles.cardBody}>
        <Text
          style={[styles.taskTitle, task.done && styles.taskTitleDone]}
          numberOfLines={2}
        >
          {task.title}
        </Text>

        <View style={styles.metaRow}>
          <Badge label={task.category} variant="category" />
          <Text style={styles.dueDateText}>Hạn: {task.dueDate}</Text>
        </View>

        <View style={styles.badgesRow}>
          <Badge
            label={`Ưu tiên: ${task.priority}`}
            variant="priority"
            priority={task.priority}
          />
          {overdue && <Badge label="Quá hạn" variant="overdue" />}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW,
  },
  cardPressed: {
    opacity: 0.85,
  },
  checkboxMargin: {
    marginRight: SPACING.md,
    marginTop: 2,
  },
  cardBody: {
    flex: 1,
  },
  taskTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  dueDateText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '../types/tasks';
import { getRemainingDaysText, isTaskOverdue } from '../utils/date';
import { Badge } from './Badge';
import { Divider } from './Divider';
import { InfoRow } from './InfoRow';
import { COLORS, FONT_SIZE, RADIUS, SHADOW, SPACING } from '../theme/color';

interface TaskDetailCardProps {
  task: Task;
}

export const TaskDetailCard: React.FC<TaskDetailCardProps> = ({ task }) => {
  const overdue = isTaskOverdue(task.dueDate, task.done);
  const remainingText = getRemainingDaysText(task.dueDate);

  return (
    <View style={styles.detailCard}>
      <View style={styles.topBadgesRow}>
        <Badge
          label={task.done ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
          variant={task.done ? 'statusDone' : 'statusPending'}
          size="md"
          pill
        />
        {overdue && <Badge label="Quá hạn" variant="overdue" size="md" pill />}
      </View>

      <Text style={[styles.title, task.done && styles.titleDone]}>
        {task.title}
      </Text>

      <Divider />

      <InfoRow label="Danh mục">
        <Badge label={task.category} variant="category" size="md" />
      </InfoRow>

      <InfoRow label="Mức độ ưu tiên">
        <Badge
          label={task.priority}
          variant="priority"
          priority={task.priority}
          size="md"
        />
      </InfoRow>

      <InfoRow label="Hạn hoàn thành" value={task.dueDate} />

      <InfoRow
        label="Thời gian còn lại"
        value={remainingText}
        valueStyle={overdue ? styles.remainingOverdue : styles.remainingNormal}
      />

      <Divider />

      <Text style={styles.noteHeading}>Ghi chú</Text>
      <Text style={styles.noteContent}>
        {task.note ? task.note : 'Không có ghi chú cho công việc này.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    ...SHADOW,
  },
  topBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    lineHeight: 28,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  remainingNormal: {
    color: COLORS.primary,
  },
  remainingOverdue: {
    color: COLORS.danger,
  },
  noteHeading: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  noteContent: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from './ProgressBar';
import { COLORS, FONT_SIZE, RADIUS, SHADOW, SPACING } from '../theme/color';

interface ProgressCardProps {
  completedCount: number;
  totalCount: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  completedCount,
  totalCount,
}) => {
  const percent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Tiến độ công việc</Text>
        <Text style={styles.countText}>
          Đã hoàn thành {completedCount}/{totalCount} công việc
        </Text>
      </View>
      <ProgressBar percent={percent} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.primary,
  },
  countText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});

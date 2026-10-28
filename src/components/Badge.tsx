import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Priority } from '../types/tasks';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../theme/color';

type BadgeVariant =
  | 'priority'
  | 'category'
  | 'overdue'
  | 'statusDone'
  | 'statusPending';

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
  priority?: Priority;
  size?: 'sm' | 'md';
  pill?: boolean;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant,
  priority,
  size = 'sm',
  pill = false,
  style,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'priority':
        if (priority === 'Cao') {
          return { bg: COLORS.priorityHighBg, text: COLORS.priorityHigh };
        }
        if (priority === 'Trung bình') {
          return { bg: COLORS.priorityMediumBg, text: COLORS.priorityMedium };
        }
        return { bg: COLORS.priorityLowBg, text: COLORS.priorityLow };
      case 'category':
      case 'statusPending':
        return { bg: COLORS.primaryLight, text: COLORS.primary };
      case 'overdue':
        return { bg: COLORS.dangerBg, text: COLORS.danger };
      case 'statusDone':
        return { bg: COLORS.successBg, text: COLORS.success };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.base,
        size === 'md' ? styles.sizeMd : styles.sizeSm,
        pill ? styles.pill : styles.rounded,
        { backgroundColor: colors.bg },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          size === 'md' ? styles.textMd : styles.textSm,
          { color: colors.text },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
  },
  sizeSm: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
  },
  sizeMd: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  rounded: {
    borderRadius: RADIUS.sm,
  },
  pill: {
    borderRadius: RADIUS.full,
  },
  text: {
    fontWeight: '700',
  },
  textSm: {
    fontSize: FONT_SIZE.xs,
  },
  textMd: {
    fontSize: FONT_SIZE.sm,
  },
});

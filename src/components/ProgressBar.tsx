import React from 'react';
import { View, StyleSheet, DimensionValue, ViewStyle } from 'react-native';
import { COLORS, RADIUS } from '../theme/color';

export interface ProgressBarProps {
  percent: number;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percent, style }) => {
  // Giới hạn phần trăm trong khoảng 0 - 100
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const fillWidth: DimensionValue = `${clampedPercent}%`;

  return (
    <View style={[styles.progressBarTrack, style]}>
      <View style={[styles.progressBarFill, { width: fillWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarTrack: {
    width: '100%',
    height: 10,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
});

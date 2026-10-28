import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../theme/color';

interface InfoRowProps {
  label: string;
  value?: string;
  valueStyle?: TextStyle;
  children?: React.ReactNode;
}

export const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  valueStyle,
  children,
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {children ? (
        children
      ) : (
        <Text style={[styles.value, valueStyle]}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  value: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
});

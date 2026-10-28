import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, FONT_SIZE, RADIUS } from '../theme/color';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => [
        styles.checkbox,
        checked && styles.checkboxChecked,
        pressed && styles.pressed,
        style,
      ]}
    >
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
});

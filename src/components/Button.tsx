import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, FONT_SIZE, RADIUS, SHADOW, SPACING } from '../theme/color';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'muted'
  | 'dangerSoft';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: 'sm' | 'md';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        size === 'sm' ? styles.sizeSm : styles.sizeMd,
        styles[`variant_${variant}`],
        disabled && styles.disabledBg,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.textBase,
          size === 'sm' ? styles.textSm : styles.textMd,
          styles[`text_${variant}`],
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeSm: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  sizeMd: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
  },
  variant_primary: {
    backgroundColor: COLORS.primary,
    ...SHADOW,
  },
  variant_secondary: {
    backgroundColor: COLORS.primaryLight,
  },
  variant_outline: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  variant_success: {
    backgroundColor: COLORS.success,
    ...SHADOW,
  },
  variant_muted: {
    backgroundColor: COLORS.textSecondary,
    ...SHADOW,
  },
  variant_dangerSoft: {
    backgroundColor: COLORS.dangerBg,
  },
  textBase: {
    fontWeight: '700',
  },
  textSm: {
    fontSize: FONT_SIZE.xs,
  },
  textMd: {
    fontSize: FONT_SIZE.md,
  },
  text_primary: {
    color: COLORS.white,
  },
  text_secondary: {
    color: COLORS.primary,
  },
  text_outline: {
    color: COLORS.textSecondary,
  },
  text_success: {
    color: COLORS.white,
  },
  text_muted: {
    color: COLORS.white,
  },
  text_dangerSoft: {
    color: COLORS.danger,
  },
  disabledBg: {
    backgroundColor: COLORS.disabledBg,
    borderColor: COLORS.disabledBg,
    elevation: 0,
    shadowOpacity: 0,
  },
  disabledText: {
    color: COLORS.disabledText,
  },
  pressed: {
    opacity: 0.75,
  },
});

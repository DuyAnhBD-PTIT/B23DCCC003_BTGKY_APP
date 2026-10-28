import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from 'react-native';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../theme/color';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  rightLabel?: string;
  isTextArea?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  rightLabel,
  isTextArea = false,
  style,
  ...inputProps
}) => {
  return (
    <View style={styles.fieldGroup}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {rightLabel && <Text style={styles.rightLabel}>{rightLabel}</Text>}
      </View>
      <TextInput
        placeholderTextColor={COLORS.textMuted}
        style={[
          styles.input,
          isTextArea && styles.textArea,
          error ? styles.inputError : null,
          style,
        ]}
        {...inputProps}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: SPACING.lg,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  rightLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.xs,
    color: COLORS.danger,
    fontWeight: '600',
  },
});

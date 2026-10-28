import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../theme/color';

export interface SelectorOption<T extends string> {
  key: T;
  label: string;
}

interface OptionSelectorProps<T extends string> {
  options: SelectorOption<T>[];
  selectedKey: T;
  onSelect: (key: T) => void;
  layout?: 'row' | 'grid';
  size?: 'sm' | 'md';
}

export const OptionSelector = <T extends string>({
  options,
  selectedKey,
  onSelect,
  layout = 'row',
  size = 'md',
}: OptionSelectorProps<T>) => {
  return (
    <View
      style={layout === 'grid' ? styles.gridContainer : styles.rowContainer}
    >
      {options.map(option => {
        const isSelected = option.key === selectedKey;
        return (
          <Pressable
            key={option.key}
            onPress={() => onSelect(option.key)}
            style={({ pressed }) => [
              styles.optionBase,
              layout === 'grid' ? styles.gridItem : styles.rowItem,
              size === 'sm' ? styles.sizeSm : styles.sizeMd,
              isSelected && styles.optionSelected,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.textBase,
                size === 'sm' ? styles.textSm : styles.textMd,
                isSelected && styles.textSelected,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.xs,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  optionBase: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowItem: {
    flex: 1,
  },
  gridItem: {
    width: '48%',
  },
  sizeSm: {
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
  },
  sizeMd: {
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
  },
  optionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  textBase: {
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  textSm: {
    fontSize: FONT_SIZE.xs,
  },
  textMd: {
    fontSize: FONT_SIZE.sm,
  },
  textSelected: {
    color: COLORS.white,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
});

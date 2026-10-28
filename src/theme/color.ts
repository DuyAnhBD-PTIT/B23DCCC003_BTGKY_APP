import { Platform } from 'react-native';

export const COLORS = {
  primary: '#12355B',
  primaryLight: '#E8EEF5',
  background: '#F4F6F9',
  surface: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',
  border: '#D1D5DB',
  borderLight: '#E5E7EB',

  priorityHigh: '#DC2626',
  priorityHighBg: '#FEE2E2',
  priorityMedium: '#D97706',
  priorityMediumBg: '#FEF3C7',
  priorityLow: '#2563EB',
  priorityLowBg: '#DBEAFE',

  success: '#059669',
  successBg: '#D1FAE5',
  danger: '#DC2626',
  dangerBg: '#FEE2E2',
  disabledBg: '#E5E7EB',
  disabledText: '#9CA3AF',
  white: '#FFFFFF',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  full: 999,
};

export const SHADOW = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
  },
  android: {
    elevation: 3,
  },
  default: {},
});

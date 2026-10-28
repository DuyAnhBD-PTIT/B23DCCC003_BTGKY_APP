export const getTodayZero = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const formatDateDDMMYYYY = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export const getRelativeDateString = (offsetDays: number): string => {
  const date = getTodayZero();
  date.setDate(date.getDate() + offsetDays);
  return formatDateDDMMYYYY(date);
};

export const parseDateStrictly = (dateStr: string): Date | null => {
  const trimmed = dateStr.trim();
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = trimmed.match(regex);
  if (!match) {
    return null;
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    year < 1900 ||
    year > 2100
  ) {
    return null;
  }

  const dateObj = new Date(year, month - 1, day);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    return null;
  }

  return dateObj;
};

export const isBeforeToday = (dateStr: string): boolean => {
  const parsed = parseDateStrictly(dateStr);
  if (!parsed) return false;
  const today = getTodayZero();
  return parsed.getTime() < today.getTime();
};

export const isTaskOverdue = (dueDate: string, done: boolean): boolean => {
  if (done) return false;
  return isBeforeToday(dueDate);
};

export const getDaysDiffFromToday = (dueDate: string): number => {
  const parsed = parseDateStrictly(dueDate);
  if (!parsed) return 0;
  const today = getTodayZero();
  const diffMs = parsed.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
};

export const getRemainingDaysText = (dueDate: string): string => {
  const diff = getDaysDiffFromToday(dueDate);
  if (diff === 0) {
    return 'Hạn hôm nay';
  }
  if (diff > 0) {
    return `Còn ${diff} ngày`;
  }
  return `Quá hạn ${Math.abs(diff)} ngày`;
};

export const formatDateInputMask = (rawText: string): string => {
  const digits = rawText.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

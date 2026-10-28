export type Category = 'Học tập' | 'Công việc' | 'Sức khoẻ' | 'Cá nhân';
export type Priority = 'Cao' | 'Trung bình' | 'Thấp';
export type FilterStatus = 'ALL' | 'PENDING' | 'DONE' | 'OVERDUE';
export type SortBy = 'DUE_DATE' | 'PRIORITY';

export interface Task {
  id: string;
  title: string;
  note: string;
  category: Category;
  priority: Priority;
  dueDate: string;
  done: boolean;
}

export type RootStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string } | undefined;
  TaskDetail: { taskId: string };
};

export const CATEGORIES: Category[] = [
  'Học tập',
  'Công việc',
  'Sức khoẻ',
  'Cá nhân',
];
export const PRIORITIES: Priority[] = ['Cao', 'Trung bình', 'Thấp'];

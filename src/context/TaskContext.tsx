import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/tasks';
import { getRelativeDateString } from '../utils/date';

const STORAGE_KEY = '@STUDENT_TASKS_DATA_V1';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (taskData: Omit<Task, 'id' | 'done'>) => void;
  updateTask: (id: string, taskData: Omit<Task, 'id' | 'done'>) => void;
  toggleTaskDone: (id: string) => void;
  deleteTask: (id: string) => void;
  deleteCompletedTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const createInitialSeedTasks = (): Task[] => [
  {
    id: 'task-1',
    title: 'Nộp báo cáo bài tập lớn Lập trình di động',
    note: 'Đầy đủ source code, file thuyết trình và video demo tính năng.',
    category: 'Học tập',
    priority: 'Cao',
    dueDate: getRelativeDateString(2),
    done: false,
  },
  {
    id: 'task-2',
    title: 'Đóng học phí học kỳ này',
    note: 'Chuyển khoản qua cổng thanh toán trực tuyến của trường.',
    category: 'Cá nhân',
    priority: 'Cao',
    dueDate: getRelativeDateString(-2),
    done: false,
  },
  {
    id: 'task-3',
    title: 'Ôn tập từ vựng và luyện đề TOEIC',
    note: 'Làm 1 đề Reading Part 5, 6, 7 và ghi chú từ mới.',
    category: 'Học tập',
    priority: 'Trung bình',
    dueDate: getRelativeDateString(0),
    done: true,
  },
  {
    id: 'task-4',
    title: 'Họp nhóm phân công thiết kế giao diện',
    note: 'Thống nhất bảng màu và luồng màn hình qua Google Meet lúc 20h.',
    category: 'Công việc',
    priority: 'Trung bình',
    dueDate: getRelativeDateString(-1),
    done: true,
  },
  {
    id: 'task-5',
    title: 'Chạy bộ 5km quanh công viên',
    note: 'Khởi động kỹ trước khi chạy, mang theo bình nước.',
    category: 'Sức khoẻ',
    priority: 'Thấp',
    dueDate: getRelativeDateString(1),
    done: false,
  },
  {
    id: 'task-6',
    title: 'Cập nhật CV ứng tuyển thực tập Frontend',
    note: 'Bổ sung dự án quản lý công việc React Native vừa làm.',
    category: 'Công việc',
    priority: 'Cao',
    dueDate: getRelativeDateString(5),
    done: false,
  },
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTasksFromStorage = async () => {
      try {
        const storedJson = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedJson !== null) {
          setTasks(JSON.parse(storedJson));
        } else {
          const initialTasks = createInitialSeedTasks();
          setTasks(initialTasks);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
        }
      } catch (error) {
        console.error('Lỗi khi đọc AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasksFromStorage();
  }, []);

  const persistTasks = async (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Lỗi khi lưu AsyncStorage:', error);
    }
  };

  const addTask = (taskData: Omit<Task, 'id' | 'done'>) => {
    const newTask: Task = {
      ...taskData,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      done: false,
    };
    persistTasks([newTask, ...tasks]);
  };

  const updateTask = (id: string, taskData: Omit<Task, 'id' | 'done'>) => {
    const updated = tasks.map(item =>
      item.id === id ? { ...item, ...taskData } : item,
    );
    persistTasks(updated);
  };

  const toggleTaskDone = (id: string) => {
    const updated = tasks.map(item =>
      item.id === id ? { ...item, done: !item.done } : item,
    );
    persistTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(item => item.id !== id);
    persistTasks(updated);
  };

  const deleteCompletedTasks = () => {
    const updated = tasks.filter(item => !item.done);
    persistTasks(updated);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        toggleTaskDone,
        deleteTask,
        deleteCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks phải được sử dụng bên trong TaskProvider');
  }
  return context;
};

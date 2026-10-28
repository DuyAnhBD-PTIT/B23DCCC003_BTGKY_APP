import React, { useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  FilterStatus,
  Priority,
  RootStackParamList,
  SortBy,
  Task,
} from '../types/tasks';
import { useTasks } from '../context/TaskContext';
import { isTaskOverdue, parseDateStrictly } from '../utils/date';
import { COLORS, SPACING } from '../theme/color';
import {
  Button,
  EmptyState,
  OptionSelector,
  ProgressCard,
  SearchBar,
  SelectorOption,
  TaskCard,
} from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

const FILTER_OPTIONS: SelectorOption<FilterStatus>[] = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'PENDING', label: 'Chưa xong' },
  { key: 'DONE', label: 'Đã xong' },
  { key: 'OVERDUE', label: 'Quá hạn' },
];

const PRIORITY_WEIGHT: Record<Priority, number> = {
  Cao: 3,
  'Trung bình': 2,
  Thấp: 1,
};

export const TaskListScreen: React.FC<Props> = ({ navigation }) => {
  const { tasks, toggleTaskDone, deleteTask, deleteCompletedTasks } =
    useTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');
  const [sortBy, setSortBy] = useState<SortBy>('DUE_DATE');

  const completedCount = useMemo(
    () => tasks.filter(t => t.done).length,
    [tasks],
  );

  const processedTasks = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    const filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(keyword);
      if (!matchesSearch) return false;

      const overdue = isTaskOverdue(task.dueDate, task.done);
      if (filterStatus === 'PENDING') return !task.done;
      if (filterStatus === 'DONE') return task.done;
      if (filterStatus === 'OVERDUE') return overdue;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'DUE_DATE') {
        const timeA =
          parseDateStrictly(a.dueDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
        const timeB =
          parseDateStrictly(b.dueDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
        return timeA - timeB;
      }
      return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
    });
  }, [tasks, searchQuery, filterStatus, sortBy]);

  const handleLongPressDelete = (task: Task) => {
    Alert.alert(
      'Xác nhận xoá',
      `Bạn có chắc chắn muốn xoá công việc "${task.title}" không?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: () => deleteTask(task.id),
        },
      ],
    );
  };

  const handleDeleteCompleted = () => {
    if (completedCount === 0) return;
    Alert.alert(
      'Xoá việc đã hoàn thành',
      `Bạn có chắc chắn muốn xoá tất cả ${completedCount} công việc đã hoàn thành không?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá tất cả',
          style: 'destructive',
          onPress: deleteCompletedTasks,
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <View style={styles.container}>
        <ProgressCard
          completedCount={completedCount}
          totalCount={tasks.length}
        />

        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        <View style={styles.filterWrapper}>
          <OptionSelector
            options={FILTER_OPTIONS}
            selectedKey={filterStatus}
            onSelect={setFilterStatus}
            size="sm"
          />
        </View>

        <View style={styles.toolbarRow}>
          <Button
            title={`Sắp xếp: ${
              sortBy === 'DUE_DATE' ? 'Hạn gần nhất' : 'Ưu tiên (Cao → Thấp)'
            }`}
            variant="secondary"
            size="sm"
            style={styles.flexOne}
            onPress={() =>
              setSortBy(prev => (prev === 'DUE_DATE' ? 'PRIORITY' : 'DUE_DATE'))
            }
          />

          <Button
            title={`Xoá việc đã hoàn thành (${completedCount})`}
            variant="dangerSoft"
            size="sm"
            disabled={completedCount === 0}
            onPress={handleDeleteCompleted}
          />
        </View>

        <FlatList
          data={processedTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onPress={() =>
                navigation.navigate('TaskDetail', { taskId: item.id })
              }
              onLongPress={() => handleLongPressDelete(item)}
              onToggleDone={() => toggleTaskDone(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              title="Không có công việc nào"
              subtitle='Hãy thử đổi bộ lọc, từ khoá tìm kiếm hoặc nhấn "+ Thêm việc" để tạo công việc mới.'
            />
          }
        />

        <View style={styles.bottomBar}>
          <Button
            title="+ Thêm việc"
            variant="primary"
            onPress={() => navigation.navigate('TaskForm')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  filterWrapper: {
    marginBottom: SPACING.sm,
  },
  toolbarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  flexOne: {
    flex: 1,
  },
  listContent: {
    paddingBottom: SPACING.lg,
  },
  bottomBar: {
    paddingVertical: SPACING.sm,
  },
});

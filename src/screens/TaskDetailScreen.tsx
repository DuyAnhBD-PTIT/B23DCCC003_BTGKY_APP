import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/tasks';
import { useTasks } from '../context/TaskContext';
import { COLORS, SPACING } from '../theme/color';
import { Button, EmptyState, TaskDetailCard } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

export const TaskDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { taskId } = route.params;
  const { tasks, toggleTaskDone } = useTasks();

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState title="Công việc không còn tồn tại." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <TaskDetailCard task={task} />

        <View style={styles.actionsContainer}>
          <Button
            title={
              task.done ? 'Đánh dấu Chưa hoàn thành' : 'Đánh dấu Hoàn thành'
            }
            variant={task.done ? 'muted' : 'success'}
            onPress={() => toggleTaskDone(task.id)}
          />

          <Button
            title="Sửa công việc"
            variant="primary"
            onPress={() => navigation.navigate('TaskForm', { taskId: task.id })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SPACING.lg,
  },
  actionsContainer: {
    gap: SPACING.md,
  },
});

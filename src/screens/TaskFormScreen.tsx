import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CATEGORIES,
  Category,
  PRIORITIES,
  Priority,
  RootStackParamList,
} from '../types/tasks';
import { useTasks } from '../context/TaskContext';
import {
  formatDateInputMask,
  getRelativeDateString,
  isBeforeToday,
  parseDateStrictly,
} from '../utils/date';
import { COLORS, FONT_SIZE, SPACING } from '../theme/color';
import {
  Button,
  FormField,
  OptionSelector,
  SelectorOption,
} from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskForm'>;

export const TaskFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const editTaskId = route.params?.taskId;
  const isEditing = Boolean(editTaskId);

  const { tasks, addTask, updateTask } = useTasks();
  const existingTask = tasks.find(t => t.id === editTaskId);

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState<Category>('Học tập');
  const [priority, setPriority] = useState<Priority>('Trung bình');
  const [dueDate, setDueDate] = useState(getRelativeDateString(0));

  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>(
    {},
  );

  const categoryOptions = useMemo<SelectorOption<Category>[]>(
    () => CATEGORIES.map(item => ({ key: item, label: item })),
    [],
  );

  const priorityOptions = useMemo<SelectorOption<Priority>[]>(
    () => PRIORITIES.map(item => ({ key: item, label: item })),
    [],
  );

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Sửa công việc' : 'Thêm công việc mới',
    });

    if (isEditing && existingTask) {
      setTitle(existingTask.title);
      setNote(existingTask.note);
      setCategory(existingTask.category);
      setPriority(existingTask.priority);
      setDueDate(existingTask.dueDate);
    }
  }, [isEditing, existingTask, navigation]);

  const validateForm = (): boolean => {
    const newErrors: { title?: string; dueDate?: string } = {};
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      newErrors.title = 'Tên công việc không được để trống.';
    } else if (trimmedTitle.length > 50) {
      newErrors.title = 'Tên công việc không được vượt quá 50 ký tự.';
    }

    const trimmedDate = dueDate.trim();
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(trimmedDate)) {
      newErrors.dueDate = 'Hạn hoàn thành phải đúng định dạng dd/mm/yyyy.';
    } else {
      const parsedDate = parseDateStrictly(trimmedDate);
      if (!parsedDate) {
        newErrors.dueDate =
          'Ngày không tồn tại trên thực tế (ví dụ 31/02/2026 là sai).';
      } else if (!isEditing && isBeforeToday(trimmedDate)) {
        newErrors.dueDate =
          'Khi thêm mới, hạn hoàn thành không được trước ngày hôm nay.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const payload = {
      title: title.trim(),
      note: note.trim(),
      category,
      priority,
      dueDate: dueDate.trim(),
    };

    if (isEditing && editTaskId) {
      updateTask(editTaskId, payload);
    } else {
      addTask(payload);
    }

    navigation.goBack();
  };

  const handleDateChange = (text: string) => {
    if (/^[\d/]*$/.test(text)) {
      const formatted =
        text.length < dueDate.length ? text : formatDateInputMask(text);
      setDueDate(formatted);
    } else {
      setDueDate(text);
    }
    if (errors.dueDate) {
      setErrors(prev => ({ ...prev, dueDate: undefined }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FormField
            label="Tên công việc *"
            rightLabel={`${title.length}/50`}
            value={title}
            onChangeText={val => {
              setTitle(val);
              if (errors.title) {
                setErrors(prev => ({ ...prev, title: undefined }));
              }
            }}
            placeholder="Nhập tên công việc (tối đa 50 ký tự)"
            error={errors.title}
          />

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Danh mục *</Text>
            <OptionSelector
              options={categoryOptions}
              selectedKey={category}
              onSelect={setCategory}
              layout="grid"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Mức độ ưu tiên *</Text>
            <OptionSelector
              options={priorityOptions}
              selectedKey={priority}
              onSelect={setPriority}
              layout="row"
            />
          </View>

          <FormField
            label="Hạn hoàn thành (dd/mm/yyyy) *"
            value={dueDate}
            onChangeText={handleDateChange}
            placeholder="Ví dụ: 28/10/2026"
            keyboardType="numeric"
            maxLength={10}
            error={errors.dueDate}
          />

          <FormField
            label="Ghi chú (không bắt buộc)"
            value={note}
            onChangeText={setNote}
            placeholder="Nhập chi tiết hoặc lưu ý cho công việc..."
            multiline
            numberOfLines={4}
            isTextArea
          />

          <View style={styles.actionsRow}>
            <Button
              title="Huỷ"
              variant="outline"
              style={styles.cancelFlex}
              onPress={() => navigation.goBack()}
            />
            <Button
              title={isEditing ? 'Lưu thay đổi' : 'Thêm công việc'}
              variant="primary"
              style={styles.saveFlex}
              onPress={handleSave}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  fieldGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  cancelFlex: {
    flex: 1,
  },
  saveFlex: {
    flex: 2,
  },
});

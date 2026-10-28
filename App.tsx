import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskProvider } from './src/context/TaskContext';
import { RootStackParamList } from './src/types/tasks';
import { TaskListScreen } from './src/screens/TaskListScreen';
import { TaskFormScreen } from './src/screens/TaskFormScreen';
import { TaskDetailScreen } from './src/screens/TaskDetailScreen';
import { COLORS, FONT_SIZE } from './src/theme/color';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="TaskList"
            screenOptions={{
              headerStyle: { backgroundColor: COLORS.primary },
              headerTintColor: COLORS.white,
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: FONT_SIZE.lg,
              },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{ title: 'Kế hoạch học tập & Công việc' }}
            />
            <Stack.Screen
              name="TaskForm"
              component={TaskFormScreen}
              options={{ title: 'Công việc' }}
            />
            <Stack.Screen
              name="TaskDetail"
              component={TaskDetailScreen}
              options={{ title: 'Chi tiết công việc' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </SafeAreaProvider>
  );
};

export default App;

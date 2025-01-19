import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5f4dff',
        tabBarInactiveTintColor: '#7F7F7F',
        tabBarStyle: {
          backgroundColor: '#0F0F0F',
          height: 55,
          borderTopWidth: 1,
          borderColor: '#5f4dff',
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Todo',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="list" color={color} />,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'semibold',
          },
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="sticky-note" color={color} />,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'semibold',
          },
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="calendar" color={color} />,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'semibold',
          },
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="bar-chart" color={color} />,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'semibold',
          },
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="book" color={color} />,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'semibold',
          },
        }}
      />
    </Tabs>
  );
}

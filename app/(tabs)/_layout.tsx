import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5f4dff',
        tabBarInactiveTintColor: '#9f9f9f',
        tabBarStyle: {
          backgroundColor: '#1e1e1e',
          height: 55,
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
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

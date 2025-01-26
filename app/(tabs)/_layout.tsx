import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Provider } from 'react-native-paper';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarActiveTintColor: '#5f4dff',
        tabBarInactiveTintColor: '#7F7F7F',
        tabBarStyle: {
          backgroundColor: '#0F0F0F',
          height: 55,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarActiveTintColor: '#5f4dff',
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
          tabBarActiveTintColor: '#FCDC00',
          title: 'Notes',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="sticky-note" color={color} />,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'semibold',
          },
        }}
      />
      {/* <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="calendar" color={color} />,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'semibold',
          },
        }}
      /> */}
      {/* <Tabs.Screen
        name="habits"
        options={{
          tabBarActiveTintColor: '#FF8C42',
          title: 'Habits',
          tabBarIcon: ({ color }) => <FontAwesome size={25} name="bar-chart" color={color} />,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'semibold',
          },
        }}
      /> */}
      <Tabs.Screen
        name="journal"
        options={{
          tabBarActiveTintColor: '#1ec40c',
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

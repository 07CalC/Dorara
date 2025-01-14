import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    
  <View className="flex h-screen w-full flex-col items-center justify-center bg-[#0F0F0F] p-2">
    <Text className="text-[#5f4dff] text-3xl">Page Not Found</Text>
  </View>
    
  );
}

const styles = {
  container: `items-center flex-1 justify-center p-5`,
  title: `text-xl font-bold`,
  link: `mt-4 pt-4`,
  linkText: `text-base text-[#2e78b7]`,
};

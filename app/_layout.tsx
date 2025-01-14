import '../global.css';

import { Stack } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';


export const unstable_settings = {

  initialRouteName: '(tabs)',
};

const loadDatabase = async () => {
  const dbName = 'dorara.db';
  const dbAsset = require('../assets/dorara.db');
  const dbURI = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
   
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath); 

  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
       { intermediates: true }
     
    );
    await FileSystem.downloadAsync(dbURI, dbFilePath);
  }
}




export default function RootLayout() {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);
   
  useEffect(() => {
    loadDatabase().then(() => {
      setDbLoaded(true);
    }).catch((error) => {
      console.error(error);
    })
  })

  if(!dbLoaded) {
    return <View className="flex h-screen w-full flex-col items-center justify-center bg-[#0F0F0F] p-2">
          <Text className="text-[#5f4dff] text-4xl">Loading...</Text>
        </View>;
  }
  return (
    <SQLiteProvider databaseName='dorara.db'>
    <Stack screenOptions={{ headerShown: false , contentStyle: { backgroundColor: '#0F0F0F' }}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false ,contentStyle: { backgroundColor: '#0F0F0F' }}} />
      
    </Stack>
    </SQLiteProvider>
  );
}

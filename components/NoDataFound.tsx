import { Image, View } from 'react-native';

export const NoDataFound = () => {
  return (
    <View className="flex w-full flex-col items-center justify-center">
      <Image
        source={require('../assets/notFound.png')}
        className="w-full"
        resizeMode='contain'
      />
      
    </View>
  );
};

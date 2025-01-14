import { Image, Text, View } from "react-native"



export const NoDataFound = () => {
    return(
        <View className="flex h-[36rem] flex-col items-center justify-center self-center">
                    <Image source={require('./notFound.png')} className="h-96 w-96" />
                    <Text className="text-3xl font-bold text-white">No data found</Text>
                  </View>
    )
}
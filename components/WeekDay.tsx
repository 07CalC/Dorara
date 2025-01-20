import { Text, TouchableOpacity, View } from 'react-native';
import { SharedValue, withTiming } from 'react-native-reanimated';

type props = {
  day: {
    day: string;
    date: number;
    milisecond: number;
  };
  index: number;
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
  selectedDate: number;
  translateX: SharedValue<number>;
  SCREEN_WIDTH: number;
};

export const WeekDay = ({ day, index, setSelectedDate, selectedDate, translateX, SCREEN_WIDTH }: props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        translateX.value = selectedDate < day.milisecond ? SCREEN_WIDTH: -SCREEN_WIDTH;
        translateX.value = withTiming(0, { duration: 300 });
        setSelectedDate(day.milisecond)}}
      className={`flex w-[4rem] flex-col items-center justify-center gap-y-2 rounded-[2rem] py-4 ${selectedDate === day.milisecond ? 'bg-[#5f4dff]' : ''}`}
      key={index}>
      <Text
        className={`text-xl font-semibold text-white ${selectedDate === day.milisecond ? 'text-[#0F0F0F]' : ''}`}>
        {day.day}
      </Text>
      <View
        className={`flex min-w-12 items-center justify-center rounded-full p-2 ${selectedDate === day.milisecond ? 'bg-[#0F0F0F]' : 'bg-[#5f4dff36]'}`}>
        <Text className={` } text-2xl text-white`}>{day.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

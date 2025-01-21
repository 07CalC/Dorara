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
  todayDate: number;
  color: string
};

export const WeekDay = ({ day, index, setSelectedDate, selectedDate, translateX, SCREEN_WIDTH, todayDate, color }: props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        translateX.value = selectedDate < day.milisecond ? SCREEN_WIDTH: -SCREEN_WIDTH;
        translateX.value = withTiming(0, { duration: 300 });
        setSelectedDate(day.milisecond)}}
      className={`flex w-[4rem] flex-col items-center justify-center gap-y-2 rounded-[2rem] py-4 ${selectedDate === day.milisecond ? 'bg-['+color+']': ''}`}
      key={index}
      style={{backgroundColor: selectedDate === day.milisecond ? color : '#0F0F0F'}}>
      <Text
        className={`text-xl font-semibold text-white ${selectedDate === day.milisecond ? 'text-[#0F0F0F]' : ''}`}>
        {day.day}
      </Text>
      <View
        className={`flex min-w-12 items-center justify-center rounded-full p-2 ${selectedDate === day.milisecond ? 'bg-[#0F0F0F]' : 'bg-['+color+'35'+']'}`} style={{backgroundColor: selectedDate === day.milisecond ? '#0F0F0F' : color+'35'}}>
        <Text style={{color: day.milisecond === todayDate ? color : '#ffffff'}} className={`text-2xl `}>{day.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

import { FontAwesome } from '@expo/vector-icons';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';

type props = {
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  currentMonth: string;
  currentYear: number;
  selectedDate: number;
  todayDate: any;
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
  setSelectedWeek: React.Dispatch<React.SetStateAction<number>>;
  todayWeekNumber: number;
};

export const RenderMonthYear = ({
  setShowCalendar,
  currentMonth,
  currentYear,
  selectedDate,
  todayDate,
  setSelectedDate,
  setSelectedWeek,
  todayWeekNumber,
}: props) => {
  return (
    <View className="top-0 flex h-[5%] w-full flex-row items-center px-5">
      <TouchableOpacity
        onPress={() => setShowCalendar(true)}
        className="flex w-1/6  items-start justify-start self-center justify-self-start">
        <FontAwesome size={30} name="calendar-o" color={'#5f4dff'} />
      </TouchableOpacity>
      <Text className="w-4/6 text-center text-2xl font-bold text-white">
        {currentMonth} {currentYear}
      </Text>
      <View className="flex w-1/6 justify-end ">
        {selectedDate !== parseInt(todayDate.startOf('day').format('x')) && (
          <TouchableOpacity
            className="flex justify-end"
            onPress={() => {
              setSelectedDate(parseInt(todayDate.startOf('day').format('x')));
              setSelectedWeek(todayWeekNumber);
            }}>
            <Text className="text-right text-xl font-semibold text-[#5f4dff]">Today</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

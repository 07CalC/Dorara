import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { SharedValue, withTiming } from 'react-native-reanimated';

type props = {
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  currentMonth: string;
  currentYear: number;
  selectedDate: number;
  todayDate: any;
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
  setSelectedWeek: React.Dispatch<React.SetStateAction<number>>;
  todayWeekNumber: number;
  translateX: SharedValue<number>;
  SCREEN_WIDTH: number;
  weekTranslateX: SharedValue<number>;
  selectedWeek: number;
  color: string;
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
  translateX,
  SCREEN_WIDTH,
  weekTranslateX,
  selectedWeek,
  color
}: props) => {
  return (
    <View className="top-0 flex h-[5%] w-full flex-row items-center px-5">
      <TouchableOpacity
        onPress={() => setShowCalendar(true)}
        className="flex w-1/6  items-start justify-start self-center justify-self-start">
        <FontAwesome size={30} name="calendar-o" color={color} />
      </TouchableOpacity>
      <Text className="w-4/6 text-center text-2xl font-bold text-white">
        {currentMonth} {currentYear}
      </Text>
      <View className="flex w-1/6 justify-end ">
        {selectedDate !== parseInt(todayDate.startOf('day').format('x')) && (
          <TouchableOpacity
            className="flex justify-end"
            onPress={() => {
              translateX.value = selectedDate < todayDate ? SCREEN_WIDTH: -SCREEN_WIDTH;
              translateX.value = withTiming(0, { duration: 300 });
              setSelectedDate(parseInt(todayDate.startOf('day').format('x')));
              if(selectedWeek > todayWeekNumber){
                weekTranslateX.value = -SCREEN_WIDTH;
                weekTranslateX.value = withTiming(0, { duration: 200 });
              }
              else if(selectedWeek < todayWeekNumber){
                weekTranslateX.value = SCREEN_WIDTH;
                weekTranslateX.value = withTiming(0, { duration: 200 });
              }

              setSelectedWeek(todayWeekNumber);
              
            }}>
            <Text style={{color: color}} className={`text-right text-xl font-semibold text-[${color}]`}>Today</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

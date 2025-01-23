import { Dimensions, Modal, ScrollView, ToastAndroid, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useCalendarStrip } from '~/Hooks/useCalendarStrip';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Todo } from '~/lib/types';
import { WeekDay } from '~/components/WeekDay';
import { RenderTodo } from '~/components/Todo';
import { AddTodoButton } from '~/components/AddTodoButton';
import { NoDataFound } from '~/components/NoDataFound';
import { AddTodoModal } from '~/components/AddTodoModal';
import { ColorModal } from '~/components/ColorModal';
import { EmojiModal } from '~/components/EmojiModal';
import { CalendarModal } from '~/components/CalendarModal';
import { RenderMonthYear } from '~/components/RenderMonthYear';
import { EditTodoModal } from '~/components/EditTodoModal';
import { Portal, Provider } from 'react-native-paper';


const color = '#FF8C42'

export default function habits() {
  /*--------------------const Declaration--------------------*/
  const db = useSQLiteContext();
  const {
    todayDate,
    todayWeekNumber,
    selectedDate,
    setSelectedDate,
    selectedWeek,
    setSelectedWeek,
    currentWeekDays,
    currentMonth,
    currentYear,
  }: useCalendarStrip = useCalendarStrip();
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<number>(selectedDate);
  
  const translateX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const weekTranslateX = useSharedValue(0);
  const weekAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: weekTranslateX.value }],
  }))

  

  /*--------------------db Functions--------------------*/
 

  



  const SCREEN_WIDTH = Dimensions.get('window').width;

  /*--------------------date Functions--------------------*/
  const handleDatePrev = () => {
    setSelectedDate(selectedDate - 86400000);
    setSelectedWeek(moment(selectedDate).isoWeek());
    if (new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(selectedDate) === 'Mon') {
      weekTranslateX.value = -SCREEN_WIDTH;
      weekTranslateX.value = withTiming(0, { duration: 200 });
      setSelectedWeek(selectedWeek - 1);
    }
    translateX.value = -SCREEN_WIDTH;
    translateX.value = withTiming(0, { duration: 400 });
    
  };
  const handleDateNext = () => {
    setSelectedDate(selectedDate + 86400000);
    moment(selectedDate).isoWeek();
    if (new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(selectedDate) === 'Sun') {
      weekTranslateX.value = SCREEN_WIDTH;
      weekTranslateX.value = withTiming(0, { duration: 200 });
      setSelectedWeek(selectedWeek + 1);
    }
    translateX.value = SCREEN_WIDTH;
    translateX.value = withTiming(0, { duration: 400 });
  };

  /*--------------------useEffect--------------------*/
  

  return (
    <Provider>
    <View className="flex h-screen w-screen flex-col items-center bg-[#0F0F0F] p-2">
      <RenderMonthYear
        setShowCalendar={setShowCalendar}
        currentMonth={currentMonth}
        currentYear={currentYear}
        selectedDate={selectedDate}
        todayDate={todayDate}
        setSelectedDate={setSelectedDate}
        setSelectedWeek={setSelectedWeek}
        todayWeekNumber={todayWeekNumber}
        translateX={translateX}
        SCREEN_WIDTH={SCREEN_WIDTH}
        weekTranslateX={weekTranslateX}
        selectedWeek={selectedWeek}
        color={color}
      />
      
      <Animated.View style={weekAnimatedStyle} className="flex h-[13%] items-center justify-center">
        <ScrollView
          stickyHeaderHiddenOnScroll
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            if (e.nativeEvent.contentOffset.x > 0) {
              weekTranslateX.value = SCREEN_WIDTH;
              weekTranslateX.value = withTiming(0, { duration: 300 });
              setSelectedWeek(selectedWeek + 1);
            } else if (e.nativeEvent.contentOffset.x < 0) {
              weekTranslateX.value = -SCREEN_WIDTH;
              weekTranslateX.value = withTiming(0, { duration: 300 });
              setSelectedWeek(selectedWeek - 1);
            }
          }}
          className=" flex h-[15%] flex-row"
          horizontal={true}>
          <View className="w-max-screen mt-2 flex flex-row items-center justify-center px-[0.05rem]">
            {currentWeekDays.map((day, index) => {
              return (
                <WeekDay
                  key={index}
                  day={day}
                  index={index}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  translateX={translateX}
                  SCREEN_WIDTH={SCREEN_WIDTH}
                  todayDate={parseInt(moment(todayDate).startOf('day').format('x'))}
                  color={color}
                />
              );
            })}
          </View>
        </ScrollView>
      </Animated.View>
      
      
      
    </View>
    </Provider>
    
  );
}

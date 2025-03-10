import moment from 'moment';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import { Calendar, CalendarProvider, DateData } from 'react-native-calendars';

type props = {
  selectedDate: number;
  setCalendarSelectedDate: React.Dispatch<React.SetStateAction<number>>;
  calendarSelectedDate: number;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
  setSelectedWeek: React.Dispatch<React.SetStateAction<number>>;
  color: string
};

export const CalendarModal = ({
  selectedDate,
  setCalendarSelectedDate,
  calendarSelectedDate,
  setShowCalendar,
  setSelectedDate,
  setSelectedWeek,
  color
}: props) => {
  return (
    <View className="flex h-full w-full items-center justify-center bg-[#0F0F0F50]">
      {/* <View className=' flex justify-center rounded-lg w-11/12 h-3/4'> */}
      <CalendarProvider
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        className="mt-20 flex w-full items-center justify-center"
        date={moment(selectedDate).toISOString()}>
        <View className="flex w-11/12 items-center justify-center rounded-2xl bg-[#1A222D]">
          <Calendar
            style={{ height: 350, width: 350 }}
            onDayPress={(date: DateData) => {
              setCalendarSelectedDate(selectedDate);
              setSelectedWeek(moment(parseInt(moment(date.dateString).format('x'))).isoWeek())
              setSelectedDate(parseInt(moment(date.dateString).format('x')));
              setShowCalendar(false)
            }}
            theme={{
              todayTextColor: color,
              dayTextColor: '#ffffff',
              backgroundColor: '#1A222D',
              calendarBackground: '#1A222D',
              arrowColor: color,
              selectedDayBackgroundColor: color,
              selectedDayTextColor: '#000000',
              monthTextColor: '#ffffff',
              todayButtonColor: color,
            }}
            hideExtraDays
            initialDate={moment(selectedDate).toISOString()}
          />
          <View className="mb-4 flex w-full flex-row items-center justify-end gap-x-6 px-8">
            <TouchableOpacity onPress={() => setShowCalendar(false)}>
              <Text className="text-xl font-semibold" style={{color: color}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedDate(calendarSelectedDate);
                setSelectedWeek(moment(calendarSelectedDate).isoWeek());
                setShowCalendar(false);
              }}>
              <Text className="text-xl font-semibold" style={{color: color}}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CalendarProvider>
      {/* </View> */}
    </View>
  );
};

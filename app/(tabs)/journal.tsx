
import { FontAwesome } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CalendarModal } from '~/components/CalendarModal';
import { Journal } from '~/lib/types';

export default function journal() {
  /*--------------------const declaration--------------------*/
  const db = useSQLiteContext();
  const [selectedDate, setSelectedDate] = useState<number>(
    parseInt(moment().startOf('day').format('x'))
  );
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<number>(selectedDate);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedWeek, setSelectedWeek] = useState<number>(moment().isoWeek());
  const [fetchedJournal, setFetchedJournal] = useState<Journal | null>(null);
  const [journal, setJournal] = useState<Journal>({
    id: 0,
    content: '',
    date: 0,
  });


  /*--------------------db functions--------------------*/
  const insertJournal = async () => {
    try {
      if (fetchedJournal === null)
        await db.runAsync(`INSERT INTO journal (content, date) VALUES (?, ?)`, [
          journal.content,
          selectedDate,
        ]);
      else
        await db.runAsync(`UPDATE journal SET content = ? WHERE date = ?`, [
          journal.content,
          selectedDate,
        ]);
    } catch (error) {
      console.log(error);
    }
    await fetchJournalByDate();
  };
  const fetchJournalByDate = async () => {
    try {
      const result: any = await db.getFirstAsync(`SELECT * FROM journal WHERE date = ?`, [
        selectedDate,
      ]);
      setJournal(result);
      setFetchedJournal(result);
    } catch (error) {
      console.log(error);
    }
  };


  /*--------------------useEffect--------------------*/
  useEffect(() => {
    fetchJournalByDate();
  }, [selectedDate]);
  return (
    <View className="flex h-screen w-full flex-col bg-[#0F0F0F] p-2">
      <Modal transparent={true} visible={showCalendar} animationType="slide">
        <CalendarModal
          selectedDate={selectedDate}
          setCalendarSelectedDate={setCalendarSelectedDate}
          calendarSelectedDate={calendarSelectedDate}
          setShowCalendar={setShowCalendar}
          setSelectedDate={setSelectedDate}
          setSelectedWeek={setSelectedWeek}
        />
      </Modal>
      <View className="flex h-[5%] w-full flex-row items-center justify-between px-2">
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Text className="text-2xl font-semibold text-[#5f4dff]">
            {moment(selectedDate).format('dddd, DD MMMM YYYY')}
          </Text>
        </TouchableOpacity>
        {selectedDate !== parseInt(moment().startOf('day').format('x')) && (
          <TouchableOpacity
            onPress={() => setSelectedDate(parseInt(moment().startOf('day').format('x')))}>
            <Text className="rounded-lg bg-[#5f4dff] px-4 py-2 text-sm font-semibold text-[#0F0F0F]">
              Today
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View className="flex h-[95%] w-full flex-row  px-2">
          <TextInput
            autoFocus={false}
            multiline={true}
            placeholder="whats on your mind"
            textAlignVertical="top"
            className="bg-[#0F0F0F h-full w-full bg-[#0F0F0F] text-lg text-white placeholder:text-gray-500"
            onChangeText={(text) => setJournal({ ...journal, content: text })}
            value={journal?.content}
          />
          {fetchedJournal?.content !== journal?.content && (
            <TouchableOpacity onPress={() => insertJournal()}>
              <FontAwesome
                name="save"
                size={30}
                color="black"
                className={`absolute bottom-5 right-2 z-10 rounded-full bg-[#5f4dff] p-3 px-4`}
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}



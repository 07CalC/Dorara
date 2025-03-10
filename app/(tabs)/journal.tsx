import { FontAwesome } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { KeyboardAvoidingView, Modal, Text, TouchableOpacity, View } from 'react-native';
import { CalendarModal } from '~/components/CalendarModal';
import { Journal } from '~/lib/types';

const color = '#1ec40c'

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
    <View className="flex h-screen w-screen gap-y-3 flex-col py-2" style={{backgroundColor: '#1A1A1A'}}>
      <Modal transparent={true} visible={showCalendar} animationType="slide">
        <CalendarModal
         color={color}
          selectedDate={selectedDate}
          setCalendarSelectedDate={setCalendarSelectedDate}
          calendarSelectedDate={calendarSelectedDate}
          setShowCalendar={setShowCalendar}
          setSelectedDate={setSelectedDate}
          setSelectedWeek={setSelectedWeek}
        />
      </Modal>
      <View className={`flex w-full ${selectedDate === parseInt(moment().startOf('day').format('x')) ? 'justify-center': 'justify-between'} flex-row items-center justify-center px-4 border-b py-2`} style={{borderColor: color}}>
        
        <TouchableOpacity onPress={() => setShowCalendar(true)} className='flex flex-row gap-x-2'>
          <FontAwesome name='calendar' size={25} color={color} />
          <Text className="text-2xl font-semibold" style={{color: selectedDate === parseInt(moment().startOf('day').format('x')) ? color : color + '90'}}>

            {moment(selectedDate).format('ddd, DD MMMM YYYY')}
          </Text>
        </TouchableOpacity>
        {selectedDate !== parseInt(moment().startOf('day').format('x')) && (
          <TouchableOpacity
            onPress={() => setSelectedDate(parseInt(moment().startOf('day').format('x')))}>
              
            <Text style={{backgroundColor: color}} className="rounded-lg px-4 py-2 flex flex-row justify-center items-center text-sm font-semibold text-[#0F0F0F]">
            <FontAwesome name='arrow-right' size={13} />
            {' '}Today
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1}}>
        <View className="flex mt-2 h-[95%] w-full flex-row px-2 bg-">
          <TextInput
            multiline={true}
            placeholder="whats on your mind"
            textAlignVertical="top"
            className="bg-[#0F0F0F bottom-3 h-full w-full text-lg text-white placeholder:text-gray-500"
            onChangeText={(text) => setJournal({ ...journal, content: text })}
            value={journal?.content}
          />
          {fetchedJournal?.content !== journal?.content && (
            <TouchableOpacity onPress={() => insertJournal()}>
              <FontAwesome
                name="save"
                size={30}
                color="black"
                style={{backgroundColor: color}}
                className={`absolute bottom-8 right-2 rounded-full p-3 px-4`}
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

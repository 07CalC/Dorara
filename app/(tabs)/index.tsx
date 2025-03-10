import { Dimensions, Image, Modal, ScrollView, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useCalendarStrip } from '~/Hooks/useCalendarStrip';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Todo } from '~/lib/types';
import { WeekDay } from '~/components/WeekDay';
import { RenderTodo } from '~/components/Todo';
import { AddTodoButton } from '~/components/AddTodoButton';
import { AddTodoModal } from '~/components/AddTodoModal';
import { ColorModal } from '~/components/ColorModal';
import { CalendarModal } from '~/components/CalendarModal';
import { RenderMonthYear } from '~/components/RenderMonthYear';
import { EditTodoModal } from '~/components/EditTodoModal';
import { Portal, Provider } from 'react-native-paper';
import EmojiModalLib from 'react-native-emoji-modal';

const color = '#5f4dff';

export default function index() {
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
  const [todoData, setTodoData] = useState<Todo[]>([]);
  const [showAddTodo, setShowAddTodo] = useState<boolean>(false);
  const [showEmojiModal, setShowEmojiModal] = useState<boolean>(false);
  const [todoTempEmoji, setTodoTempEmoji] = useState<string>('📌');
  const [showColorModal, setShowColorModal] = useState<boolean>(false);
  const [showEditTodo, setShowEditTodo] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo>({
    id: 0,
    title: '',
    complete: 0,
    type: 'tick',
    time: 3600000,
    timeCompleted: 0,
    maxIncreament: 1,
    increamentCompleted: 0,
    emoji: '📌',
    bgColor: color,
    date: selectedDate,
  });
  const translateX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const weekTranslateX = useSharedValue(0);
  const weekAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: weekTranslateX.value }],
  }));

  const setColor = (color: string) => {
    setTodo({ ...todo, bgColor: color });
  };

  /*--------------------db Functions--------------------*/
  const getTodoByDate = async (date: number) => {
    const todoFetched: Todo[] = await db.getAllAsync(
      'SELECT * FROM todo WHERE date = ? ORDER BY complete ASC, type DESC',
      [date]
    );
    setTodoData(todoFetched);
  };

  // console.log(moment(selectedDate).format('YYYY-MM-DD'));
  // console.log(todo)
  const updateChecked = async (item: Todo) => {
    if (!item.complete) {
      try {
        await db.runAsync(`UPDATE todo SET complete = 1 WHERE id = ?`, [item.id]);
      } catch (error) {
        console.log(error);
      }
    }
    if (item.complete) {
      try {
        await db.runAsync(`UPDATE todo SET complete = 0 WHERE id = ?`, [item.id]);
      } catch (error) {
        console.log(error);
      }
    }
    await getTodoByDate(selectedDate);
  };

  const updateIncreament = async (item: Todo) => {
    if (item.complete) {
      try {
        await db.runAsync(`UPDATE todo SET complete = 0, increamentCompleted = 0 WHERE id = ?`, [
          item.id,
        ]);
      } catch (error) {
        console.log(error);
      }
    } else {
      if (item.increamentCompleted >= item.maxIncreament - 1) {
        try {
          await db.runAsync(`UPDATE todo SET complete = 1, increamentCompleted = ? WHERE id = ?`, [
            item.increamentCompleted + 1,
            item.id,
          ]);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await db.runAsync(`UPDATE todo SET increamentCompleted = ? WHERE id = ?`, [
            item.increamentCompleted + 1,
            item.id,
          ]);
        } catch (error) {
          console.log(error);
        }
      }
    }
    await getTodoByDate(selectedDate);
  };

  const deleteTodo = async (id: number) => {
    try {
      await db.runAsync(`DELETE FROM todo WHERE id = ?`, [id]);
    } catch (error) {
      console.log(error);
    }
    getTodoByDate(selectedDate);
  };

  const updateTodo = async (id: number) => {
    try {
      await db.runAsync(
        `UPDATE todo SET 
      title = ?,
      complete = ?,
      type = ?,
      time = ?,
      timeCompleted = ?,
      maxIncreament = ?,
      increamentCompleted = ?,
      emoji = ?,
      bgColor = ?,
      date = ?
      WHERE id = ?`,
        [
          todo.title,
          todo.complete,
          todo.type,
          todo.time,
          todo.timeCompleted,
          todo.maxIncreament,
          todo.increamentCompleted,
          todo.emoji,
          todo.bgColor,
          todo.date,
          id,
        ]
      );
    } catch (error) {
      console.log(error);
    }
    getTodoByDate(selectedDate);
  };

  const insertTodo = async () => {
    try {
      await db.runAsync(`INSERT INTO todo (
      title,
      complete,
      type,
      time,
      timeCompleted,
      maxIncreament,
      increamentCompleted,
      emoji,
      bgColor,
      date
    ) VALUES (
      "${todo.title}",
      ${todo.complete},
      "${todo.type}",
      ${todo.time},
      ${todo.timeCompleted},
      ${todo.maxIncreament},
      ${todo.increamentCompleted},
      "${todo.emoji}",
      "${todo.bgColor}",
      ${todo.date}
    )`);
    } catch (error) {
      console.log(error);
    }

    await getTodoByDate(selectedDate);
    setShowAddTodo(false);
  };

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
    translateX.value = withTiming(0, { duration: 300 });
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
    translateX.value = withTiming(0, { duration: 300 });
  };

  /*--------------------useEffect--------------------*/
  useEffect(() => {
    getTodoByDate(selectedDate);
  }, [selectedDate]);

  // bug fixed selected todo.date was not changing automatically blah
  useEffect(() => {
    setTodo({ ...todo, date: selectedDate });
  }, [selectedDate]);

  return (
    <Provider>
      <View className="flex h-screen w-screen flex-col items-center justify-center bg-[#0F0F0F] p-2">
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

        <Animated.View
          style={weekAnimatedStyle}
          className="flex h-[13%] items-center justify-center">
          <ScrollView
            stickyHeaderHiddenOnScroll
            showsHorizontalScrollIndicator={false}
            onScrollEndDrag={(e) => {
              if (e.nativeEvent.contentOffset.x > 0) {
                weekTranslateX.value = SCREEN_WIDTH;
                weekTranslateX.value = withTiming(0, { duration: 300 });
                setSelectedWeek(selectedWeek + 1);
              } else if (e.nativeEvent.contentOffset.x == 0) {
                weekTranslateX.value = -SCREEN_WIDTH;
                weekTranslateX.value = withTiming(0, { duration: 300 });
                setSelectedWeek(selectedWeek - 1);
              }
            }}
            className="flex h-[15%] "
            horizontal={true}
            centerContent={true}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            pagingEnabled={true}>
            <View className="mt-2 flex w-[98vw] flex-row items-center justify-center">
              {currentWeekDays.map((day, index) => {
                return (
                  <View key={index} style={{ width: SCREEN_WIDTH / 7.5 }}>
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
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </Animated.View>
        <Animated.View style={animatedStyle} className="h-[77%] pb-2">
          <ScrollView
            horizontal={true}
            className="h-full w-screen"
            onMomentumScrollEnd={(e) => {
              if (e.nativeEvent.contentOffset.x > 0) {
                handleDateNext();
              } else if (e.nativeEvent.contentOffset.x < 0) {
                handleDatePrev();
              }
            }}>
            <View className="mt-2 flex w-full flex-row px-[0.01rem] pb-2">
              <ScrollView
                bounces={true}
                showsVerticalScrollIndicator
                className="h-full w-screen px-2">
                {todoData.length > 0 &&
                  todoData.map((item: Todo, index) => (
                    <RenderTodo
                      key={index}
                      item={item}
                      index={index}
                      setShowEditTodo={setShowEditTodo}
                      updateChecked={updateChecked}
                      updateIncreament={updateIncreament}
                      setTodo={setTodo}
                    />
                  ))}
                {todoData.length === 0 && (
                  <View className="flex w-full flex-col items-center justify-center">
                        <Image
                          source={require('../../assets/notFound.png')}
                          className="w-full"
                          resizeMode='contain'
                        />
                        {/* <Text className="text-3xl font-bold text-white">Nothing Here</Text> */}
                      </View>
                )}
              </ScrollView>
            </View>
          </ScrollView>
        </Animated.View>
        <AddTodoButton
          setTodo={setTodo}
          setShowAddTodo={setShowAddTodo}
          selectedDate={selectedDate}
        />
        <Portal>
          <Modal
            animationType="slide"
            visible={showAddTodo}
            onDismiss={() => {
              setTodo({
                id: 0,
                title: '',
                complete: 0,
                type: 'tick',
                time: 3600000,
                timeCompleted: 0,
                maxIncreament: 1,
                increamentCompleted: 0,
                emoji: '📌',
                bgColor: color,
                date: selectedDate,
              });
            }}
            onRequestClose={() => setShowAddTodo(false)}
            style={{ backgroundColor: '#0f0f0f' }}
            className="absolute flex h-full w-full flex-1 flex-col items-center justify-center self-center bg-[#0F0F0F50]">
            <AddTodoModal
              setTodoTempEmoji={setTodoTempEmoji}
              setShowAddTodo={setShowAddTodo}
              setShowColorModal={setShowColorModal}
              setShowEmojiModal={setShowEmojiModal}
              insertTodo={insertTodo}
              todo={todo}
              setTodo={setTodo}
              selectedDate={selectedDate}
            />
          </Modal>
          <Modal
            animationType="fade"
            visible={showCalendar}
            transparent={true}
            onRequestClose={() => setShowCalendar(false)}>
            <CalendarModal
              color={color}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setSelectedWeek={setSelectedWeek}
              calendarSelectedDate={calendarSelectedDate}
              setCalendarSelectedDate={setCalendarSelectedDate}
              setShowCalendar={setShowCalendar}
            />
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showEmojiModal}
            onRequestClose={() => setShowEmojiModal(false)}
            className="flex h-full w-full flex-col items-center justify-center bg-[#0F0F0F50]">
            <EmojiModalLib
              emojiSize={40}
              containerStyle={{
                backgroundColor: '#1A222D',
              }}
              searchStyle={{
                backgroundColor: '#1A222D',
                borderColor: '#FFFFF',
              }}
              activeShortcutColor={'#5f4dff'}
              onPressOutside={() => setShowEmojiModal(false)}
              onEmojiSelected={(emoji: any) => {
                setTodo({ ...todo, emoji: emoji });
                setShowEmojiModal(false);
              }}
            />
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showColorModal}
            onRequestClose={() => setShowColorModal(false)}
            className="flex h-full w-full flex-col items-center justify-center bg-[#0F0F0F50]">
            <ColorModal setColor={setColor} setShowColorModal={setShowColorModal} />
          </Modal>
          <Modal
            animationType="slide"
            visible={showEditTodo}
            onRequestClose={() => setShowEditTodo(false)}
            onDismiss={() =>
              setTodo({
                id: 0,
                title: '',
                complete: 0,
                type: 'tick',
                time: 3600000,
                timeCompleted: 0,
                maxIncreament: 1,
                increamentCompleted: 0,
                emoji: '📌',
                bgColor: color,
                date: selectedDate,
              })
            }
            style={{ backgroundColor: '#0f0f0f' }}
            className="flex h-full w-full flex-col items-center justify-center bg-[#0F0F0F50]">
            <EditTodoModal
              setTodoTempEmoji={setTodoTempEmoji}
              setShowColorModal={setShowColorModal}
              setShowEmojiModal={setShowEmojiModal}
              setShowEditTodo={setShowEditTodo}
              todo={todo}
              setTodo={setTodo}
              deleteTodo={deleteTodo}
              selectedDate={selectedDate}
              updateTodo={updateTodo}
            />
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
}

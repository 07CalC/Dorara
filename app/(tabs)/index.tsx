import { Dimensions, Modal, ScrollView, View } from 'react-native';
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
import { Portal } from 'react-native-paper';

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
    bgColor: '#5f4dff',
    date: selectedDate,
  });
  const translateX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
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
      setSelectedWeek(selectedWeek - 1);
    }
    translateX.value = -SCREEN_WIDTH;
    translateX.value = withTiming(0, { duration: 400 });
    
  };
  const handleDateNext = () => {
    setSelectedDate(selectedDate + 86400000);
    moment(selectedDate).isoWeek();
    if (new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(selectedDate) === 'Sun') {
      setSelectedWeek(selectedWeek + 1);
    }
    translateX.value = SCREEN_WIDTH;
    translateX.value = withTiming(0, { duration: 400 });
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
      />
      
      <View className="flex h-[13%] items-center justify-center">
        <ScrollView
          stickyHeaderHiddenOnScroll
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            if (e.nativeEvent.contentOffset.x > 0) {
              setSelectedWeek(selectedWeek + 1);
            } else if (e.nativeEvent.contentOffset.x < 0) {
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
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
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
          <View className="mt-2 flex h-full flex-row px-[0.01rem] pb-2">
            <ScrollView
              bounces={true}
              showsVerticalScrollIndicator
              className="h-full w-screen px-2">
            
              {todoData.map((item: Todo, index) => (
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
              {todoData.length === 0 && <NoDataFound />}
            </ScrollView>
          </View>
        </ScrollView>
      </Animated.View>

      <AddTodoButton setTodo={setTodo} setShowAddTodo={setShowAddTodo} selectedDate={selectedDate} />
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
            bgColor: '#5f4dff',
            date: selectedDate,
          });
        }}
        onRequestClose={() => setShowAddTodo(false)}
        style={{ backgroundColor: '#0f0f0f' }}
        className="flex h-full self-cen flex-1 absolute w-full flex-col items-center justify-center bg-[#0F0F0F50]">
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
        <EmojiModal
          todoTempEmoji={todoTempEmoji}
          setTodoTempEmoji={setTodoTempEmoji}
          setShowEmojiModal={setShowEmojiModal}
          todo={todo}
          setTodo={setTodo}
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
            bgColor: '#5f4dff',
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
    
  );
}

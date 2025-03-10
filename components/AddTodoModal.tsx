import { FontAwesome } from '@expo/vector-icons';
import { Text, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

type props = {
  setTodoTempEmoji: React.Dispatch<React.SetStateAction<string>>;
  setShowAddTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setShowColorModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEmojiModal: React.Dispatch<React.SetStateAction<boolean>>;
  insertTodo: () => void;
  todo: any;
  setTodo: React.Dispatch<React.SetStateAction<any>>;
  selectedDate: number;
};

export const AddTodoModal = ({
  setTodoTempEmoji,
  setShowAddTodo,
  setShowColorModal,
  setShowEmojiModal,
  insertTodo,
  todo,
  setTodo,
  selectedDate,
}: props) => {
  return (
    <View className="flex w-screen h-screen flex-col gap-y-5 bg-[#0f0f0f] py-5">
      <View className="flex flex-row justify-between px-5">
        <Text className="self-center text-3xl font-bold text-white">Add Todo</Text>
        <TouchableOpacity
          onPress={() => {
            setTodoTempEmoji('📌');
            setShowAddTodo(false);
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
          className="flex items-center justify-center">
          <FontAwesome
            className={`rounded-2xl p-2`}
            style={{ backgroundColor: todo.bgColor }}
            name="close"
            size={20}
            color="#0f0f0f"
          />
        </TouchableOpacity>
      </View>
      <TextInput
        className={`my-2 rounded-md border-b-2 px-5 py-5 text-3xl font-semibold text-white placeholder:font-semibold placeholder:text-gray-500`}
        placeholder="Title"
        onChangeText={(text: string) => setTodo({ ...todo, title: text })}
        value={todo.title}
        style={{ borderColor: todo.bgColor }}
      />
      <View className="mt-3 flex flex-col gap-y-3">
        <Text className="px-5 text-2xl font-semibold text-gray-200">Type</Text>
        <View className="flex flex-row justify-center gap-x-10 px-2">
          <TouchableOpacity
            onPress={() => setTodo({ ...todo, type: 'tick' })}
            className={`flex flex-col items-center justify-center rounded-2xl px-10 py-5 ${todo.type === 'tick' ? 'bg-[#1a222d]' : 'bg-[#0f0f0f]'} gap-y-3`}>
            <FontAwesome
              name="check-circle"
              size={40}
              style={{ color: todo.type === 'tick' ? todo.bgColor : '#9f9f9f' }}
            />
            <Text className="text-center text-xl font-semibold text-gray-400">Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTodo({ ...todo, type: 'increament' })}
            className={`flex flex-col items-center justify-center rounded-2xl px-8 py-5 ${todo.type === 'increament' ? 'bg-[#1a222d]' : 'bg-[#0f0f0f]'} gap-y-3`}>
            <FontAwesome
              name="arrow-up"
              size={40}
              style={{ color: todo.type === 'increament' ? todo.bgColor : '#9f9f9f' }}
            />
            <Text className="text-center text-xl font-semibold text-gray-400">Amount</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => setTodoType('timer')}
            className={`flex flex-col items-center justify-center rounded-2xl px-10 py-5 ${todoType === 'timer' ? 'bg-[#1a222d]' : 'bg-[#0f0f0f]'} gap-y-3`}>
            <FontAwesome
              name="clock-o"
              size={40}
              style={{ color: todoType === 'timer' ? todoSelectedColor : '#9f9f9f' }}
            />
            <Text className="text-center text-xl font-semibold text-gray-400">Time</Text>
          </TouchableOpacity> */}
        </View>
        {todo.type === 'increament' && (
          <View className="my-3 flex flex-col gap-y-5 px-5">
            <Text className="text-2xl font-semibold text-gray-200">Amount</Text>
            <View className="flex flex-row items-center justify-center gap-x-8">
              <TouchableOpacity
                onPress={() => setTodo({ ...todo, maxIncreament: todo.maxIncreament - 1 })}
                style={{ backgroundColor: todo.bgColor }}
                className={`flex items-center justify-center rounded-2xl p-2 px-4`}>
                <FontAwesome name="minus" size={30} style={{ color: '#0f0f0f' }} />
              </TouchableOpacity>
              <Text className="self-center text-5xl font-semibold text-gray-200">
                {todo.maxIncreament}
              </Text>
              <TouchableOpacity
                onPress={() => setTodo({ ...todo, maxIncreament: todo.maxIncreament + 1 })}
                style={{ backgroundColor: todo.bgColor }}
                className={`flex items-center justify-center rounded-2xl p-2 px-4 bg-[${todo.bgColor}]`}>
                <FontAwesome name="plus" size={30} style={{ color: '#0f0f0f' }} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View className="my-3 flex flex-col gap-y-5 px-5">
          <Text className="text-2xl font-semibold text-gray-200">Color & Emoji</Text>
          <View className="flex flex-row items-center justify-center gap-x-3 px-3">
            <TouchableOpacity
              onPress={() => setShowColorModal(true)}
              style={{ backgroundColor: todo.bgColor }}
              className={`bg-[${todo.bgColor}] flex w-1/2 flex-row items-center justify-center rounded-2xl p-6 px-8`}>
              <FontAwesome
                name="paint-brush"
                size={30}
                color="#0f0f0f"
                className="flex flex-row items-center justify-center self-center"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowEmojiModal(true)}
              className={` flex w-1/2 flex-row items-center justify-center rounded-2xl bg-[#1a222d] p-6 px-8`}>
              <Text className="text-3xl text-white">{todo.emoji}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          if(todo.title === ''){
            ToastAndroid.show('Please add a title', ToastAndroid.TOP);
            return
          }
          insertTodo();
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
          setShowAddTodo(false);
          setTodoTempEmoji('📌');
        }}
        className={`bottom-0  flex w-11/12 items-center justify-center self-center rounded-2xl bg-[${todo.bgColor}] p-4 px-8`}
        style={{ backgroundColor: todo.bgColor }}>
        <Text className="text-2xl  font-semibold text-[#0f0f0f]">Add</Text>
      </TouchableOpacity>
    </View>
  );
};

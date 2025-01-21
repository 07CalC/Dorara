import { FontAwesome } from '@expo/vector-icons';
import { Text, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Todo } from '~/lib/types';

type props = {
  setTodoTempEmoji: React.Dispatch<React.SetStateAction<string>>;
  setShowColorModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEmojiModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditTodo: React.Dispatch<React.SetStateAction<boolean>>;
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<any>>;
  deleteTodo: (id: number) => void;
  selectedDate: number;
  updateTodo: (id: number) => void;
};

export const EditTodoModal = ({
  setTodoTempEmoji,
  setShowColorModal,
  setShowEmojiModal,
  setShowEditTodo,
  todo,
  setTodo,
  deleteTodo,
  selectedDate,
  updateTodo,
}: props) => {
  return (
    <View className="flex h-full flex-col gap-y-5 bg-[#0f0f0f] py-5">
      <View className="flex flex-row justify-between px-5">
        <Text className="self-center text-3xl font-bold text-white">Edit Todo</Text>
        <TouchableOpacity
          onPress={() => {
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
            setShowEditTodo(false);
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
          {/* might add later  */}
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
                className={`flex items-center justify-center rounded-2xl p-4 px-8`}>
                <FontAwesome name="minus" size={30} style={{ color: '#0f0f0f' }} />
              </TouchableOpacity>
              <Text className="self-center text-5xl font-semibold text-gray-200">
                {todo.maxIncreament}
              </Text>
              <TouchableOpacity
                onPress={() => setTodo({ ...todo, maxIncreament: todo.maxIncreament + 1 })}
                style={{ backgroundColor: todo.bgColor }}
                className={`flex items-center justify-center rounded-2xl p-4 px-8`}>
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
              className={` flex w-1/2 flex-row items-center justify-center rounded-2xl p-6 px-8`}>
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
      <View className="flex flex-row items-center justify-between gap-x-5 px-4">
        <TouchableOpacity
          onPress={() => {
            ToastAndroid.show("Deleted Todo", ToastAndroid.SHORT);
            deleteTodo(todo.id);
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
            setTodoTempEmoji('📌');
            setShowEditTodo(false);
          }}
          className={`bottom-0 flex w-[43%] items-center justify-center self-center rounded-2xl bg-[${todo.bgColor}] p-4 px-8`}
          style={{ backgroundColor: '#0f0f0f', borderColor: '#D33115', borderWidth: 2 }}>
          <Text className="text-2xl  font-semibold text-[#f55442]">Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            updateTodo(todo.id);
            setShowEditTodo(false);
          }}
          className={`bottom-0 flex w-[43%] items-center justify-center self-center rounded-2xl bg-[${todo.bgColor}] p-4 px-8`}
          style={{ backgroundColor: todo?.bgColor || '#5f4dff' }}>
          <Text className="text-2xl  font-semibold text-[#0f0f0f]">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

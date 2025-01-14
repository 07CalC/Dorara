import { Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Todo } from '~/lib/types';



type props = {
  todoTempEmoji: string;
  setTodoTempEmoji: React.Dispatch<React.SetStateAction<string>>;
  setShowEmojiModal: React.Dispatch<React.SetStateAction<boolean>>;
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>;
}



export const EmojiModal = ({
  todoTempEmoji,
  setTodoTempEmoji,
  setShowEmojiModal,
  todo,
  setTodo,
}: props) => {
  return (
    <View className="flex h-full w-full flex-col items-center justify-center self-center bg-transparent">
      <View className="flex h-40 w-80 flex-col items-center justify-center gap-y-3 rounded-2xl bg-[#1A222D] p-4">
        <Text className="text-center text-xl font-semibold text-gray-200">Select Emoji</Text>
        <TextInput
          className="w-full self-center rounded-lg border border-[#5f4dff] bg-[#1A222D] p-2 text-center text-3xl text-gray-200"
          value={todoTempEmoji}
          onChangeText={setTodoTempEmoji}
        />
        <View className="flex w-full flex-row items-center justify-end gap-x-4">
          <TouchableOpacity
            onPress={() => {
              setShowEmojiModal(false);
            }}>
            <Text className="text-xl font-semibold text-[#5f4dff]">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowEmojiModal(false);
              setTodo({ ...todo, emoji: todoTempEmoji });
            }}>
            <Text className="text-xl font-semibold text-[#5f4dff]">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

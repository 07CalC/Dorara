import { FontAwesome } from '@expo/vector-icons';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { parseMillisecondsIntoReadableTime } from '~/lib/helper';
import { Todo } from '~/lib/types';


type props = {
  item: Todo;
  index: number;
  updateChecked: (item: Todo) => void;
  updateIncreament: (item: Todo) => void;
  setShowEditTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>;
}



export const RenderTodo = ({
  item,
  index,
  updateChecked,
  updateIncreament,
  setShowEditTodo,
  setTodo,
}: props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setTodo(item);
        setShowEditTodo(true);
      }}
      key={index}
      className={`mb-2 flex h-20 w-full flex-row items-center justify-between rounded-[4rem] p-3`}
      style={{
        backgroundColor: item.complete
          ? item.bgColor
            ? item.bgColor + '15'
            : '#5f4dff15'
          : item.bgColor
            ? item.bgColor + '36'
            : '#5f4dff36',
      }}>
      <View
        className={`flex h-16 w-16 items-center justify-center rounded-full p-2 text-center`}
        style={{ backgroundColor: item.bgColor ? item.bgColor : '#5f4dff' }}>
        <Text className="self-center text-center text-[2.2rem] ">
          {item.complete ? '✓' : item.emoji}
        </Text>
      </View>
      <View className="ml-2 flex w-4/6 flex-col gap-y-1 px-2">
        <Text className={`text-xl font-bold text-white ${item.complete ? 'line-through' : ''}`}>
          {item.title}
        </Text>
        <Text className="text-lg text-[#bebebecb]">
          {item.complete
            ? 'Completed'
            : item.type === 'timer'
              ? parseMillisecondsIntoReadableTime(item.timeCompleted) +
                '/' +
                parseMillisecondsIntoReadableTime(item.time)
              : item.type === 'increament'
                ? `${item.increamentCompleted}/${item.maxIncreament}`
                : item.type === 'tick'
                  ? 'Incomplete'
                  : ''}
        </Text>
      </View>
      <View className="flex w-1/6 flex-col items-center justify-center gap-y-1">
        <TouchableOpacity
          onPress={() => {
            if (item.type === 'tick') {
              updateChecked(item);
            }
            if (item.type === 'increament') {
              updateIncreament(item);
            }
          }}
          className={`flex h-10 w-10 flex-col items-center justify-center rounded-full border p-2`}
          style={{
            backgroundColor: item.complete ? (item.bgColor ? item.bgColor : '#5f4dff') : '#0f0f0f',
            borderColor: item.bgColor ? item.bgColor : '#5f4dff',
          }}>
          {item.complete === 1 && <FontAwesome name="check" size={20} color={'0f0f0f'} />}
          {item.type === 'timer' && !item.complete && (
            <FontAwesome
              className="ml-1"
              name="play"
              size={20}
              color={item.bgColor ? item.bgColor : '#5f4dff'}
            />
          )}
          {item.type === 'increament' && !item.complete && (
            <FontAwesome name="plus" size={20} color={item.bgColor ? item.bgColor : '#5f4dff'} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

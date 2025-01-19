import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { TouchableOpacity, View } from 'react-native';

type props = {
  setShowAddTodo: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: number;
};

export const AddTodoButton = ({ setShowAddTodo, selectedDate }: props) => {
  return (
    <View className={`flex-1`}>
      <TouchableOpacity
        onPress={() => {
          setShowAddTodo(true);
        }}
        className={`bottom-[6.5rem] flex h-20 w-20 items-center justify-center rounded-full bg-[#5f4dff] p-5 ${selectedDate >= parseInt(moment().startOf('day').format('x')) ? '' : 'hidden'}`}>
        <FontAwesome
          className="flex items-center justify-center text-center"
          name="plus"
          size={35}
          color="#0f0f0f"
        />
      </TouchableOpacity>
    </View>
  );
};

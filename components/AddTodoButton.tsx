import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Todo } from '~/lib/types';

type props = {
  setShowAddTodo: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: number;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>;
};

export const AddTodoButton = ({ setShowAddTodo, selectedDate, setTodo }: props) => {
  return (
    <View className={`flex-1`}>
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

import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Note } from '~/lib/types';

type props = {
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  setShowNote: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
  setTempTag: React.Dispatch<React.SetStateAction<string>>
};

export const AddNotesButton = ({ setShowNote, setNote, color, setTempTag }: props) => {
  return (
    <View className={`flex-1`}>
      <TouchableOpacity
        onPress={() => {
          setNote({
            id: 0,
            title: '',
            content: '',
            date: 0,
            tag: 'tag',
            color: color,
            
          });
          setTempTag('')
          setShowNote(true);
        }}
        className={`bottom-[100%] left-[30%] absolute flex h-20 w-20 items-center justify-center rounded-full p-5`} style={{backgroundColor: color}}>
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

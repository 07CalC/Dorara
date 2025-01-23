import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Note } from '~/lib/types';

type props = {
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  setShowNote: React.Dispatch<React.SetStateAction<boolean>>;
  color: string
};

export const AddNotesButton = ({ setShowNote, setNote, color }: props) => {
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
          setShowNote(true);
        }}
        className={`bottom-[6.5rem] left-44 flex h-20 w-20 items-center justify-center rounded-full p-5`} style={{backgroundColor: color}}>
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

import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Note } from '~/lib/types';

type props = {
  notesList: Note[];
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  setShowNote: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RenderNotes = ({ notesList, setNote, setShowNote }: props) => {
  return (
    <FlatList
      className="w-full"
      centerContent={true}
      data={notesList}
      renderItem={({ item }: { item: Note }) => (
        <TouchableOpacity
          onPress={() => {
            setNote(item);
            setShowNote(true);
          }}
          className="m-[0.5%] h-60 w-[98%] gap-y-2 rounded-2xl border bg-[#1e1e1e] p-3"
          style={{ backgroundColor: item.color + '40' }}>
            {item.title && <Text className=" w-full text-2xl font-bold text-white">{item.title}</Text>}
          
            <Text numberOfLines={5} className="text-lg text-gray-300">{item.content}</Text>
        
          <View className="absolute bottom-2 left-2 flex w-full items-start">
            <Text
              className="rounded-full border px-2 text-lg font-bold text-[#0F0F0F]"
              style={{ backgroundColor: item.color }}>
              {item.tag}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { colorPallete } from '~/lib/colorPallete';

type props = {
  setShowColorModal: React.Dispatch<React.SetStateAction<boolean>>;
  setColor: (color: string) => void;
};

export const ColorModal = ({ setShowColorModal, setColor }: props) => {
  return (
    <View className="flex h-10/12 w-full flex-col items-center justify-center self-center bg-white">
      <View className="h-full p-2 flex w-full flex-col items-center justify-center gap-y-2 bg-[#1A222D]">
        <TouchableOpacity onPress={() => setShowColorModal(false)} className='self-end mr-6'>
          <FontAwesome name='close' size={25} color={'black'} className='p-2 px-3 bg-white rounded-full'/>
        </TouchableOpacity>
        <FlatList
          scrollEnabled
          showsVerticalScrollIndicator={false}
          data={colorPallete}
          numColumns={5}
          className=""
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setColor(item.color);
                setShowColorModal(false);
              }}
              className="flex flex-row items-center justify-center gap-x-1">
              <View
                style={{ backgroundColor: item.color }}
                className="m-2 h-16 w-16 rounded-full"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

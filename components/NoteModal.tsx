import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Note } from '~/lib/types';

type props = {
  setShowNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  Note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  setShowColorModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTagEditorModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateNote: (id: number) => void;
  deleteNote: (id: number) => void;
};

export const NoteModal = ({
  setShowNoteModal,
  Note,
  setNote,
  setShowTagEditorModal,
  updateNote,
  setShowColorModal,
  deleteNote,
}: props) => {
  return (
    <View className="flex h-full w-full flex-col bg-[#1A222D] ">
      {/* <View className="flex w-full h-[15%] flex-col py-5 justify-center gap-y-2 bg" style={{backgroundColor: Note.color + '20'}}> */}
      <TextInput
        className={`rounded-md border-b-2 px-5 py-2 text-3xl font-semibold text-white placeholder:font-semibold placeholder:text-gray-500`}
        placeholder="Title"
        onChangeText={(text: string) => setNote({ ...Note, title: text })}
        value={Note.title}
        style={{ borderColor: Note.color, backgroundColor: Note.color + '20' }}
      />
        <View className="flex py-2 flex-row w-full items-center justify-between px-5" style={{backgroundColor: Note.color + '20'}}>
          <View className='flex flex-row items-center gap-x-2'>
          <TouchableOpacity onPress={() => setShowColorModal(true)}>
            <FontAwesome
              name="paint-brush"
              size={20}
              color="black"
              className={`bg-[${Note.color}] rounded-full p-2`}
              style={{ backgroundColor: Note.color }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowTagEditorModal(true)}
            className="flex items-center justify-center px-2">
            <Text
              style={{ backgroundColor: Note.color }}
              className={`rounded-full p-2 px-4 text-center text-[1rem] font-bold text-black bg-[${Note.color}]`}>
              {Note.tag}
            </Text>
          </TouchableOpacity>
          </View>
          <View className='flex flex-row items-center gap-x-2'>
          <TouchableOpacity
            onPress={() => {
              ToastAndroid.show('Note deleted', ToastAndroid.SHORT);
              deleteNote(Note.id);
              setShowNoteModal(false);
            }}>
            <FontAwesome
              name="trash"
              size={20}
              color="black"
              className={`bg-[${Note.color}] rounded-full p-2 px-3`}
              style={{ backgroundColor: Note.color }}
            />
          </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if(Note.title === '' && Note.content === ''){
                  ToastAndroid.show('cant save empty note', ToastAndroid.SHORT)
                  return
                }
                ToastAndroid.show('Note saved', ToastAndroid.SHORT);
                updateNote(Note.id);
              }}>
              <FontAwesome
                name='save'
                size={20}
                color="black"
                style={{ backgroundColor: Note.color }}
                className={`bg-[${Note.color}] rounded-full mx-2 p-2 px-3`}
              />
            </TouchableOpacity>
            </View>
        </View>
      {/* </View> */}
      <View className="flex h-[85%] w-full px-2">
        
        <TextInput
            autoFocus={false}
            multiline={true}
            placeholder="Cook your idea"
            textAlignVertical="top"
            className="bg-[#0F0F0F h-full w-full bg-[#1A222D] text-xl text-white placeholder:text-gray-500"
            onChange={(e) => setNote({ ...Note, content: e.nativeEvent.text })}
            value={Note.content}
          />
      </View>
    </View>
  );
};



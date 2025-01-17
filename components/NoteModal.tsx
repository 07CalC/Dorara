import { FontAwesome } from '@expo/vector-icons';
import React, { createRef, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextBase,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNTextArea from '@freakycoder/react-native-text-area';
import { Note } from '~/lib/types';
import { RichEditor } from 'react-native-pell-rich-editor';
import {
  CodeBridge,
  darkEditorCss,
  darkEditorTheme,
  RichText,
  TenTapStartKit,
  Toolbar,
  useBridgeState,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';
type props = {
  setShowNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  Note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  setShowColorModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTagEditorModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateNote: (id: number) => void;
  deleteNote: (id: number) => void
};

export const NoteModal = ({ setShowNoteModal, Note, setNote, setShowTagEditorModal, updateNote, setShowColorModal,deleteNote }: props) => {
  const [initialContent, setInitialContent] = useState<string>(Note.content);
  const [content, setContent] = useState<string>('');
  const [editNote, setEditNote] = useState<boolean>(false);
  const editor = useEditorBridge({
    bridgeExtensions: [
      ...TenTapStartKit,
      CodeBridge.configureCSS(darkEditorCss),
    ],
    theme: darkEditorTheme,
    avoidIosKeyboard: true,
    initialContent: initialContent,
    editable: editNote,
  });

  const NoteContent = useEditorContent(editor, {type: 'html'});
  const plainText = useEditorContent(editor, {type: 'text'})
  useEffect(() => {
    
    setNote({...Note, plainText: plainText as string,content: NoteContent as string})
    
  },[NoteContent])
  return (
    <View className="flex h-full w-full flex-col gap-y-2 bg-[#0F0F0F] py-5">
      {/* <View className="flex w-full h-[10%] flex-col items-center justify-center gap-y-2 bg"> */}
      <TextInput
       editable={editNote}
        className={`rounded-md border-b-2 px-5 py-2 text-3xl font-semibold text-white placeholder:font-semibold placeholder:text-gray-500`}
        placeholder="Title"
        onChangeText={(text: string) => setNote({ ...Note, title: text })}
        value={Note.title}
        style={{ borderColor: Note.color }}
      />
      <View className="flex w-full flex-row items-center justify-between px-5">
        <View className='flex flex-row gap-x-2 items-center'>
        <TouchableOpacity disabled={!editNote} onPress={() => setShowColorModal(true)}>
          <FontAwesome
            name="paint-brush"
            size={20}
            color="black"
            className={`bg-[${Note.color}] rounded-full p-2`}
            style={{backgroundColor: Note.color}}
          />
        </TouchableOpacity>
        <TouchableOpacity disabled={!editNote} onPress={() => setShowTagEditorModal(true)} className="flex items-center justify-center px-2">
        <Text style={{backgroundColor: Note.color}} className={`rounded-full text-center p-2 text-[1rem] font-bold text-black bg-[${Note.color}]`}>
          {Note.tag}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {deleteNote(Note.id);
      setShowNoteModal(false);
      }
      }>
          <FontAwesome
            name="trash"
            size={20}
            color="black"
            className={`bg-[${Note.color}] rounded-full p-2`}
            style={{backgroundColor: Note.color}}
          />
        </TouchableOpacity>
        </View>

        
      </View>
      {/* </View> */}
      <View className="flex px-2 h-[90%] w-full">
      <RichText editor={editor}/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={exampleStyles.keyboardAvoidingView}>
        <Toolbar editor={editor} />
        {!editNote && (
        <TouchableOpacity
          onPress={() => {
            setEditNote(true);
          }}>
          <FontAwesome
            name="pencil"
            size={40}
            color="black"
            style={{backgroundColor: Note.color}}
            className={`bg-[${Note.color}] px-4 bottom-16 right-5 absolute rounded-full p-3`}
          />
        </TouchableOpacity>
      )}
      {editNote && (
        <TouchableOpacity
          onPress={() => {
            setInitialContent(NoteContent as string);
            updateNote(Note.id)
            setEditNote(false);
          }}>
          <FontAwesome
            name="check"
            size={40}
            color="black"
            style={{backgroundColor: Note.color}}
            className={`bg-[${Note.color}] bottom-16 right-5 absolute rounded-full p-3`}
          />
        </TouchableOpacity>
      )}
      </KeyboardAvoidingView>
      
      
      </View>
    </View>
  );
};


const exampleStyles = StyleSheet.create({
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 30,
  },
})



import { FontAwesome } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Modal, TextInput, TouchableOpacity, View } from 'react-native';
import { AddNotesButton } from '~/components/AddNotesButton';
import { ColorModal } from '~/components/ColorModal';
import { NoDataFound } from '~/components/NoDataFound';
import { NoteModal } from '~/components/NoteModal';
import { RenderNotes } from '~/components/RenderNotes';
import { TagEditorModal } from '~/components/TagEditorModal';
import { Note } from '~/lib/types';

export default function notes(){
  /*---------------------const declaration--------------------*/

  const color = '#FCDC00';
  const db = useSQLiteContext();
  const [showNote, setShowNote] = useState<boolean>(false);
  const [showAddNote, setShowAddNote] = useState<boolean>(false);
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [showColorModal, setShowColorModal] = useState<boolean>(false);
  const [showTagEditorModal, setShowTagEditorModal] = useState<boolean>(false);
  const [tempTag, setTempTag] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note>({
    id: 0,
    title: '',
    content: '',
    date: 0,
    tag: '',
    color: color,
  });

  /*--------------------setColor Function--------------------*/
  const setColor = (color: string) => {
    setNote({ ...note, color: color });
  };

  /*--------------------db functions--------------------*/
  const getNotes = async () => {
    try {
      const notesFetched: Note[] = await db.getAllAsync('SELECT * FROM notes');
      setNotesList(notesFetched);
    } catch (error) {
      console.log(error);
    }
  };

  const insertNote = async () => {
    try {
      await db.runAsync(`
             INSERT INTO notes (
                 title,
                 content,
                 date,
                 color,
                 tag
             ) VALUES (
                 "${note.title}",
                 "${note.content}",
                 ${parseInt(moment().format('x'))},
                 "${note.color}",
                 "${note.tag}"
             )
              `);
    } catch (error) {
      console.log(error);
    }
    await getNotes();
  };

  const updateNote = async (id: number) => {
    try {
      await db.runAsync(`
        UPDATE notes SET
        title = "${note.title}",
        content = "${note.content}",
        color = "${note.color}",
        tag = "${note.tag}"
        WHERE id = ${id}
      `);
    } catch (error) {
      console.log(error);
    }
    await getNotes();
  };

  const deleteNote = async (id: number) => {
    try {
      await db.runAsync(`DELETE FROM notes WHERE id = ?`, [id]);
    } catch (error) {
      console.log(error);
    }
    await getNotes();
  };


  /*--------------------useEffect--------------------*/
  useEffect(() => {
    if (query !== '') {
      const afterFilterNotes = notesList.filter((note) => {
        return (
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.tag?.toLowerCase().includes(query.toLowerCase()) ||
          note.content.toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredNotes(afterFilterNotes);
    } else {
      setFilteredNotes(notesList);
    }
  }, [query, notesList]);

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <View className="p-2 flex h-screen w-full flex-col items-center justify-center bg-[#0F0F0F]">
      <Modal
        animationType="slide"
        visible={showNote}
        onRequestClose={() => setShowNote(false)}
        style={{ backgroundColor: '#0f0f0f' }}
        className="flex h-full w-full flex-col items-center justify-center bg-[#0F0F0F]">
        <NoteModal
          setShowNoteModal={setShowNote}
          Note={note}
          setNote={setNote}
          setShowTagEditorModal={setShowTagEditorModal}
          setShowColorModal={setShowColorModal}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      </Modal>
      <Modal
        animationType="slide"
        visible={showAddNote}
        onRequestClose={() => setShowAddNote(false)}
        style={{ backgroundColor: '#0f0f0f' }}
        className="flex h-full w-full flex-col items-center justify-center bg-[#0F0F0F50]">
        <NoteModal
          Note={note}
          setShowNoteModal={setShowAddNote}
          deleteNote={deleteNote}
          setNote={setNote}
          setShowColorModal={setShowColorModal}
          setShowTagEditorModal={setShowTagEditorModal}
          updateNote={insertNote}
        />
      </Modal>
      <Modal
        animationType="slide"
        visible={showColorModal}
        transparent={true}
        onRequestClose={() => setShowColorModal(false)}
        style={{ backgroundColor: '#0f0f0f' }}
        className="flex h-full w-full flex-col items-center justify-center bg-[#0F0F0F50]">
        <ColorModal setShowColorModal={setShowColorModal} setColor={setColor} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTagEditorModal}
        onRequestClose={() => setShowTagEditorModal(false)}
        style={{ backgroundColor: '#0f0f0f' }}
        className="flex h-full w-full flex-col items-center justify-center bg-[#0F0F0F50]">
        <TagEditorModal
          setShowTagEditorModal={setShowTagEditorModal}
          setTag={(tag: string | undefined) => setNote({ ...note, tag: tag })}
          tag={note.tag}
          tempTag={tempTag}
          setTempTag={setTempTag}
        />
      </Modal>

      <View className="flex h-[8%] w-11/12 flex-row items-center justify-center">
        <View
          style={{ borderColor: '#9ca3af' }}
          className="flex h-4/5 w-full flex-row items-center gap-x-2 rounded-full border bg-[#1e1e1e] px-4 placeholder:font-bold">
          <FontAwesome name="search" size={20} className="w-[5%]" color={'#9ca3af'} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            className="w-[85%] text-lg text-gray-400 placeholder:text-gray-400"
            placeholder="Search"
          />
          {query !== '' && (
            <TouchableOpacity className="mr-3 w-[5%]" onPress={() => setQuery('')}>
              <FontAwesome name="close" size={20} color={color} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="h-[85%] w-full flex items-center justify-center">
        {filteredNotes.length === 0 && <NoDataFound />}
        {filteredNotes.length > 0 && (
          <RenderNotes setNote={setNote} notesList={filteredNotes} setShowNote={setShowNote} />
        )}
      </View>
      <AddNotesButton setTempTag={setTempTag} color={color} setNote={setNote} setShowNote={setShowAddNote} />
    </View>
  );
}

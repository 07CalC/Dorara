import { FontAwesome } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Modal, TextInput, TouchableOpacity, View } from 'react-native';
import { AddNoteModal } from '~/components/AddNoteModal';
import { AddNotesButton } from '~/components/AddNotesButton';
import { ColorModal } from '~/components/ColorModal';
import { NoDataFound } from '~/components/NoDataFound';
import { NoteModal } from '~/components/NoteModal';
import { RenderNotes } from '~/components/RenderNotes';
import { TagEditorModal } from '~/components/TagEditorModal';
import { Note } from '~/lib/types';

export default function notes() {
  /*---------------------const declaration--------------------*/
  const db = useSQLiteContext();
  const [showNote, setShowNote] = useState<boolean>(false);
  const [showAddNote, setShowAddNote] = useState<boolean>(false);
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [showColorModal, setShowColorModal] = useState<boolean>(false);
  const [showTagEditorModal, setShowTagEditorModal] = useState<boolean>(false);
  const [tempTag, setTemptTag] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note>({
    id: 0,
    title: '',
    content: '',
    date: 0,
    tag: '',
    color: '#5f4dff',
    plainText: '',
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
                 plainText,
                 color,
                 tag
             ) VALUES (
                 "${note.title}",
                 "${note.content}",
                 ${parseInt(moment().format('x'))},
                 "${note.plainText}",
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
        plainText = "${note.plainText}",
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
          note.plainText.toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredNotes(afterFilterNotes);
    } else {
      setFilteredNotes(notesList);
    }
  }, [query, updateNote, deleteNote, insertNote]);

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <View className="p- flex h-screen w-full flex-col items-center bg-[#0F0F0F]">
      <Modal
        animationType="slide"
        visible={showNote}
        onRequestClose={() => setShowNote(false)}
        style={{ backgroundColor: '#0f0f0f' }}
        className="flex h-full w-full flex-col items-center justify-center bg-[#0F0F0F50]">
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
        <AddNoteModal
          setShowAddNote={setShowAddNote}
          Note={note}
          setNote={setNote}
          setshowColorModal={setShowColorModal}
          setShowTagEditorModal={setShowTagEditorModal}
          insertNote={insertNote}
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
          setTempTag={setTemptTag}
        />
      </Modal>

      <View className="flex h-[8%] w-11/12 flex-row items-center justify-center">
        <View className="flex h-2/3 w-full flex-row items-center gap-x-2 rounded-full border border-[#9ca3af] bg-[#1e1e1e] p-1 px-4 placeholder:font-bold">
          <FontAwesome name="search" size={20} className="w-[5%]" color={'#9ca3af'} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            className="w-[88%] text-gray-400 placeholder:text-gray-400"
            placeholder="Search"
          />
          {query !== '' && (
            <TouchableOpacity className="mr-2 w-[5%]" onPress={() => setQuery('')}>
              <FontAwesome name="close" size={20} color={'#9ca3af'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="h-[86%] w-full">
        {filteredNotes.length === 0 && <NoDataFound />}
        {filteredNotes.length > 0 && (
          <RenderNotes setNote={setNote} notesList={filteredNotes} setShowNote={setShowNote} />
        )}
      </View>
      <AddNotesButton setNote={setNote} setShowNote={setShowAddNote} />
    </View>
  );
}

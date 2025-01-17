import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Note } from "~/lib/types";


type props = {
  setNote: React.Dispatch<React.SetStateAction<Note>>
  setShowNote: React.Dispatch<React.SetStateAction<boolean>>
}


export const AddNotesButton = ({setShowNote, setNote}: props) => {
    return(
        <View className={`flex-1`}>
            <TouchableOpacity
              onPress={() => {
                setNote({
                      id: 0,
                      title: '',
                      content: '',
                      plainText: '',
                      date: 0,
                      tag: 'tag',
                      color: '#5f4dff',
                })
                setShowNote(true);
              }}
              className={`bottom-[6.5rem] left-44 flex h-20 w-20 items-center justify-center rounded-full bg-[#5f4dff] p-5`}>
              <FontAwesome
                className="flex items-center justify-center text-center"
                name="plus"
                size={35}
                color="#0f0f0f"
              />
            </TouchableOpacity>
          </View>
    )
}
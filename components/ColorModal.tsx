import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { colorPallete } from "~/lib/colorPallete";



type props ={
  setShowColorModal: React.Dispatch<React.SetStateAction<boolean>>,
  setColor: (color: string) => void
}



export const ColorModal = ({ setShowColorModal, setColor}: props) => {
    return(
        <View className="flex h-full w-full flex-col items-center justify-center self-center bg-transparent">
                  <View className="h-9/12 flex w-11/12 flex-col items-center justify-center gap-y-3 rounded-2xl bg-[#1A222D] p-4">
                    <FlatList
                      data={colorPallete}
                      numColumns={4}
                      className=""
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setColor(item.color)
                            setShowColorModal(false);
                          }}
                          className="flex flex-row items-center justify-center gap-x-2">
                          <View
                            style={{ backgroundColor: item.color }}
                            className="m-3 h-16 w-16 rounded-full"
                          />
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
    )
}
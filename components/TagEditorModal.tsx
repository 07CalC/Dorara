import { Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

type props = {
  setTag: (tag: string | undefined) => void;
  tag: string | undefined;
  setShowTagEditorModal: React.Dispatch<React.SetStateAction<boolean>>;
  tempTag: string;
  setTempTag: React.Dispatch<React.SetStateAction<string>>;
};

export const TagEditorModal = ({ setTag, setShowTagEditorModal, tempTag, setTempTag }: props) => {
  return (
    <View className="flex h-full w-full flex-col items-center justify-center self-center ">
      <View className="flex h-40 w-80 flex-col items-center justify-center gap-y-3 rounded-2xl bg-[#1A222D] p-4">
        <Text className="text-center text-xl font-semibold text-gray-200">Tag</Text>
        <TextInput
          className="w-full self-center rounded-lg border border-[#5f4dff] bg-[#1A222D] p-2 text-center text-3xl text-gray-200"
          value={tempTag}
          onChangeText={setTempTag}
        />
        <View className="flex w-full flex-row items-center justify-end gap-x-4">
          <TouchableOpacity
            onPress={() => {
              setShowTagEditorModal(false);
            }}>
            <Text className="text-xl font-semibold text-[#5f4dff]">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowTagEditorModal(false);
              setTag(tempTag);
            }}>
            <Text className="text-xl font-semibold text-[#5f4dff]">Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

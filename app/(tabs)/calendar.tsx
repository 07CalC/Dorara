import moment from "moment";
import { Text, View } from "react-native";
import { Agenda, CalendarProvider, TimelineList } from "react-native-calendars";
import { timelineEvents } from "~/lib/mockTimeline";




export default function calendar() {
    return (
    <View className="flex h-screen w-full flex-col items-center justify-center bg-[#0F0F0F] p-2">
      <Text className="text-[#5f4dff]">calendar</Text>
    </View>
    );
}
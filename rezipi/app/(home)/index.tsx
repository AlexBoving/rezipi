import { Text, View, Pressable, FlatList } from "react-native";
import { Stack, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const DATA = [
  {
    id: "1",
    title: "First Item",
  },
  {
    id: "2",
    title: "Second Item",
  },
  {
    id: "3",
    title: "Third Item",
  },
];

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "My Recipes",
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placeholder: "Search for recipes",
            hideWhenScrolling: true,
          },
          headerRight: () => {
            return (
              <Link href={"/"} asChild>
                <Pressable style={{ backgroundColor: "#679F37", width: 32, height: 32, borderRadius: 16, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize: 17, fontWeight: "medium" }}>A</Text>
                </Pressable>
              </Link>
            );
          },
          headerLeft: () => {
            return <Ionicons name="ellipsis-horizontal" size={24} color="black" />;
          },
          headerTransparent: true,
          headerShadowVisible: false,
          headerBlurEffect: "systemUltraThinMaterial",
        }}
      />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
        style={{ flex: 1, padding: 16 }}
      />
    </View>
  );
}

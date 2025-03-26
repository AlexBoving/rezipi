import { Text, View, Pressable, FlatList } from "react-native";
import { Stack, Link } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";

// Auth.
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

enum FoodImages {
  "Spaghetti Carbonara" = require("@/assets/images/food/spaghetti.jpg"),
  "Avocado and Egg Toast" = require("@/assets/images/food/avocado-toast.jpg"),
  "Fluffly Pancakes" = require("@/assets/images/food/pancakes.jpg"),
  "Oklahoma Onion Burger" = require("@/assets/images/food/burger.jpg"),
  "Yakisoba Noodle Soup" = require("@/assets/images/food/noodles.jpg"),
  "Ceasar Salad" = require("@/assets/images/food/salad.jpg"),
}

const DATA = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    time: "30 min",
    nationality: "Italian",
    difficulty: "Easy",
  },
  {
    id: "2",
    title: "Avocado and Egg Toast",
    time: "10 min",
    nationality: "American",
    difficulty: "Easy",
  },
  {
    id: "3",
    title: "Fluffly Pancakes",
    time: "20 min",
    nationality: "American",
    difficulty: "Medium",
  },
  {
    id: "4",
    title: "Oklahoma Onion Burger",
    time: "30 min",
    nationality: "American",
    difficulty: "Hard",
  },
  {
    id: "5",
    title: "Yakisoba Noodle Soup",
    time: "20 min",
    nationality: "Japanese",
    difficulty: "Medium",
  },
  {
    id: "6",
    title: "Ceasar Salad",
    time: "15 min",
    nationality: "Italian",
    difficulty: "Easy",
  },
  {
    id: "7",
    title: "Yakisoba Noodle Soup",
    time: "20 min",
    nationality: "Japanese",
    difficulty: "Medium",
  },
  {
    id: "8",
    title: "Ceasar Salad",
    time: "15 min",
    nationality: "Italian",
    difficulty: "Easy",
  },
];

type RecipeItemType = {
  id: string;
  title: string;
  time: string;
  nationality: string;
  difficulty: string;
};

export default function Home() {
  const renderStars = (difficulty: "Easy" | "Medium" | "Hard") => {
    const starCount = difficulty === "Easy" ? 1 : difficulty === "Medium" ? 2 : 3;
    return Array(3)
      .fill(0)
      .map((_, i) => <Ionicons key={i} name={i < starCount ? "star" : "star-outline"} size={20} color="#333333" />);
  };

  const RecipeItem = memo(({ item }: { item: RecipeItemType }) => {
    return (
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ paddingVertical: 8 }}>
          <Image source={FoodImages[item.title as keyof typeof FoodImages]} style={{ width: 80, height: 80, borderRadius: 12 }} />
        </View>
        <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "lightgrey", flex: 1, justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 17 }}>{item.title}</Text>
            <Text style={{ fontWeight: "300", fontSize: 14 }}>
              {item.time} • {item.nationality}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 4 }}>{renderStars(item.difficulty as "Easy" | "Medium" | "Hard")}</View>
        </View>
      </View>
    );
  });
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "My Recipes",
          headerLargeTitle: true,
          headerTransparent: true,
          headerShadowVisible: false,
          headerBlurEffect: "systemThinMaterialLight",
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
        }}
      />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{ paddingLeft: 16 }}
        renderItem={({ item }) => <RecipeItem item={item} />}
        style={{ flex: 1 }}
      />
    </View>
  );
}

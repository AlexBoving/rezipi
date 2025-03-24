import { StyleSheet } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { CustomTabList } from "@/components/CustomTabList";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Tabs>
      <TabSlot />
      <CustomTabList />
      <TabList style={styles.tabList}>
        <TabTrigger name="home" href="/" />
        <TabTrigger name="camera" href="/camera" />
      </TabList>
    </Tabs>

    // Hide the TabList component as it's only role is to define the tabs. The CustomTabList component will be used to render the tabs.
  );
}

const styles = StyleSheet.create({
  tabList: { display: "none" },
});

import * as React from "react";
import { StyleSheet } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { CustomTabList } from "@/components/CustomTabList";

export default function Layout() {
  return (
    <Tabs>
      <TabSlot />
      <CustomTabList />
      <TabList style={styles.tabList}>
        <TabTrigger name="home" href="/" />
        <TabTrigger name="camera" href="/camera" />
      </TabList>
    </Tabs>

    // Hide the TabList component as it's only role is to define the tabs.
  );
}

const styles = StyleSheet.create({
  tabList: { display: "none" },
});

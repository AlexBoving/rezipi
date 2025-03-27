import * as React from "react";
import { View, StyleSheet } from "react-native";
import { TabTrigger } from "expo-router/ui";
import { ToggleMenuButton } from "./ToggleMenuButton";
import { CustomTabButton } from "./CustomTabButton";

export function CustomTabList() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  function toggleExpandHandler() {
    setIsExpanded(!isExpanded);
  }

  return (
    <View style={styles.tabList}>
      <TabTrigger name="home" asChild>
        <CustomTabButton icon="home" isExpanded={isExpanded} index={1} />
      </TabTrigger>
      <TabTrigger name="camera" asChild>
        <CustomTabButton icon="camera" isExpanded={isExpanded} index={0} />
      </TabTrigger>
      <ToggleMenuButton onPress={toggleExpandHandler} isExpanded={isExpanded} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabList: {
    bottom: 32,
    right: 32,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

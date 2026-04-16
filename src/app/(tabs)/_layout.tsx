import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import useTheme from "../../hooks/useTheme";

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: "center", gap: 2 }}>
      <Text style={{ fontSize: 18 }}>{emoji}</Text>
      <Text style={{ fontSize: 9, color: focused ? colors.navActive : colors.navInactive }}>
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.navBar,
          borderTopColor: colors.navBarBorder,
          borderTopWidth: 0.5,
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" label="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🎬" label="Movies" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="songs"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🎵" label="Songs" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cast"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="👥" label="Cast" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="📰" label="News" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

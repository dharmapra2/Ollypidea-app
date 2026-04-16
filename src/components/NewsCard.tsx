import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "../hooks/useTheme";
import type { NewsItem } from "../data/mockData";

interface Props {
  item: NewsItem;
  onPress?: () => void;
}

export default function NewsCard({ item, onPress }: Props) {
  const { colors } = useTheme();
  const gradient = colors.posterGradients[item.gradientKey];
  return (
    <TouchableOpacity
      style={[styles.row, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient colors={gradient} style={styles.thumb}>
        <Text style={{ fontSize: 18 }}>{item.emoji}</Text>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <Text style={[styles.tag, { color: colors.primary }]}>{item.tag}</Text>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.date, { color: colors.textHint }]}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, borderRadius: 8, padding: 8, marginBottom: 6, alignItems: "center" },
  thumb: { width: 46, height: 46, borderRadius: 6, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  tag: { fontSize: 7, marginBottom: 2 },
  title: { fontSize: 9, fontWeight: "500", lineHeight: 13 },
  date: { fontSize: 7, marginTop: 3 },
});

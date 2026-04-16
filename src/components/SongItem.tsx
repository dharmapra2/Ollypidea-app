import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "../hooks/useTheme";
import type { Song } from "../data/mockData";

interface Props {
  song: Song;
  index: number;
  isPlaying?: boolean;
  onPress?: () => void;
}

export default function SongItem({ song, index, isPlaying, onPress }: Props) {
  const { colors } = useTheme();
  const gradient = colors.posterGradients[song.gradientKey];
  return (
    <TouchableOpacity
      style={[styles.row, { borderBottomColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.num, { color: isPlaying ? colors.primary : colors.textHint }]}>
        {isPlaying ? "▶" : index}
      </Text>
      <LinearGradient colors={gradient} style={styles.thumb}>
        <Text style={{ fontSize: 14 }}>🎵</Text>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: isPlaying ? colors.primary : colors.text }]}>
          {song.title}
        </Text>
        <Text style={[styles.artist, { color: colors.textHint }]}>
          {song.artist} · {song.movie}
        </Text>
      </View>
      <Text style={[styles.dur, { color: colors.textHint }]}>{song.duration}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 12, paddingVertical: 9, borderBottomWidth: 0.5 },
  num: { fontSize: 10, width: 16, textAlign: "center" },
  thumb: { width: 40, height: 40, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 10, fontWeight: "500" },
  artist: { fontSize: 8, marginTop: 2 },
  dur: { fontSize: 9 },
});

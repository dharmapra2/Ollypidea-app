import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../hooks/useTheme";
import type { Movie } from "../data/mockData";
import PosterGradient from "./PosterGradient";
import VerdictBadge from "./VerdictBadge";

interface Props {
  movie: Movie;
  width?: number;
  posterHeight?: number;
}

export default function MovieCard({ movie, width = 72, posterHeight = 96 }: Props) {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{ width }}
      onPress={() => router.push(`/movie/${movie.id}`)}
      activeOpacity={0.8}
    >
      <PosterGradient
        gradientKey={movie.posterGradient}
        emoji={movie.posterEmoji}
        style={{ width, height: posterHeight, marginBottom: 5, borderWidth: 0.5, borderColor: colors.border }}
        emojiSize={22}
      />
      <VerdictBadge verdict={movie.verdict} />
      <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
        {movie.title}
      </Text>
      <Text style={[styles.year, { color: colors.textHint }]}>{movie.year}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 9, fontWeight: "500", lineHeight: 13, marginTop: 3 },
  year: { fontSize: 8, marginTop: 1 },
});

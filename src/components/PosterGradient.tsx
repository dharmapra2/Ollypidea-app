import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import useTheme from "../hooks/useTheme";

type GradientKey = "blue" | "red" | "green" | "amber" | "purple" | "teal";

interface Props {
  gradientKey: GradientKey;
  emoji: string;
  style?: ViewStyle;
  emojiSize?: number;
}

export default function PosterGradient({ gradientKey, emoji, style, emojiSize = 28 }: Props) {
  const { colors } = useTheme();
  const gradient = colors.posterGradients[gradientKey];
  return (
    <LinearGradient colors={gradient} style={[styles.base, style]}>
      <Text style={{ fontSize: emojiSize }}>{emoji}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

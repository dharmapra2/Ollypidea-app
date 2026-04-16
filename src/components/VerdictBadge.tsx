import React from "react";
import { StyleSheet, Text } from "react-native";
import useTheme from "../hooks/useTheme";

type Verdict = "blockbuster" | "superHit" | "hit" | "upcoming" | "released" | "flop";

const LABELS: Record<Verdict, string> = {
  blockbuster: "Blockbuster",
  superHit: "Super Hit",
  hit: "Hit",
  upcoming: "Upcoming",
  released: "Released",
  flop: "Flop",
};

export default function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const { colors } = useTheme();
  const { bg, fg } = colors.verdicts[verdict];
  return (
    <Text style={[styles.badge, { backgroundColor: bg, color: fg }]}>
      {LABELS[verdict]}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    fontSize: 9,
    fontWeight: "500",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "flex-start",
  },
});

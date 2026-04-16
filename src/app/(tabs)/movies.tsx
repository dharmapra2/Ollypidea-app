import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import PosterGradient from "../../components/PosterGradient";
import VerdictBadge from "../../components/VerdictBadge";
import { MOVIES } from "../../data/mockData";
import useTheme from "../../hooks/useTheme";

const CHIPS = ["All", "2026", "Blockbuster", "Upcoming", "Drama"];

export default function MoviesScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [chip, setChip] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = MOVIES.filter((m) => {
    const matchQuery = m.title.toLowerCase().includes(query.toLowerCase());
    if (!matchQuery) return false;
    if (chip === "All") return true;
    if (chip === "2026") return m.year === "2026";
    if (chip === "Blockbuster") return m.verdict === "blockbuster";
    if (chip === "Upcoming") return m.verdict === "upcoming";
    if (chip === "Drama") return m.genre.includes("Drama");
    return true;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={["top"]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.header, borderBottomColor: colors.headerBorder }]}>
        <Text style={[styles.title, { color: colors.headerText }]}>Odia Movies</Text>
        <Text style={{ color: colors.textMuted, fontSize: 16 }}>⚙</Text>
      </View>

      {/* Search */}
      <View style={[styles.searchWrap, { backgroundColor: colors.header, borderBottomColor: colors.border }]}>
        <View style={[styles.searchBox, { backgroundColor: colors.input, borderColor: colors.inputBorder }]}>
          <Text style={{ color: colors.textHint, fontSize: 13 }}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search movies…"
            placeholderTextColor={colors.inputPlaceholder}
            style={{ flex: 1, fontSize: 12, color: colors.text }}
          />
        </View>
      </View>

      {/* Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.chipsScroll, { backgroundColor: colors.header }]}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 6, paddingVertical: 8 }}
      >
        {CHIPS.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setChip(c)}
            style={[
              styles.chip,
              {
                backgroundColor: chip === c ? colors.chipActive : colors.chipInactive,
                borderColor: chip === c ? colors.chipActive : colors.chipBorder,
              },
            ]}
          >
            <Text style={{ fontSize: 10, color: chip === c ? colors.chipActiveFg : colors.chipInactiveFg }}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(m) => m.id}
        numColumns={3}
        contentContainerStyle={{ padding: 12, gap: 10 }}
        columnWrapperStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => router.push(`/movie/${item.id}`)}
            activeOpacity={0.8}
          >
            <PosterGradient
              gradientKey={item.posterGradient}
              emoji={item.posterEmoji}
              style={{ width: "100%", aspectRatio: 2 / 3, marginBottom: 5, borderWidth: 0.5, borderColor: colors.border }}
              emojiSize={24}
            />
            <VerdictBadge verdict={item.verdict} />
            <Text style={[styles.movieTitle, { color: colors.text }]} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 0.5 },
  title: { fontSize: 15, fontWeight: "500" },
  searchWrap: { paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 0.5 },
  searchBox: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 0.5 },
  chipsScroll: { flexGrow: 0 },
  chip: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 14, borderWidth: 0.5 },
  movieTitle: { fontSize: 9, fontWeight: "500", lineHeight: 13, marginTop: 3 },
});

import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CAST } from "../../data/mockData";
import useTheme from "../../hooks/useTheme";

const CAST_COLORS: Record<string, string> = {
  c1: "#1e3a6e", c2: "#6e1e1e", c3: "#1e6e3a",
  c4: "#6e5a1e", c5: "#4a1e6e", c6: "#1e5a6e",
};

const ALPHABET = ["A", "B", "D", "E", "K", "M", "P", "R", "S"];

export default function CastScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("B");

  const filtered = CAST.filter((c) => {
    if (query) return c.name.toLowerCase().includes(query.toLowerCase());
    return c.name.startsWith(letter);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={["top"]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={[styles.title, { color: colors.headerText }]}>Cast & Crew</Text>
        <Text style={{ color: colors.textMuted, fontSize: 16 }}>⚙</Text>
      </View>

      {/* Search */}
      <View style={[styles.searchWrap, { backgroundColor: colors.header, borderBottomColor: colors.border }]}>
        <View style={[styles.searchBox, { backgroundColor: colors.input, borderColor: colors.inputBorder }]}>
          <Text style={{ color: colors.textHint, fontSize: 13 }}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search actors, directors…"
            placeholderTextColor={colors.inputPlaceholder}
            style={{ flex: 1, fontSize: 12, color: colors.text }}
          />
        </View>
      </View>

      {/* Alphabet */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.alphaScroll, { backgroundColor: colors.header, borderBottomColor: colors.border }]}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 4, paddingVertical: 6 }}
      >
        {ALPHABET.map((l) => (
          <TouchableOpacity
            key={l}
            onPress={() => { setLetter(l); setQuery(""); }}
            style={[styles.letterBtn, { backgroundColor: letter === l && !query ? colors.primary : "transparent" }]}
          >
            <Text style={{ fontSize: 9, color: letter === l && !query ? "#fff" : colors.textHint }}>{l}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Section label */}
      {!query && (
        <View style={[styles.sectionLabel, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Text style={{ color: colors.primary, fontSize: 11, fontWeight: "500" }}>{letter}</Text>
        </View>
      )}

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(c) => c.id}
        numColumns={3}
        contentContainerStyle={{ padding: 12, gap: 10 }}
        columnWrapperStyle={{ gap: 8 }}
        ListEmptyComponent={
          <Text style={{ color: colors.textMuted, textAlign: "center", marginTop: 40 }}>No results found</Text>
        }
        renderItem={({ item }) => (
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={[styles.avatar, { backgroundColor: CAST_COLORS[item.colorKey] }]}>
              <Text style={{ fontSize: 22 }}>{item.emoji}</Text>
            </View>
            <Text style={[styles.castName, { color: colors.text }]} numberOfLines={2}>{item.name}</Text>
            <Text style={[styles.castRole, { color: colors.textHint }]}>{item.role}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingVertical: 12 },
  title: { fontSize: 15, fontWeight: "500" },
  searchWrap: { paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 0.5 },
  searchBox: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 0.5 },
  alphaScroll: { flexGrow: 0, borderBottomWidth: 0.5 },
  letterBtn: { paddingHorizontal: 7, paddingVertical: 4, borderRadius: 4 },
  sectionLabel: { paddingHorizontal: 12, paddingVertical: 6, borderBottomWidth: 0.5 },
  avatar: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", marginBottom: 5 },
  castName: { fontSize: 9, fontWeight: "500", textAlign: "center", lineHeight: 13 },
  castRole: { fontSize: 8, textAlign: "center" },
});

import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SongItem from "../../components/SongItem";
import { SONGS } from "../../data/mockData";
import useTheme from "../../hooks/useTheme";

const TABS = ["Trending", "Latest 2026", "Classics", "Singers"];

export default function SongsScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("Trending");
  const [playingId, setPlayingId] = useState<string | null>(SONGS[0].id);

  const playingSong = SONGS.find((s) => s.id === playingId) ?? SONGS[0];
  const featuredGradient = colors.posterGradients[playingSong.gradientKey];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={["top"]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={[styles.title, { color: colors.headerText }]}>Odia Songs</Text>
        <Text style={{ color: colors.textMuted, fontSize: 16 }}>⌕</Text>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.tabsScroll, { backgroundColor: colors.header, borderBottomColor: colors.border }]}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {TABS.map((t) => (
          <TouchableOpacity key={t} onPress={() => setActiveTab(t)} style={styles.tab}>
            <Text style={{ fontSize: 10, color: activeTab === t ? colors.tabActiveFg : colors.tabInactiveFg }}>
              {t}
            </Text>
            {activeTab === t && <View style={[styles.tabIndicator, { backgroundColor: colors.tabIndicator }]} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured */}
      <LinearGradient colors={colors.gradients.featuredBanner} style={[styles.featured, { borderBottomColor: colors.border }]}>
        <LinearGradient colors={featuredGradient} style={styles.featThumb}>
          <Text style={{ fontSize: 22 }}>🎶</Text>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={[styles.featTag, { color: colors.primary }]}>NOW TRENDING</Text>
          <Text style={[styles.featTitle, { color: colors.heroTitle }]}>{playingSong.title}</Text>
          <Text style={[styles.featArtist, { color: colors.textMuted }]}>
            {playingSong.artist} · {playingSong.movie}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.featPlay, { backgroundColor: colors.primary }]}
          onPress={() => setPlayingId(playingSong.id)}
        >
          <Text style={{ color: "#fff", fontSize: 13 }}>▶</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Song List */}
      <FlatList
        data={SONGS}
        keyExtractor={(s) => s.id}
        renderItem={({ item, index }) => (
          <SongItem
            song={item}
            index={index + 1}
            isPlaying={item.id === playingId}
            onPress={() => setPlayingId(item.id)}
          />
        )}
        style={{ flex: 1, backgroundColor: colors.bg }}
      />

      {/* Mini Player */}
      <View style={[styles.player, { backgroundColor: colors.player, borderTopColor: colors.playerBorder }]}>
        <LinearGradient colors={featuredGradient} style={styles.playerThumb}>
          <Text style={{ fontSize: 14 }}>🎵</Text>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={[styles.playerTitle, { color: colors.text }]}>{playingSong.title}</Text>
          <Text style={[styles.playerArtist, { color: colors.textHint }]}>{playingSong.artist}</Text>
        </View>
        <View style={styles.playerCtrls}>
          <TouchableOpacity onPress={() => {
            const idx = SONGS.findIndex((s) => s.id === playingId);
            if (idx > 0) setPlayingId(SONGS[idx - 1].id);
          }}>
            <Text style={{ color: colors.playerControl, fontSize: 18 }}>⏮</Text>
          </TouchableOpacity>
          <View style={[styles.playBtn, { backgroundColor: colors.playerPlayBtn }]}>
            <Text style={{ color: colors.playerPlayBtnFg, fontSize: 13 }}>⏸</Text>
          </View>
          <TouchableOpacity onPress={() => {
            const idx = SONGS.findIndex((s) => s.id === playingId);
            if (idx < SONGS.length - 1) setPlayingId(SONGS[idx + 1].id);
          }}>
            <Text style={{ color: colors.playerControl, fontSize: 18 }}>⏭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingVertical: 12 },
  title: { fontSize: 15, fontWeight: "500" },
  tabsScroll: { flexGrow: 0, borderBottomWidth: 0.5 },
  tab: { paddingHorizontal: 10, paddingVertical: 8, position: "relative" },
  tabIndicator: { position: "absolute", bottom: 0, left: 10, right: 10, height: 2, borderRadius: 1 },
  featured: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderBottomWidth: 0.5 },
  featThumb: { width: 56, height: 56, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  featTag: { fontSize: 8, marginBottom: 3 },
  featTitle: { fontSize: 14, fontWeight: "500" },
  featArtist: { fontSize: 9, marginTop: 2 },
  featPlay: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  player: { flexDirection: "row", alignItems: "center", gap: 10, padding: 10, borderTopWidth: 0.5 },
  playerThumb: { width: 38, height: 38, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  playerTitle: { fontSize: 11, fontWeight: "500" },
  playerArtist: { fontSize: 8 },
  playerCtrls: { flexDirection: "row", alignItems: "center", gap: 12 },
  playBtn: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
});

import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PosterGradient from "../../components/PosterGradient";
import VerdictBadge from "../../components/VerdictBadge";
import SongItem from "../../components/SongItem";
import { CAST, MOVIES, SONGS } from "../../data/mockData";
import useTheme from "../../hooks/useTheme";

const CAST_COLORS: Record<string, string> = {
  c1: "#1e3a6e", c2: "#6e1e1e", c3: "#1e6e3a",
  c4: "#6e5a1e", c5: "#4a1e6e", c6: "#1e5a6e",
};

const TABS = ["Overview", "Cast", "Songs", "Box Office"];

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const router = useRouter();
  const [tab, setTab] = useState("Overview");

  const movie = MOVIES.find((m) => m.id === id);
  if (!movie) return null;

  const cast = CAST.filter((c) => movie.castIds.includes(c.id));
  const songs = SONGS.filter((s) => movie.songIds.includes(s.id));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={["top"]}>
      {/* Hero */}
      <LinearGradient colors={colors.gradients.hero} style={styles.hero}>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: "rgba(0,0,0,0.5)" }]} onPress={() => router.back()}>
          <Text style={{ color: "#fff", fontSize: 16 }}>←</Text>
        </TouchableOpacity>
        <View style={styles.heroContent}>
          <PosterGradient
            gradientKey={movie.posterGradient}
            emoji={movie.posterEmoji}
            style={styles.poster}
            emojiSize={32}
          />
          <View style={styles.heroMeta}>
            <Text style={[styles.genre, { color: colors.primary }]}>
              {movie.type} · {movie.language} · {movie.genre[0]}
            </Text>
            <Text style={[styles.movieTitle, { color: colors.heroTitle }]}>{movie.title}</Text>
            <Text style={[styles.movieYear, { color: colors.textMuted }]}>
              {movie.year} · {movie.duration} · {movie.rating}
            </Text>
            <VerdictBadge verdict={movie.verdict} />
          </View>
        </View>
      </LinearGradient>

      {/* Action Buttons */}
      <View style={[styles.actions, { backgroundColor: colors.statsBg, borderBottomColor: colors.divider }]}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]}>
          <Text style={{ color: "#fff", fontSize: 10, fontWeight: "500" }}>▶ Watch Trailer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 0.5 }]}>
          <Text style={{ color: colors.textMuted, fontSize: 10 }}>+ Watchlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 0.5 }]}>
          <Text style={{ color: colors.textMuted, fontSize: 10 }}>★ Rate</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        {TABS.map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={styles.tabItem}>
            <Text style={{ fontSize: 10, color: tab === t ? colors.tabActiveFg : colors.tabInactiveFg }}>
              {t}
            </Text>
            {tab === t && <View style={[styles.tabIndicator, { backgroundColor: colors.tabIndicator }]} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: 12 }}>
        {tab === "Overview" && (
          <>
            {/* Ratings */}
            {movie.userRating > 0 && (
              <View style={styles.ratingsRow}>
                {[
                  { num: movie.userRating.toString(), label: "User Rating" },
                  { num: movie.criticScore.toString(), label: "Critic Score" },
                  { num: movie.votes, label: "Votes" },
                ].map((r) => (
                  <View key={r.label} style={[styles.ratingBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.ratingNum, { color: colors.primary }]}>{r.num}</Text>
                    <Text style={[styles.ratingLabel, { color: colors.textHint }]}>{r.label}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Description */}
            <Text style={[styles.desc, { color: colors.textMuted }]}>{movie.description}</Text>

            {/* Info pills */}
            <View style={styles.pillsRow}>
              {[`Director: ${movie.director}`, ...movie.genre, movie.releaseDate].map((p) => (
                <View key={p} style={[styles.pill, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Text style={{ color: colors.textMuted, fontSize: 9 }}>{p}</Text>
                </View>
              ))}
            </View>

            {/* Cast preview */}
            <Text style={[styles.subTitle, { color: colors.text }]}>Cast</Text>
            <View style={styles.castRow}>
              {cast.map((c) => (
                <View key={c.id} style={styles.castCard}>
                  <View style={[styles.castAvatar, { backgroundColor: CAST_COLORS[c.colorKey] }]}>
                    <Text style={{ fontSize: 16 }}>{c.emoji}</Text>
                  </View>
                  <Text style={[styles.castName, { color: colors.textMuted }]} numberOfLines={2}>{c.name}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {tab === "Cast" && (
          <View style={styles.castGrid}>
            {cast.map((c) => (
              <View key={c.id} style={styles.castGridItem}>
                <View style={[styles.castAvatarLg, { backgroundColor: CAST_COLORS[c.colorKey] }]}>
                  <Text style={{ fontSize: 26 }}>{c.emoji}</Text>
                </View>
                <Text style={[styles.castName, { color: colors.text }]} numberOfLines={2}>{c.name}</Text>
                <Text style={[styles.castRole, { color: colors.textHint }]}>{c.role}</Text>
              </View>
            ))}
          </View>
        )}

        {tab === "Songs" && (
          songs.length > 0
            ? songs.map((s, i) => <SongItem key={s.id} song={s} index={i + 1} />)
            : <Text style={{ color: colors.textMuted, textAlign: "center", marginTop: 40 }}>No songs available</Text>
        )}

        {tab === "Box Office" && (
          <View style={{ gap: 10 }}>
            {[
              { label: "Opening Day", value: "₹ 45 Lakhs" },
              { label: "Opening Weekend", value: "₹ 1.2 Cr" },
              { label: "Total Collection", value: "₹ 4.8 Cr" },
              { label: "Verdict", value: movie.verdict.replace(/([A-Z])/g, " $1").trim() },
            ].map((row) => (
              <View key={row.label} style={[styles.boRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={{ color: colors.textMuted, fontSize: 12 }}>{row.label}</Text>
                <Text style={{ color: colors.primary, fontSize: 13, fontWeight: "500" }}>{row.value}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { padding: 14, paddingTop: 10, position: "relative" },
  backBtn: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center", marginBottom: 8, alignSelf: "flex-start" },
  heroContent: { flexDirection: "row", gap: 12, alignItems: "flex-end" },
  poster: { width: 90, height: 120, borderRadius: 10 },
  heroMeta: { flex: 1, paddingTop: 20, gap: 4 },
  genre: { fontSize: 9 },
  movieTitle: { fontSize: 20, fontWeight: "500", lineHeight: 24 },
  movieYear: { fontSize: 11 },
  actions: { flexDirection: "row", gap: 8, padding: 10, borderBottomWidth: 0.5 },
  actionBtn: { flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: "center" },
  tabs: { flexDirection: "row", borderBottomWidth: 0.5 },
  tabItem: { flex: 1, alignItems: "center", paddingVertical: 9, position: "relative" },
  tabIndicator: { position: "absolute", bottom: 0, left: 8, right: 8, height: 2, borderRadius: 1 },
  ratingsRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  ratingBox: { flex: 1, borderRadius: 10, padding: 10, alignItems: "center", borderWidth: 0.5 },
  ratingNum: { fontSize: 22, fontWeight: "500" },
  ratingLabel: { fontSize: 8, marginTop: 2 },
  desc: { fontSize: 10, lineHeight: 16, marginBottom: 10 },
  pillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginBottom: 12 },
  pill: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 10, borderWidth: 0.5 },
  subTitle: { fontSize: 11, fontWeight: "500", marginBottom: 8 },
  castRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  castCard: { width: 56, alignItems: "center" },
  castAvatar: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", marginBottom: 4 },
  castName: { fontSize: 8, textAlign: "center", lineHeight: 12 },
  castGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  castGridItem: { width: "30%", alignItems: "center" },
  castAvatarLg: { width: 70, height: 70, borderRadius: 35, alignItems: "center", justifyContent: "center", marginBottom: 6 },
  castRole: { fontSize: 8, textAlign: "center" },
  boRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14, borderRadius: 10, borderWidth: 0.5 },
});

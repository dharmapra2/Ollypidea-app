import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewsCard from "../../components/NewsCard";
import MovieCard from "../../components/MovieCard";
import PosterGradient from "../../components/PosterGradient";
import VerdictBadge from "../../components/VerdictBadge";
import { MOVIES, NEWS } from "../../data/mockData";
import useTheme from "../../hooks/useTheme";

const { width: SW } = Dimensions.get("window");

const HERO_MOVIES = MOVIES.slice(0, 4);
const STATS = [
  { num: "500+", label: "Movies" },
  { num: "1000+", label: "Cast" },
  { num: "5000+", label: "Songs" },
  { num: "Daily", label: "News" },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [heroIndex, setHeroIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SW);
    setHeroIndex(idx);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={["top"]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={[styles.logo, { color: colors.primary }]}>
          Olly<Text style={{ color: colors.text }}>pedia</Text>
        </Text>
        <TouchableOpacity
          style={[styles.searchBar, { backgroundColor: "rgba(255,255,255,0.1)" }]}
          onPress={() => router.push("/movies")}
          activeOpacity={0.8}
        >
          <Text style={{ color: colors.textHint, fontSize: 11 }}>⌕  Search movies, songs…</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18 }}>🔔</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Carousel */}
        <FlatList
          ref={flatRef}
          data={HERO_MOVIES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <LinearGradient
              colors={colors.gradients.hero}
              style={[styles.hero, { width: SW, backgroundColor: colors.heroBg }]}
            >
              <View style={styles.heroContent}>
                <View style={[styles.heroBadge, { backgroundColor: colors.primary }]}>
                  <Text style={{ color: "#fff", fontSize: 8, fontWeight: "500" }}>
                    {item.type} · {item.language}
                  </Text>
                </View>
                <Text style={[styles.heroTitle, { color: colors.heroTitle }]}>{item.title}</Text>
                <Text style={[styles.heroDate, { color: colors.primary }]}>🗓 {item.releaseDate}</Text>
                <Text style={[styles.heroDesc, { color: colors.heroSubtitle }]} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.heroBtns}>
                  <TouchableOpacity
                    style={[styles.btnPlay, { backgroundColor: colors.primary }]}
                    onPress={() => router.push(`/movie/${item.id}`)}
                  >
                    <Text style={{ color: "#fff", fontSize: 9, fontWeight: "500" }}>▶ Trailer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btnInfo, { backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.25)" }]}
                    onPress={() => router.push(`/movie/${item.id}`)}
                  >
                    <Text style={{ color: "#fff", fontSize: 9 }}>More Info</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <PosterGradient
                gradientKey={item.posterGradient}
                emoji={item.posterEmoji}
                style={styles.heroPoster}
                emojiSize={30}
              />
            </LinearGradient>
          )}
        />

        {/* Dots */}
        <View style={[styles.dots, { backgroundColor: colors.surfaceElevated }]}>
          {HERO_MOVIES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === heroIndex ? colors.dotActive : colors.dot },
                i === heroIndex && { width: 14, borderRadius: 3 },
              ]}
            />
          ))}
        </View>

        {/* Stats */}
        <View style={[styles.statsRow, { backgroundColor: colors.statsBg, borderBottomColor: colors.divider }]}>
          {STATS.map((s, i) => (
            <View key={s.label} style={[styles.statItem, i > 0 && { borderLeftColor: colors.statsDivider, borderLeftWidth: 0.5 }]}>
              <Text style={[styles.statNum, { color: colors.statsNum }]}>{s.num}</Text>
              <Text style={[styles.statLabel, { color: colors.statsLabel }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Latest Releases */}
        <View style={[styles.section, { backgroundColor: colors.statsBg }]}>
          <View style={styles.sectionHdr}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Latest Releases</Text>
            <TouchableOpacity onPress={() => router.push("/movies")}>
              <Text style={[styles.sectionLink, { color: colors.primary }]}>View All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {MOVIES.map((m) => (
              <MovieCard key={m.id} movie={m} width={72} posterHeight={96} />
            ))}
          </ScrollView>
        </View>

        {/* Latest News */}
        <View style={[styles.section, { backgroundColor: colors.statsBg, paddingTop: 10 }]}>
          <View style={styles.sectionHdr}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Latest News</Text>
            <TouchableOpacity onPress={() => router.push("/news")}>
              <Text style={[styles.sectionLink, { color: colors.primary }]}>View All →</Text>
            </TouchableOpacity>
          </View>
          {NEWS.slice(0, 3).map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10, gap: 8 },
  logo: { fontSize: 16, fontWeight: "500", letterSpacing: 0.5 },
  searchBar: { flex: 1, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 6 },
  hero: { height: 160, flexDirection: "row", alignItems: "flex-end", padding: 14 },
  heroContent: { flex: 1, paddingBottom: 4 },
  heroBadge: { alignSelf: "flex-start", paddingHorizontal: 7, paddingVertical: 2, borderRadius: 10, marginBottom: 6 },
  heroTitle: { fontSize: 18, fontWeight: "500", lineHeight: 22, marginBottom: 4 },
  heroDate: { fontSize: 9, marginBottom: 5 },
  heroDesc: { fontSize: 9, lineHeight: 14, marginBottom: 8 },
  heroBtns: { flexDirection: "row", gap: 6 },
  btnPlay: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  btnInfo: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, borderWidth: 0.5 },
  heroPoster: { width: 80, height: 110, borderRadius: 10, marginLeft: 8 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 4, paddingVertical: 6 },
  dot: { width: 5, height: 5, borderRadius: 50 },
  statsRow: { flexDirection: "row", paddingVertical: 8, borderBottomWidth: 0.5 },
  statItem: { flex: 1, alignItems: "center" },
  statNum: { fontSize: 13, fontWeight: "500" },
  statLabel: { fontSize: 8, marginTop: 1 },
  section: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 12 },
  sectionHdr: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 13, fontWeight: "500" },
  sectionLink: { fontSize: 9 },
});

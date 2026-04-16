import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NEWS } from "../../data/mockData";
import useTheme from "../../hooks/useTheme";

const TABS = ["Latest", "Box Office", "Reviews", "Blog"];

export default function NewsScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("Latest");

  const featured = NEWS.find((n) => n.featured)!;
  const list = NEWS.filter((n) => !n.featured);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={["top"]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={[styles.title, { color: colors.headerText }]}>Ollywood News</Text>
        <Text style={{ color: colors.textMuted, fontSize: 16 }}>⌕</Text>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.tabsScroll, { backgroundColor: colors.header, borderBottomColor: colors.border }]}
        contentContainerStyle={{ paddingHorizontal: 10 }}
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

      <FlatList
        data={list}
        keyExtractor={(n) => n.id}
        ListHeaderComponent={
          /* Featured */
          <View style={[styles.featured, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
            <LinearGradient
              colors={colors.gradients.featuredBanner}
              style={styles.featImg}
            >
              <Text style={{ fontSize: 32 }}>{featured.emoji}</Text>
            </LinearGradient>
            <Text style={[styles.featTag, { color: colors.primary }]}>
              {featured.tag} · {featured.date}
            </Text>
            <Text style={[styles.featTitle, { color: colors.text }]}>{featured.title}</Text>
            <Text style={[styles.featMeta, { color: colors.textHint }]}>
              {featured.author} · {featured.readTime}
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const gradient = colors.posterGradients[item.gradientKey];
          return (
            <TouchableOpacity
              style={[styles.newsItem, { borderBottomColor: colors.surface }]}
              activeOpacity={0.8}
            >
              <LinearGradient colors={gradient} style={styles.newsThumb}>
                <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={[styles.newsTag, { color: colors.primary }]}>{item.tag}</Text>
                <Text style={[styles.newsTitle, { color: colors.text }]} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={[styles.newsMeta, { color: colors.textHint }]}>
                  {item.date} · {item.readTime}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        style={{ backgroundColor: colors.bg }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingVertical: 12 },
  title: { fontSize: 15, fontWeight: "500" },
  tabsScroll: { flexGrow: 0, borderBottomWidth: 0.5 },
  tab: { paddingHorizontal: 10, paddingVertical: 8, position: "relative" },
  tabIndicator: { position: "absolute", bottom: 0, left: 10, right: 10, height: 2, borderRadius: 1 },
  featured: { padding: 12, borderBottomWidth: 0.5 },
  featImg: { width: "100%", height: 100, borderRadius: 10, marginBottom: 8, alignItems: "center", justifyContent: "center" },
  featTag: { fontSize: 8, marginBottom: 4 },
  featTitle: { fontSize: 13, fontWeight: "500", lineHeight: 18, marginBottom: 4 },
  featMeta: { fontSize: 8 },
  newsItem: { flexDirection: "row", gap: 10, padding: 12, borderBottomWidth: 0.5, alignItems: "flex-start" },
  newsThumb: { width: 60, height: 60, borderRadius: 8, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  newsTag: { fontSize: 8, marginBottom: 2 },
  newsTitle: { fontSize: 11, fontWeight: "500", lineHeight: 15 },
  newsMeta: { fontSize: 8, marginTop: 4 },
});

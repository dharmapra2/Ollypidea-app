import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

export interface ColorScheme {
  // ── Core ──────────────────────────────────────────────────────────────────
  bg: string;
  surface: string;
  surfaceElevated: string; // cards, modals sitting above surface
  text: string;
  textMuted: string;
  textHint: string; // placeholder / disabled
  border: string;
  borderStrong: string;
  shadow: string;

  // ── Brand ─────────────────────────────────────────────────────────────────
  primary: string; // Ollypedia red
  primaryDark: string; // pressed / darker red
  primaryForeground: string; // text on primary bg

  // ── Semantic ──────────────────────────────────────────────────────────────
  success: string;
  successBg: string; // e.g. "Super Hit" badge bg
  successFg: string; // text on successBg

  warning: string;
  warningBg: string;
  warningFg: string;

  danger: string;
  dangerBg: string;
  dangerFg: string;

  info: string;
  infoBg: string; // e.g. "Upcoming" badge bg
  infoFg: string;

  // ── Verdict badges ────────────────────────────────────────────────────────
  verdicts: {
    blockbuster: { bg: string; fg: string };
    superHit: { bg: string; fg: string };
    hit: { bg: string; fg: string };
    upcoming: { bg: string; fg: string };
    released: { bg: string; fg: string };
    flop: { bg: string; fg: string };
  };

  // ── Navigation ────────────────────────────────────────────────────────────
  navBar: string;
  navBarBorder: string;
  navActive: string; // icon + label when selected
  navInactive: string;

  // ── Header / Top bar ──────────────────────────────────────────────────────
  header: string;
  headerBorder: string;
  headerText: string;

  // ── Hero / Banner ─────────────────────────────────────────────────────────
  heroBg: string; // fallback bg behind poster art
  heroOverlay: string; // rgba scrim over hero image
  heroTitle: string;
  heroSubtitle: string;

  // ── Cards ─────────────────────────────────────────────────────────────────
  card: string;
  cardBorder: string;
  cardPressedOverlay: string; // ripple / pressed state

  // ── Inputs ────────────────────────────────────────────────────────────────
  input: string;
  inputBorder: string;
  inputPlaceholder: string;
  editInput: string;

  // ── Tabs ──────────────────────────────────────────────────────────────────
  tabActive: string;
  tabActiveFg: string;
  tabInactiveFg: string;
  tabIndicator: string;

  // ── Filter chips ──────────────────────────────────────────────────────────
  chipActive: string;
  chipActiveFg: string;
  chipInactive: string;
  chipInactiveFg: string;
  chipBorder: string;

  // ── Player (Songs) ────────────────────────────────────────────────────────
  player: string;
  playerBorder: string;
  playerControl: string; // prev / next icons
  playerPlayBtn: string;
  playerPlayBtnFg: string;

  // ── Stats bar ─────────────────────────────────────────────────────────────
  statsBg: string;
  statsNum: string;
  statsLabel: string;
  statsDivider: string;

  // ── Poster placeholder gradients (when no image) ──────────────────────────
  posterGradients: {
    blue: [string, string];
    red: [string, string];
    green: [string, string];
    amber: [string, string];
    purple: [string, string];
    teal: [string, string];
  };

  // ── General gradients ─────────────────────────────────────────────────────
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
    hero: [string, string]; // full-bleed hero scrim
    featuredBanner: [string, string];
  };

  // ── Misc ──────────────────────────────────────────────────────────────────
  divider: string;
  skeleton: string; // loading placeholder
  overlay: string; // modal backdrop
  dot: string; // carousel inactive dot
  dotActive: string;

  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
  // Core
  bg: "#f8fafc",
  surface: "#ffffff",
  surfaceElevated: "#ffffff",
  text: "#1e293b",
  textMuted: "#64748b",
  textHint: "#94a3b8",
  border: "#e2e8f0",
  borderStrong: "#cbd5e1",
  shadow: "#000000",

  // Brand
  primary: "#e74c3c",
  primaryDark: "#c0392b",
  primaryForeground: "#ffffff",

  // Semantic
  success: "#10b981",
  successBg: "#dcfce7",
  successFg: "#166534",

  warning: "#f59e0b",
  warningBg: "#fef3c7",
  warningFg: "#92400e",

  danger: "#ef4444",
  dangerBg: "#fee2e2",
  dangerFg: "#991b1b",

  info: "#3b82f6",
  infoBg: "#dbeafe",
  infoFg: "#1e40af",

  // Verdict badges
  verdicts: {
    blockbuster: { bg: "#fee2e2", fg: "#991b1b" },
    superHit: { bg: "#dcfce7", fg: "#166534" },
    hit: { bg: "#d1fae5", fg: "#065f46" },
    upcoming: { bg: "#dbeafe", fg: "#1e40af" },
    released: { bg: "#f1f5f9", fg: "#475569" },
    flop: { bg: "#f1f5f9", fg: "#6b7280" },
  },

  // Navigation
  navBar: "#ffffff",
  navBarBorder: "#e2e8f0",
  navActive: "#e74c3c",
  navInactive: "#94a3b8",

  // Header
  header: "#ffffff",
  headerBorder: "#e2e8f0",
  headerText: "#1e293b",

  // Hero
  heroBg: "#1e293b",
  heroOverlay: "rgba(0,0,0,0.35)",
  heroTitle: "#ffffff",
  heroSubtitle: "#cbd5e1",

  // Cards
  card: "#ffffff",
  cardBorder: "#e2e8f0",
  cardPressedOverlay: "rgba(0,0,0,0.05)",

  // Inputs
  input: "#ffffff",
  inputBorder: "#e2e8f0",
  inputPlaceholder: "#94a3b8",
  editInput: "#f8fafc",

  // Tabs
  tabActive: "#ffffff",
  tabActiveFg: "#e74c3c",
  tabInactiveFg: "#94a3b8",
  tabIndicator: "#e74c3c",

  // Chips
  chipActive: "#e74c3c",
  chipActiveFg: "#ffffff",
  chipInactive: "#ffffff",
  chipInactiveFg: "#64748b",
  chipBorder: "#e2e8f0",

  // Player
  player: "#ffffff",
  playerBorder: "#e2e8f0",
  playerControl: "#64748b",
  playerPlayBtn: "#e74c3c",
  playerPlayBtnFg: "#ffffff",

  // Stats bar
  statsBg: "#f8fafc",
  statsNum: "#e74c3c",
  statsLabel: "#94a3b8",
  statsDivider: "#e2e8f0",

  // Poster gradients
  posterGradients: {
    blue: ["#3b82f6", "#1d4ed8"],
    red: ["#ef4444", "#b91c1c"],
    green: ["#10b981", "#047857"],
    amber: ["#f59e0b", "#b45309"],
    purple: ["#8b5cf6", "#6d28d9"],
    teal: ["#14b8a6", "#0f766e"],
  },

  // Gradients
  gradients: {
    background: ["#f8fafc", "#e2e8f0"],
    surface: ["#ffffff", "#f8fafc"],
    primary: ["#e74c3c", "#c0392b"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#9ca3af", "#6b7280"],
    empty: ["#f3f4f6", "#e5e7eb"],
    hero: ["rgba(15,15,30,0.9)", "rgba(15,15,30,0.2)"],
    featuredBanner: ["#1e293b", "#0f172a"],
  },

  // Misc
  divider: "#e2e8f0",
  skeleton: "#e2e8f0",
  overlay: "rgba(0,0,0,0.5)",
  dot: "#cbd5e1",
  dotActive: "#e74c3c",

  statusBarStyle: "dark-content",
};

const darkColors: ColorScheme = {
  // Core
  bg: "#0f0f1e",
  surface: "#1a1a2e",
  surfaceElevated: "#16213e",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  textHint: "#475569",
  border: "#2a2a4e",
  borderStrong: "#334155",
  shadow: "#000000",

  // Brand
  primary: "#e74c3c",
  primaryDark: "#c0392b",
  primaryForeground: "#ffffff",

  // Semantic
  success: "#34d399",
  successBg: "#064e3b",
  successFg: "#6ee7b7",

  warning: "#fbbf24",
  warningBg: "#451a03",
  warningFg: "#fcd34d",

  danger: "#f87171",
  dangerBg: "#450a0a",
  dangerFg: "#fca5a5",

  info: "#60a5fa",
  infoBg: "#1e3a5f",
  infoFg: "#93c5fd",

  // Verdict badges — cinema dark palette
  verdicts: {
    blockbuster: { bg: "#7e1a0a", fg: "#f57c6b" },
    superHit: { bg: "#1a6e2e", fg: "#5dba7c" },
    hit: { bg: "#145a27", fg: "#4ade80" },
    upcoming: { bg: "#1a3468", fg: "#6fa3e8" },
    released: { bg: "#2c2c2c", fg: "#9ca3af" },
    flop: { bg: "#1c1c1c", fg: "#6b7280" },
  },

  // Navigation
  navBar: "#1a1a2e",
  navBarBorder: "#2a2a4e",
  navActive: "#e74c3c",
  navInactive: "#4b5563",

  // Header
  header: "#1a1a2e",
  headerBorder: "#2a2a4e",
  headerText: "#f1f5f9",

  // Hero
  heroBg: "#1a1a2e",
  heroOverlay: "rgba(0,0,0,0.45)",
  heroTitle: "#ffffff",
  heroSubtitle: "#94a3b8",

  // Cards
  card: "#1a1a2e",
  cardBorder: "#2a2a4e",
  cardPressedOverlay: "rgba(255,255,255,0.05)",

  // Inputs
  input: "#0f0f1e",
  inputBorder: "#2a2a4e",
  inputPlaceholder: "#4b5563",
  editInput: "#0f172a",

  // Tabs
  tabActive: "#1a1a2e",
  tabActiveFg: "#e74c3c",
  tabInactiveFg: "#4b5563",
  tabIndicator: "#e74c3c",

  // Chips
  chipActive: "#e74c3c",
  chipActiveFg: "#ffffff",
  chipInactive: "#1a1a2e",
  chipInactiveFg: "#64748b",
  chipBorder: "#333333",

  // Player
  player: "#1a1a2e",
  playerBorder: "#2a2a4e",
  playerControl: "#6b7280",
  playerPlayBtn: "#e74c3c",
  playerPlayBtnFg: "#ffffff",

  // Stats bar
  statsBg: "#0f0f1e",
  statsNum: "#e74c3c",
  statsLabel: "#4b5563",
  statsDivider: "#222222",

  // Poster gradients
  posterGradients: {
    blue: ["#2c3e7e", "#1a2555"],
    red: ["#7e2c2c", "#551a1a"],
    green: ["#2c7e4a", "#1a5530"],
    amber: ["#7e6b2c", "#55471a"],
    purple: ["#5a2c7e", "#3a1a55"],
    teal: ["#2c6b7e", "#1a4755"],
  },

  // Gradients
  gradients: {
    background: ["#0f0f1e", "#1a1a2e"],
    surface: ["#1a1a2e", "#2a2a4e"],
    primary: ["#e74c3c", "#c0392b"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#374151", "#4b5563"],
    empty: ["#374151", "#4b5563"],
    hero: ["rgba(26,26,46,0.95)", "rgba(26,26,46,0.2)"],
    featuredBanner: ["#2d0a0a", "#1a1a2e"],
  },

  // Misc
  divider: "#222222",
  skeleton: "#1e293b",
  overlay: "rgba(0,0,0,0.75)",
  dot: "#333333",
  dotActive: "#e74c3c",

  statusBarStyle: "light-content",
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // default dark for cinema feel

  useEffect(() => {
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value !== null) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default useTheme;

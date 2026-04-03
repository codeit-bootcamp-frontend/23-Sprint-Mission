const color = {
  blue: {
    primary: "#3692FF",
    hover: "#1967D6",
    focus: "#1251AA",
  },
  red: "#F74747",
  white: "#FFF",
  black: "#000",
  gray: {
    900: "#111827",
    800: "#1F2937",
    700: "#374151",
    600: "#4b5563",
    500: "#6b7280",
    400: "#9ca3af",
    200: "#e5e7eb",
    100: "#f3f4f6",
    50: "#f9fafb",
  },
};

const mediaQuery = {
  mobile: "screen and (max-width: 767px)",
  tablet: "screen and (min-width: 768px)",
  desktop: "screen and (min-width: 1280px)",
};

const theme = {
  color,
  mediaQuery,
};

export default theme;
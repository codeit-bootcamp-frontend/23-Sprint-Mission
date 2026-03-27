import type { DefaultTheme } from "styled-components";

// 프로젝트 공통 테마 설정
const theme: DefaultTheme = {
  colors: {
    // 판다마켓 컬러
    blue: {
      primary: "#3692FF", // 기본 버튼
      hover: "#1967D6",
      active: "#1251AA",
    },

    // 기본 컬러
    white: "#FFFFFF",
    black: "#1F2937",

    // 그레이 계열
    gray: {
      text: "#9CA3AF", // 보조 텍스트
      bg: "#F3F4F6", // input / 버튼 배경
      bgLight: "#F9FAFB", // 페이지 배경
    },
  },

  // 반응형 브레이크포인트
  mediaQuery: {
    tablet: "screen and (min-width: 768px)",
    desktop: "screen and (min-width: 1280px)",
  },
};

export default theme;
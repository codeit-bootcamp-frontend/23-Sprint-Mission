import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      blue: {
        primary: string;
        hover: string;
        active: string;
      };
      white: string;
      black: string;
      gray: {
        text: string;
        bg: string;
        bgLight: string;
      };
    };
    mediaQuery: {
      tablet: string;
      desktop: string;
    };
  }
}
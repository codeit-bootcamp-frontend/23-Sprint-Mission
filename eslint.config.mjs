import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import importXPlugin from "eslint-plugin-import-x";
import pluginQuery from "@tanstack/eslint-plugin-query";

const eslintConfig = defineConfig([
  // -----------------------------------------------------
  // 1. 기본 제공되는 ESLint 설정 및 Next.js 권장 설정 불러오기
  // -----------------------------------------------------
  // Base ESLint recommended rules (가장 기본적인 자바스크립트 권장 규칙 적용)
  js.configs.recommended,

  // Next.js 핵심 Web Vitals 권장 규칙 적용
  ...nextVitals,
  // Next.js TypeScript 권장 규칙 적용
  ...nextTs,
  // tanstack-query plugin 적용
  ...pluginQuery.configs["flat/recommended"],

  // -----------------------------------------------------
  // 2. 글로벌 린트 검사 제외 경로 설정 (globalIgnores)
  // -----------------------------------------------------
  globalIgnores([
    // Next.js 빌드 및 출력 폴더 무시
    ".next/**",
    "out/**",
    "build/**",
    // Next.js 자동 생성 타입 선언 파일 무시
    "next-env.d.ts",
    // 패키지 모듈 및 빌드 결과물 디렉토리 무시
    "node_modules/**",
    "dist/**",
  ]),

  // ==============================================================
  // 3. TypeScript 및 TSX 파일에 대한 메인 설정
  // ==============================================================
  {
    // 검사할 대상 파일 확장자 (ts, tsx)
    files: ["**/*.{ts,tsx}"],
    plugins: {
      // TypeScript 전용 린트 규칙 플러그인
      "@typescript-eslint": typescriptEslint,
      // import 구문 순서 정렬 및 경로 검증을 위한 확장 플러그인
      "import-x": importXPlugin,
      // Prettier 포맷팅을 ESLint 오류/경고로 표시하기 위한 플러그인
      prettier,
    },
    languageOptions: {
      // TypeScript 코드를 파싱하기 위한 파서 지정
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest", // 최신 ECMAScript 문법 허용
        sourceType: "module", // ES 모듈 시스템(import/export) 사용
        ecmaFeatures: {
          jsx: true, // JSX 문법 허용
        },
        project: "./tsconfig.json", // 타입 기반 린팅을 위한 tsconfig 경로 제공
      },
    },
    settings: {
      // import-x 플러그인이 모듈 경로를 해석(Resolve)하는 방법 설정
      "import-x/resolver": {
        typescript: {
          alwaysTryTypes: true, // 항상 @types/ 패키지의 타입 선언을 찾도록 시도
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"], // 해석할 파일 확장자 목록
        },
      },
    },
    rules: {
      // -----------------------------
      // [A] Prettier 통합 규칙
      // -----------------------------
      // Prettier 규칙에 어긋나는 코드 스타일을 ESLint '에러'로 표시
      "prettier/prettier": "error",
      // Prettier와 충돌할 수 있는 ESLint 포맷팅 관련 기본 규칙들을 일괄 비활성화
      ...prettierConfig.rules,

      // -----------------------------
      // [B] React 관련 규칙 (Airbnb 스타일 참고)
      // -----------------------------
      // prop-types를 통한 타입 검사 비활성화 (TypeScript로 이미 타입을 검증하므로 불필요)
      "react/prop-types": "off",
      // JSX 문법을 사용할 수 있는 파일 확장자 제한 (.tsx, .jsx 파일만 허용)
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".tsx", ".jsx"] },
      ],
      // props spreading 규칙
      "react/jsx-props-no-spreading": [
        "error",
        // html 요소의 경우 props spreading 허용, custom 컴포넌트의 경우 props spreading 금지
        { html: "ignore", custom: "enforce" },
      ],
      // 선택적 prop에 대한 기본값 지정(defaultProps) 강제 비활성화 (TypeScript 기능으로 대체)
      "react/require-default-props": "off",
      // 컴포넌트 선언 방식 강제:
      // 이름이 있는 컴포넌트(일반 컴포넌트)는 함수 선언식(function declaration) 권장
      // 이름이 없는 컴포넌트(콜백 내부 등)는 화살표 함수(arrow function) 권장
      "react/function-component-definition": [
        "warn",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],

      // -----------------------------
      // [C] Import 관련 규칙 (import-x 플러그인)
      // -----------------------------
      // import 시 특정 확장자(js, jsx, ts, tsx) 생략 강제 (단, 패키지 import는 예외)
      "import-x/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      // default export 사용 전면 금지 (이름 없는 export를 방지해 리팩토링 및 검색 용이성 확보)
      "import-x/no-default-export": "error",
      // import 구문의 정렬 순서 및 그룹화 규칙 강제
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin", // 내장 모듈 (예: fs, path 등)
            "external", // 외부 설치 패키지 (예: react, next 등)
            "internal", // 내부 절대 경로 모듈 (예: @/components)
            "parent", // 부모 디렉토리 모듈 (예: ../)
            "sibling", // 형제 디렉토리 모듈 (예: ./)
            "index", // 인덱스 파일 모듈 (예: ./index)
          ],
          "newlines-between": "always", // 각 그룹 사이에 빈 줄 추가
          alphabetize: {
            order: "asc", // 알파벳 오름차순 정렬
            caseInsensitive: true, // 대소문자 구분 없이 정렬
          },
          // 할당하지 않는 import (예: global.css 등)에 대해서도 정렬
          warnOnUnassignedImports: true,
        },
      ],

      // -----------------------------
      // [D] TypeScript 전용 규칙
      // -----------------------------
      // 선언했지만 사용하지 않는 변수가 있을 경우 에러 발생
      // (단, '_'로 시작하는 매개변수나 변수는 의도적으로 무시하는 것으로 간주하여 예외)
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // 함수의 반환 타입 명시 규칙 비활성화 (타입 추론 기능에 의존)
      "@typescript-eslint/explicit-function-return-type": "off",
      // 외부로 내보내는 함수의 타입 명시 강제 규칙 비활성화
      "@typescript-eslint/explicit-module-boundary-types": "off",
      // 'any' 타입 사용 시 에러 발생 (구체적인 타입을 작성하도록 강제)
      "@typescript-eslint/no-explicit-any": "error",

      // -----------------------------
      // [E] 일반 JavaScript 규칙
      // -----------------------------
      // console.* 사용 시 경고 발생 (단, warn과 error 로깅은 허용)
      // 배포 전 불필요한 console.log를 찾아 지우기 위함
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // 값이 재할당되지 않는 변수는 무조건 const 사용 강제
      "prefer-const": "error",
      // var 키워드 사용 전면 금지 (let, const 사용 강제)
      "no-var": "error",
    },
  },

  // ==============================================================
  // 4. 일반 JavaScript 및 JSX 파일에 대한 부분 설정
  // ==============================================================
  // (TS/TSX가 아닌 순수 JS 파일이 있을 경우 적용되는 설정)
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      "import-x": importXPlugin,
      prettier,
    },
    rules: {
      "prettier/prettier": "error", // Prettier 에러 표시
      ...prettierConfig.rules, // Prettier 충돌 규칙 끄기
      // JSX 구문은 .jsx 파일에서만 사용 가능하도록 강제
      "react/jsx-filename-extension": ["error", { extensions: [".jsx"] }],
      // import 시 파일 확장자(js, jsx) 명시 금지
      "import-x/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
        },
      ],
      // default export 사용 금지
      "import-x/no-default-export": "error",
      // 불필요한 console.log 사용 경고
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  // ==============================================================
  // 5. Next.js 앱 라우터 전용 예외 처리 (매우 중요)
  // ==============================================================
  // Next.js App 라우터의 핵심 파일들은 프레임워크의 규칙상 반드시 default export가 필요합니다.
  {
    files: [
      // 페이지, 레이아웃, 에러/로딩 처리 등 App Router 특수 파일들
      "src/app/**/{page,layout,not-found,robots,sitemap,template,error,loading,global-error,default}.tsx",
      // 미들웨어
      "src/middleware.ts",
      // 설정 파일들
      "**/*.config.{js,mjs,ts}",
    ],
    rules: {
      // 위에서 설정한 default export 금지 규칙을 이 파일들에 한해서만 "off" 하여 에러를 방지합니다.
      "import-x/no-default-export": "off",
    },
  },
]);

export default eslintConfig;

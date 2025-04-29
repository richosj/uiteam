# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 프로젝트 구조

이 프로젝트는 React와 Vite를 사용하여 구축된 웹 애플리케이션입니다. 아래는 주요 구조에 대한 설명입니다.

## 라우팅 구조

이 애플리케이션은 다음과 같은 라우팅 구조를 가지고 있습니다:

### 공개 라우트 (Public Routes)
- `/` - 홈페이지
- `/projects` - 프로젝트 목록 페이지
- `/projects/:id` - 프로젝트 상세 페이지
- `/internal-projects/:id` - 내부 프로젝트 상세 페이지
- `/team` - 팀 소개 페이지
- `/contact` - 연락처 페이지

### 관리자 라우트 (Admin Routes)
- `/admin/login` - 관리자 로그인 페이지
- `/admin` - 관리자 대시보드
- `/admin/internal-projects` - 내부 프로젝트 관리
- `/admin/inquiries` - 문의 관리
- `/admin/inquiries/:id` - 문의 상세 보기
- `/admin/projects` - 프로젝트 관리
- `/admin/projects/new` - 새 프로젝트 생성
- `/admin/projects/:id` - 프로젝트 상세 관리

## 주요 컴포넌트

- `ErrorBoundary` - 애플리케이션 전체의 오류를 처리하는 컴포넌트
- `AuthProvider` - 인증 상태를 관리하는 컨텍스트 제공자
- `AdminRoute` - 관리자 권한이 필요한 라우트를 보호하는 컴포넌트
- `Layout` - 공개 페이지의 레이아웃 컴포넌트
- `AdminLayout` - 관리자 페이지의 레이아웃 컴포넌트

## 성능 최적화

모든 페이지 컴포넌트는 React의 `lazy`와 `Suspense`를 사용하여 코드 스플리팅이 적용되어 있습니다. 이를 통해 초기 로딩 시간을 단축하고 필요한 컴포넌트만 로드할 수 있습니다.

## 프로젝트 구조 설명

### 📁 src/routes
- **목적**: 라우팅 로직의 분리와 코드 스플리팅
- **구현 이유**: 
  - 라우트 관련 코드를 분리하여 유지보수성 향상
  - `publicRoutes.jsx`와 `adminRoutes.jsx`로 분리하여 권한별 관리 용이
  - React.lazy()를 사용한 코드 스플리팅으로 초기 로딩 성능 개선

### 📁 src/contexts
- **목적**: 전역 상태 관리
- **구현 이유**:
  - `AuthContext`: 인증 관련 상태와 로직을 중앙 집중화
  - 로그인/로그아웃 상태를 전역적으로 관리
  - 사용자 정보와 권한을 컴포넌트 트리 전체에서 접근 가능

### 📁 src/components
- **ErrorBoundary**: 
  - React의 에러 경계 구현
  - 예기치 않은 에러 발생 시 폴백 UI 제공
  - 개발 환경에서 상세한 에러 정보 표시
- **AdminRoute**: 
  - 관리자 페이지 접근 제어
  - 인증되지 않은 사용자 리다이렉션

### 📁 src/utils
- **목적**: 재사용 가능한 유틸리티 함수 모음
- **api.js**: 
  - API 호출 로직 중앙화
  - 에러 처리 표준화
  - 인증 토큰 자동 처리

### 📁 src/config
- **목적**: 환경 설정 중앙화
- **구현 이유**:
  - API 엔드포인트, 인증 설정 등 구성 정보 관리
  - 환경별(개발/프로덕션) 설정 분리
  - 설정 값의 재사용성과 유지보수성 향상

## 주요 기능 구현

### 인증 시스템
- JWT 기반 인증 구현
- 로그인 상태 전역 관리
- 권한 기반 라우트 보호

### 코드 스플리팅
- React.lazy()와 Suspense를 사용한 동적 임포트
- 초기 번들 크기 최적화
- 페이지별 독립적 로딩

### 에러 처리
- ErrorBoundary를 통한 전역 에러 처리
- API 에러 표준화
- 사용자 친화적인 에러 메시지

### API 통신
- 중앙화된 API 클라이언트
- 인터셉터를 통한 요청/응답 처리
- 토큰 기반 인증 자동화

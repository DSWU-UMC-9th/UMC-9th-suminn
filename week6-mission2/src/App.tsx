// src/App.tsx
import "./App.css";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import HomePage from "./page/HomePage";
import LpDetailPage from "./page/LpDetailPage";
import MyPage from "./page/MyPage";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import GoogleLoginRedirectionPage from "./page/GoogleLoginRedirectPage";
import NotFoundPage from "./page/NotFoundPage";

import { AuthProvider } from "./context/AuthContext";

// 단일 라우터 트리로 정리 (HomeLayout 아래에 공개/보호 라우트 함께 배치)
const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // 🔐 보호 라우트: 비로그인 시 ProtectedLayout에서 모달 → /login 이동
      {
        element: <ProtectedLayout />,
        children: [
          { index: true, element: <HomePage /> },                 // /
          { path: "lps/:lpid", element: <LpDetailPage /> },       // /lps/:lpid
          { path: "my", element: <MyPage /> },                    // /my
        ],
      },

      // 🔓 공개 라우트
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectionPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;

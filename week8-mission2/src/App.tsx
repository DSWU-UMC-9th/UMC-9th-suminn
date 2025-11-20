// src/App.tsx
import "./App.css";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomeLayout from "./layouts/HomeLayout";

import HomePage from "./page/HomePage";
import LpDetailPage from "./page/LpDetailPage";
import MyPage from "./page/MyPage";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import GoogleLoginRedirectionPage from "./page/GoogleLoginRedirectPage";
import NotFoundPage from "./page/NotFoundPage";
import LpCreatePage from "./page/LpCreatePage";
import ThrottlePage from "./page/ThrottlePage";

import { AuthProvider } from "./context/AuthContext";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },                 // /
      { path: "lps/:lpId", element: <LpDetailPage /> },      // /lps/:lpid
      { path: "my", element: <MyPage /> },                    // /my
      { path: "login", element: <LoginPage /> },              // /login
      { path: "signup", element: <SignUpPage /> },            // /signup
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectionPage /> }, // /v1/auth/google/callback
      { path: "create", element: <LpCreatePage /> },
      { path: "throttle", element: <ThrottlePage /> },


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

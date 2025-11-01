import './App.css'
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import HomePage from "./page/HomePage";
import NotFoundPage from "./page/NotFoundPage";
import LoginPage from './page/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignUpPage from './page/SignUpPage';
import MyPage from './page/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';

//publicRoutes : 인증없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
    ],
  }
];

//protectedRoutes:인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'my', 
        element: <MyPage />
      }
    ],
  }
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

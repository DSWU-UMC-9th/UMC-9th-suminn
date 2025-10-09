import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./page/HomePage";
import NotFoundPage from "./page/NotFoundPage";
import LoginPage from './page/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignUpPage from './page/SignUpPage';
import MyPage from './page/MyPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <LoginPage />},
      {path: 'signup', element: <SignUpPage />},
      {path: 'my', element: <MyPage />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;

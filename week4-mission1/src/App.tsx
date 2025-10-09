import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './pages/not-found';
import MoviePage from './pages/MoviePage';
import RootLayout from './layout/root-layout';
import MovieDatailPage from './pages/MovieDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDatailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
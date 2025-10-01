import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './pages/not-found';
import PopularMovie from './pages/PopularMovie';
import RootLayout from './layout/root-layout';
import NowPlaying from './pages/NowPlayingMovie';
import TopRated from './pages/TopRatedMovie';
import Upcoming from './pages/UpcomingMovie';
import MovieDatailPage from './pages/MovieDatail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [

      {
        path: 'popular',
        element: <PopularMovie />,
      },
      {
        path: 'now-playing',
        element: <NowPlaying/>,
      },
      {
        path: 'top-rated',
        element: <TopRated/>,
      },
      {
        path: 'upcoming',
        element: <Upcoming/>,
      },
      {
        path: 'popular/:movieId',
        element: <MovieDatailPage />,
      },
      {
        path: 'now-playing/:movieId',
        element: <MovieDatailPage />,
      },
      {
        path: 'top-rated/:movieId',
        element: <MovieDatailPage />,
      },
      {
        path: 'upcoming/:movieId',
        element: <MovieDatailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';
import MovieCard from '../components/MovieCard';



const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  console.log(movies); // 영화 데이터 체크
  
  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2 ">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
        
      ))}
    </ul>
  );
};

export default MoviesPage;
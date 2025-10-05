import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';



const NowPlaying = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1);

  console.log(movies); // 영화 데이터 체크
  
  useEffect(() => {
    const fetchMovies = async () => {

      setIsPending(true);

      try {
          const { data } = await axios.get<MovieResponse>(
            `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          );
          setMovies(data.results);
        }
        catch {
          setIsError(true);
        }
        finally {
          setIsPending(false);
        }
      };

    fetchMovies();
  }, [page]);

  if (isError) {
    return (
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
      </div>
    )
  }

  return (
    <>
      <div className='flex items-center justify-center gap-6 mt-5 pb-10'>
        <button 
        className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
        cursor-pointer disabled:cursor-not-allowed'
        disabled={page === 1}
        onClick={() => setPage((prev) => prev-1)}
        >{`<`}</button>
        <span>{page} 페이지</span>
        <button 
        className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
        cursor-pointer disabled:cursor-not-allowed'
        onClick={() => setPage((prev) => prev+1)}
        >{`>`}</button>
      </div>

      {isPending && (
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <ul className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2 ">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />          
        ))}
      </ul>
      )}
    </>
  );
};

export default NowPlaying;
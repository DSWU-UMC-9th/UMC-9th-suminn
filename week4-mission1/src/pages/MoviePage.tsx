import { useState } from 'react';
import type { Movie, MovieResponse} from '../types/movie';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';



const MoviePage = () => {

  const [page, setPage] = useState(1);
  const { category } = useParams<{category: string;}>();


  const url = category
    ? `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`
    : null;

  const { data, loading, error } = useCustomFetch(url);


  const movies: Movie[] = (data as MovieResponse)?.results ?? [];

  if (error) {
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
        hover:bg-[#7d3d91] transition-all duration-200 disabled:bg-gray-300
        cursor-pointer disabled:cursor-not-allowed'
        disabled={page === 1}
        onClick={() => setPage((prev) => prev-1)}
        >{`<`}</button>
        <span>{page} 페이지</span>
        <button 
        className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#7d3d91] transition-all duration-200 disabled:bg-gray-300
        cursor-pointer disabled:cursor-not-allowed'
        onClick={() => setPage((prev) => prev+1)}
        >{`>`}</button>
      </div>

      {loading && (
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}

      {!loading && (
        <ul className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2 ">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />          
        ))}
      </ul>
      )}
    </>
  );
};

export default MoviePage;
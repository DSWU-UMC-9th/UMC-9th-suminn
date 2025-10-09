import { useState, useEffect } from "react";
import type { MovieResponse, MovieDetails, CreditsResponse } from "../types/movie";

type FetchData = MovieResponse | MovieDetails | CreditsResponse | null;

export default function useCustomFetch(url: string | null) {

    const [data, setData] = useState<FetchData>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {

        if (!url) {
            setData(null);
            setLoading(false);
            setError(false);
            return;
          }
        
      const fetchData = async () => {
        try {
            setLoading(true);
            setError(false);

          const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });

        const result = await response.json();
          setData(result);
        } catch {
          setError(true); 
        } finally {
            setLoading(false);
        }
      };
      fetchData();
    }, [url]);

    return { data, loading, error };

}

export function useMovieDetails(movieId?: string) {
    const url = movieId
      ? `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
      : null;
  
    const { data, loading, error } = useCustomFetch(url);
    return { details: (data as MovieDetails) ?? null, loading, error };
  }
  

  export function useMovieCredits(movieId?: string) {
    const url = movieId
      ? `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`
      : null;
  
    const { data, loading, error } = useCustomFetch(url);
    return { credits: (data as CreditsResponse) ?? null, loading, error };
  }
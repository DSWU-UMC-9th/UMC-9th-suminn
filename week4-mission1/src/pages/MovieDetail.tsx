// src/pages/MovieDetailPage.tsx
import { useParams, Link } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useMovieDetails, useMovieCredits } from '../hooks/useCustomFetch';

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  
  const { details, loading: loadingDetails, error: errorDetails } = useMovieDetails(movieId);
  const { credits, loading: loadingCredits, error: errorCredits } = useMovieCredits(movieId);

  const loading = loadingDetails || loadingCredits;
  const error   = errorDetails   || errorCredits;


  if (loading) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  // 에러
  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        <p className="text-red-500 text-lg">상세 정보를 불러오지 못했습니다.</p>
        <Link to="/" className="inline-block mt-6 px-4 py-2 rounded bg-gray-800 text-white">
          홈으로
        </Link>
      </div>
    );
  }

  if (!details) return null;

  const poster = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : '/no-poster.png';


  const directors = credits?.crew?.filter((c) => c.job === 'Director') ?? [];

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-10">
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow p-6">
        <img
          src={poster}
          alt={details.title}
          className="w-full md:w-120 max-h-[900px] rounded-xl object-contain"
        />

        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">{details.title}</h1>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-700">
            {details.release_date && <span>개봉일: {details.release_date}</span>}
            <span>· 평점: {details.vote_average.toFixed(1)}</span>
            {details.runtime != null && <span>· 러닝타임: {details.runtime}분</span>}
          </div>

          {details.overview && (
            <p className="mt-4 text-gray-800 leading-relaxed whitespace-pre-line">
              {details.overview}
            </p>
          )}

          {/*감독*/}
          {directors.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">감독</h2>
              <div className="flex gap-4">
                {directors.map((d) => (
                  <div key={d.id} className="flex items-center gap-3">
                    <img
                      src={
                        d.profile_path
                          ? `https://image.tmdb.org/t/p/w200${d.profile_path}`
                          : '/no-profile.png'
                      }
                      alt={d.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <div className="font-medium">{d.name}</div>
                      <div className="text-gray-500">{d.job}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 출연진 */}
          {credits?.cast?.length ? (
            <div className="mt-10">
              <h2 className="text-lg font-bold mb-3">출연</h2>
              <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {credits.cast.slice(0, 12).map((c) => (
                  <li key={c.id} className="text-center">
                    <img
                      src={
                        c.profile_path
                          ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                          : '/no-profile.png'
                      }
                      alt={c.name}
                      className="w-full aspect-[2/3] object-cover rounded-lg shadow"
                    />
                    <div className="mt-2 text-sm font-medium truncate">{c.name}</div>
                    {c.character && (
                      <div className="text-xs text-gray-500 truncate">as {c.character}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

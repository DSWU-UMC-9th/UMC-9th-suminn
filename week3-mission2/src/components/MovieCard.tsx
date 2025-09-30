import { useNavigate } from 'react-router-dom';
import { type Movie } from '../types/movie';

const IMG_BASE = 'https://image.tmdb.org/t/p';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {

  const navigate = useNavigate();

    return (
        <li
        className="relative aspect-[2/3] rounded-2xl overflow-hidden group cursor-pointer"
      onClick={() => navigate(`${movie.id}`)}
      >
        <img
          src={`${IMG_BASE}/w500${movie.poster_path}`}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover  group-hover:blur-sm"
        />
      
        <div className="absolute inset-0 bg-black/30 text-white flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100">
          <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
          <p className="text-sm line-clamp-5">{movie.overview}</p>
        </div>
      </li>
    );
}
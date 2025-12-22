import type { Movie } from "../types/movie";

interface ModalProps {
  movie: Movie;
  setShowModal: (show: boolean) => void;
}

const Modal = ({ movie, setShowModal }: ModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const handleSearch = (title: string) => {
    window.open(`https://www.imdb.com/find?q=${encodeURIComponent(title)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-1 flex justify-center items-center">
      <div className="flex flex-col max-w-[800px] w-full h-max">
        <div className="w-full relative">
          <img
            className="w-full h-full object-cover rounded-sm"
            src={`${imageBaseUrl}${movie.backdrop_path}`}
            alt={`${movie.title}`}
          />
          <div className="absolute bottom-4 left-4 font-bold text-white text-2xl">
            <p>{movie.title}</p>
          </div>
        </div>

        <div className="flex gap-5 bg-white p-5 w-full rounded-b-sm">
          <div className="w-[250px] h-[350px] whitespace-nowrap">
            <img
              className="w-full h-full object-cover rounded-md"
              src={`${imageBaseUrl}${movie.poster_path}`}
            />
          </div>

          <div className="flex flex-1 flex-col gap-5">
            <div className="flex gap-5 items-center">
              <p className="text-purple-500 font-bold text-lg">
                {movie.vote_average.toFixed(1)}
              </p>
              <p className="text-gray-400">{movie.vote_count.toLocaleString()}평가</p>
            </div>

            <div className="text-center">
              <p className="font-bold">개봉일</p>
              <p>{movie.release_date}</p>
            </div>

            <div className="text-center">
              <p className="font-bold">인기도</p>
              <div className="w-full h-3 bg-gray-300 rounded-2xl">
                <div
                  style={{ width: `${movie.popularity}%` }}
                  className="h-3 bg-purple-500 rounded-2xl"
                ></div>
              </div>
            </div>

            <div>
              <p className="text-center font-bold">줄거리</p>
              <p>{movie.overview}</p>
            </div>

            <div className="flex gap-4 flex-1 self-start items-end">
              <button
                onClick={() => handleSearch(movie.title)}
                className="bg-purple-500 text-white p-2 rounded-md cursor-pointer"
              >
                IMDB에서 검색
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="border border-purple-500 p-2 text-purple-500 rounded-md cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
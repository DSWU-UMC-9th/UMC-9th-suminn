import { memo, useState } from "react";
import type { Language, MovieFilters } from "../types/movie";
import Input from "./Input";
import SelectBox from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  console.log("render");

  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>("ko-KR");

  const handleSubmit = () => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };

    console.log(filters);

    onChange(filters);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full"
    >
      <div className="transform space-y-6 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl w-full mb-5">
        <div className="flex flex-col flex-wrap gap-6">
          <div className="min-w-[450px] flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              영화 제목
              <Input value={query} onChange={setQuery} />
            </label>
          </div>

          <div className="flex gap-2 itmes-center justify-center">
            <div className="w-full flex-1">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ⚙️ 옵션
              </label>
              <SelectBox
                checked={includeAdult}
                onChange={setIncludeAdult}
                label="성인 콘텐츠 표시"
                id="include_adult"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 shadkw-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full flex-1">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                🌎 언어
              </label>
              <LanguageSelector
                value={language}
                onChange={setLanguage}
                options={LANGUAGE_OPTIONS}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blud-500"
              />
            </div>
          </div>

          <div className="flex items-center w-full">
            <button
              type="submit"
              className="bg-purple-500 text-white p-2 rounded-md cursor-pointer w-full"
            >
              영화 검색
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default memo(MovieFilter);
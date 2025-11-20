import { PAGINATION_ORDER } from "../enums/common"; 

type Props = {
  value: PAGINATION_ORDER;
  onChange: (v: PAGINATION_ORDER) => void;
};

export default function SortToggle({ value, onChange }: Props) {
  const base =
    "px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors focus:outline-none";
  const off  = "bg-white text-black hover:bg-neutral-100";
  const on   = "bg-black text-white";

  return (
    <div className="inline-flex rounded border border-neutral-700 overflow-hidden shadow-sm">
      <button
        type="button"
        aria-pressed={value === PAGINATION_ORDER.asc}
        className={`${base} ${value === PAGINATION_ORDER.asc ? on : off}`}
        onClick={() => onChange(PAGINATION_ORDER.asc)}
      >
        오래된순
      </button>
      <button
        type="button"
        aria-pressed={value === PAGINATION_ORDER.desc}
        className={`${base} ${value === PAGINATION_ORDER.desc ? on : off}`}
        onClick={() => onChange(PAGINATION_ORDER.desc)}
      >
         최신 순   
      </button>
    </div>
  );
}

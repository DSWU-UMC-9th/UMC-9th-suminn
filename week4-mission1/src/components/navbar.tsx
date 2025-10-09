// src/components/navbar.tsx
import { NavLink } from 'react-router-dom';

const Links = [
  { to: '/', label: '홈' },
  { to: '/movies/popular', label: '인기영화' },
  { to: '/movies/now_playing', label: '상영중' },
  { to: '/movies/top_rated', label: '평점높은' },
  { to: '/movies/upcoming', label: '개봉예정' }
];

const Navbar = () => {
  return (
    <div className="flex gap-3 p-4 bg-gray-100">
      {Links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-green-700"
              : "text-lg text-gray-600 hover:text-green-700"
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;

// src/components/navbar.tsx
import { NavLink } from 'react-router-dom';

const Links = [
  { to: '/login', label: '로그인' },
  { to: '/signup', label: '회원가입' },
  { to: '/my', label: '마이페이지' }
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
              ? "text-lg font-bold text-black-600"
              : "text-lg text-gray-600 hover:text-pink-300"
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;

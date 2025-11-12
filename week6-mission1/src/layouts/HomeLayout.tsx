import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";

export default function HomeLayout() {
 
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      
      <header className="sticky top-0 z-50 h-16 bg-black border-b border-neutral-800">
        <div className="w-full mx-auto h-full px-4 flex items-center">
         
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-label="toggle sidebar"
            className="mr-3 p-2 rounded text-neutral-200 hover:bg-neutral-800"
          >
            <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>

          <div className="flex-1">
            <Navbar />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className={`w-full mx-auto px-4 py-6 ${open ? "flex gap-6" : ""}`}>
        {open && (
            <>
              {/* 오버레이: 사이드바 외 영역 클릭 시 닫힘 */}
              <button
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40 bg-black/40 cursor-default"
                aria-label="close sidebar"
              />
              
              {/* 사이드바 */}
              <aside className="relative z-50 w-56 shrink-0 bg-neutral-950 border border-neutral-800 rounded-md p-3 shadow-lg">
                <nav className="space-y-1 text-sm">
                  <NavLink
                    to="/"
                    className="block px-3 py-2 rounded hover:bg-neutral-800/60"
                  >
                    찾기
                  </NavLink>
                  <NavLink
                    to="/my"
                    className="block px-3 py-2 rounded hover:bg-neutral-800/60"
                  >
                    마이페이지
                  </NavLink>
                </nav>
                <div className="mt-4 pt-3 border-t border-neutral-800">
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 rounded text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
                  >
                    탈퇴하기
                  </button>
                </div>
              </aside>
            </>
          )}

          <section className={`min-h-[60vh] ${open ? "flex-1" : ""}`}>
            <Outlet />
          </section>
        </div>
      </main>

      <FloatingButton /> 
      <Footer />
    </div>
  );
}

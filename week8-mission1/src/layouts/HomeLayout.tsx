// src/layouts/HomeLayout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";
import Sidebar from "../components/Sidebar";

export default function HomeLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 h-16 bg-black border-b border-neutral-800">
        <div className="w-full mx-auto h-full px-4 flex items-center">
          {/* 햄버거 버튼 */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
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

      {/* 메인 */}
      <main className="flex-1">
        {/* flex 레이아웃: 사이드바가 생기면 그만큼 오른쪽이 줄어듦 */}
        <div className="w-full mx-auto px-4 py-6 flex gap-6">
          {open && (
            <div className="transition-all duration-200">
              <Sidebar />
            </div>
          )}

          <section
            className={`min-h-[60vh] flex-1 transition-all duration-200 ${
              open ? "ml-0" : ""
            }`}
          >
            <Outlet />
          </section>
        </div>
      </main>

      <FloatingButton />
      <Footer />
    </div>
  );
}

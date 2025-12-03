"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isSponsorOpen, setIsSponsorOpen] = useState(false);

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleNoticeClick = () => {
    setIsNoticeOpen(true);
  };

  const handleCloseNotice = () => {
    setIsNoticeOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between gap-4 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        {/* Logo Area */}
        <div 
          className="flex items-center cursor-pointer group select-none" 
          onClick={handleLogoClick}
        >
          <h1 className="flex items-baseline text-xl sm:text-2xl">
            {/* Smart: 稳重、现代、科技感 */}
            <span className="font-sans font-bold text-slate-700 tracking-tight">
              Smart
            </span>
            {/* Draw: 艺术、流动、多彩 */}
            <span 
              className="ml-1 font-serif italic font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 text-2xl sm:text-3xl group-hover:scale-105 transition-transform duration-300 ease-out origin-left"
              style={{ letterSpacing: '-0.02em' }}
            >
              Draw
            </span>
            {/* 装饰性的小圆点，增加设计细节 */}
            <span className="ml-0.5 mb-1 w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-pulse"></span>
          </h1>
        </div>
        
        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Notice Button */}
          <button
            type="button"
            onClick={handleNoticeClick}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-50 to-rose-50 text-pink-600 border border-pink-200 hover:from-pink-100 hover:to-rose-100 hover:text-pink-700 hover:border-pink-300 transition-all shadow-sm active:scale-95"
          >
            消息
          </button>
          {/* Buy Me a Coffee Button */}
          <button
            type="button"
            onClick={() => setIsSponsorOpen(true)}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 border border-amber-200 hover:from-amber-100 hover:to-orange-100 hover:text-amber-700 hover:border-amber-300 transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
            aria-label="反馈"
            title="反馈"
          >
            <span>反馈</span>
          </button>
          {/* Link */}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors p-1.5 hover:bg-gray-100 rounded-full"
            aria-label="文档"
            title="文档"
          >

            <svg
              fill="#000000"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              id="email"
              data-name="Flat Line"
              xmlns="http://www.w3.org/2000/svg"
              className="icon flat-line"
            >
              <path
                id="secondary"
                d="M20.61,5.23l-8,6.28a1,1,0,0,1-1.24,0l-8-6.28A1,1,0,0,0,3,6V18a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V6A1,1,0,0,0,20.61,5.23Z"
                style={{
                  fill: "rgb(44, 169, 188)",
                  strokeWidth: 2,
                }}
              />
              <path
                id="primary"
                d="M20,19H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5H20a1,1,0,0,1,1,1V18A1,1,0,0,1,20,19ZM20,5H4a1,1,0,0,0-.62.22l8,6.29a1,1,0,0,0,1.24,0l8-6.29A1,1,0,0,0,20,5Z"
                style={{
                  fill: "none",
                  stroke: "rgb(0, 0, 0)",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                }}
              />
            </svg>


          </a>
          {/* Link */}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors p-1.5 hover:bg-gray-100 rounded-full"
            aria-label="GitHub Repository"
          >
            <svg width="22" height="22" viewBox="-1 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <g id="user" transform="translate(-3 -2)">
                <path id="secondary" fill="#2ca9bc" d="M9,15h6a5,5,0,0,1,5,5h0a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1H4a5,5,0,0,1,5-5Z"/>
                <path id="primary" d="M20,20h0a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1H4a5,5,0,0,1,5-5h6A5,5,0,0,1,20,20ZM12,3a4,4,0,1,0,4,4A4,4,0,0,0,12,3Z" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
              </g>
            </svg>
          </a>

        </div>
      </header>

      {isNoticeOpen}

      {isSponsorOpen}
    </>
  );
}
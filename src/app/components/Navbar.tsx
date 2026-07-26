"use client";

import { useState } from "react";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[108px] border-b border-white/10 bg-[#020814]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1700px] items-center justify-between px-8">

        {/* ================= LOGO ================= */}
        <a href="#home" className="flex items-center gap-5">

          {/* LA LOGO */}
          <div className="flex h-[76px] w-[76px] items-center justify-center rounded-2xl border border-[#168CFF] bg-[#041120] shadow-[0_0_25px_rgba(22,140,255,.12)]">

            <svg
              width="55"
              height="55"
              viewBox="0 0 60 60"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="silver"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="60"
                >
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#bcc3cd" />
                </linearGradient>

                <linearGradient
                  id="blue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="60"
                >
                  <stop offset="0%" stopColor="#22B6FF" />
                  <stop offset="100%" stopColor="#1486FF" />
                </linearGradient>
              </defs>

              {/* L */}
              <path
                d="M11 10
                   V40
                   Q11 48 19 48
                   H36"
                stroke="url(#silver)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* A */}
              <path
                d="M40 12
                   L52 48
                   H41
                   L37 37
                   H27
                   L31 27
                   H39"
                fill="url(#blue)"
              />
            </svg>
          </div>

          {/* Text */}
          <div>

            <h1 className="font-corporate text-[25px] tracking-[0.18em] text-white">
              LIMO
            </h1>

            <p className="mt-1 font-corporate text-[13px] tracking-[0.36em] text-[#169CFF]">
              AUTOMATION
            </p>

          </div>
        </a>

        {/* ================= MENU ================= */}

        <div className="hidden items-center gap-14 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[16px] font-medium text-white transition hover:text-[#169CFF]"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* ================= RIGHT ================= */}

        <div className="hidden items-center gap-10 lg:flex">

          <button className="text-[16px] text-white hover:text-[#169CFF]">
            中文 / EN
          </button>

          <a
            href="#contact"
            className="rounded-xl bg-[#148CFF] px-10 py-5 text-[17px] font-semibold text-white transition hover:bg-[#1D98FF]"
          >
            Start a Project
          </a>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#020814] lg:hidden">
          <div className="flex flex-col gap-6 px-8 py-8">

            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-white"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              className="rounded-xl bg-[#148CFF] px-6 py-4 text-center text-white"
            >
              Start a Project
            </a>

          </div>
        </div>
      )}
    </header>
  );
}
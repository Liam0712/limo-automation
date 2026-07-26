"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Language = "en" | "zh";
type ModalName = "about" | "services" | "portfolio" | "project" | null;

type NavigationItem = {
  modal: Exclude<ModalName, null>;
  label: {
    en: string;
    zh: string;
  };
};

const navigationItems: NavigationItem[] = [
  {
    modal: "about",
    label: {
      en: "ABOUT",
      zh: "關於我們",
    },
  },
  {
    modal: "services",
    label: {
      en: "SERVICES",
      zh: "服務項目",
    },
  },
  {
    modal: "portfolio",
    label: {
      en: "ACHIEVEMENTS",
      zh: "專案成果",
    },
  },
];

const modalTitles = {
  about: {
    en: "ABOUT LIMO AUTOMATION",
    zh: "關於 LIMO AUTOMATION",
  },
  services: {
    en: "OUR SERVICES",
    zh: "服務項目",
  },
  portfolio: {
  en: "ACHIEVEMENTS",
  zh: "專案成果",
  },
  project: {
    en: "START A PROJECT",
    zh: "開始您的專案",
  },
};

export default function HomeShell() {
  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  function openModal(modal: Exclude<ModalName, null>) {
    setActiveModal(modal);
    setMobileMenuOpen(false);
  }

  function closeModal() {
    setActiveModal(null);
  }

  function toggleLanguage() {
    setLanguage((current) => (current === "en" ? "zh" : "en"));
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  useEffect(() => {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;

    const imageLightbox = document.querySelector(
      '[data-image-lightbox="true"]'
    );

    // 圖片燈箱開啟時，不關閉 ACHIEVEMENTS
    if (imageLightbox) return;

    closeModal();
  }

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#010713]">
      {/* 固定背景圖片：完整顯示、不裁切 */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/image/Background.png')",
        }}
      />

      {/* Navigation */}
      <header className="absolute inset-x-0 top-0 z-30">
        <nav
          aria-label="Main navigation"
  className="relative mx-auto flex h-24 w-full max-w-[1800px] items-center justify-center pl-[240px] pr-8"
        >
          {/* Desktop navigation */}
<div className="hidden w-full items-center lg:flex">
  {/* 中間選單群組 */}
  <div className="ml-[220px] flex items-center gap-2 rounded-2xl border border-white/[0.06] bg-[#010713]/50 px-4 py-3 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-md">
    {navigationItems.map((item) => (
      <button
        key={item.modal}
        type="button"
        onClick={() => openModal(item.modal)}
        className="rounded-lg px-5 py-3 text-sm font-semibold tracking-[0.12em] text-slate-200 transition duration-300 hover:bg-blue-500/10 hover:text-[#168cff]"
      >
        {item.label[language]}
      </button>
    ))}

    {/* Start a Project */}
    <button
      type="button"
      data-open-project="true"
      onClick={() => openModal("project")}
      className="ml-2 rounded-lg bg-[#087ff5] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_rgba(0,112,255,0.25)] transition duration-300 hover:bg-[#168cff]"
    >
      {language === "en" ? "START A PROJECT" : "開始專案"}
    </button>
  </div>

  {/* Language switch：固定最右側 */}
  <button
    type="button"
    onClick={toggleLanguage}
    aria-label="Switch language"
    className="ml-auto rounded-lg px-5 py-3 text-sm font-semibold text-slate-200 transition duration-300 hover:bg-blue-500/10 hover:text-white"
  >
    <span className={language === "zh" ? "text-[#168cff]" : ""}>
      中文
    </span>

    <span className="mx-2 text-slate-500">/</span>

    <span className={language === "en" ? "text-[#168cff]" : ""}>
      EN
    </span>
  </button>
</div>
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-[#010713]/70 text-white backdrop-blur-md lg:hidden"
          >
            <span className="relative block h-5 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition ${
                  mobileMenuOpen ? "translate-y-[9px] rotate-45" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-[9px] h-0.5 w-6 bg-current transition ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-[18px] h-0.5 w-6 bg-current transition ${
                  mobileMenuOpen
                    ? "-translate-y-[9px] -rotate-45"
                    : ""
                }`}
              />
            </span>
          </button>
        </nav>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="mx-5 rounded-2xl border border-white/10 bg-[#010713]/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <button
                  key={item.modal}
                  type="button"
                  onClick={() => openModal(item.modal)}
                  className="rounded-lg px-4 py-4 text-left text-sm font-semibold tracking-[0.12em] text-slate-200 transition hover:bg-blue-500/10 hover:text-[#168cff]"
                >
                  {item.label[language]}
                </button>
              ))}

              <button
                type="button"
                onClick={toggleLanguage}
                className="rounded-lg px-4 py-4 text-left text-sm font-semibold text-slate-200 transition hover:bg-blue-500/10"
              >
                <span className={language === "zh" ? "text-[#168cff]" : ""}>
                  中文
                </span>

                <span className="mx-2 text-slate-500">/</span>

                <span className={language === "en" ? "text-[#168cff]" : ""}>
                  EN
                </span>
              </button>

              <button
                type="button"
                onClick={() => openModal("project")}
                className="mt-3 rounded-lg bg-[#087ff5] px-5 py-4 text-sm font-semibold text-white"
              >
                {language === "en" ? "START A PROJECT" : "開始專案"}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 py-8 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative max-h-[88vh] w-full max-w-7xl overflow-y-auto rounded-3xl border border-blue-400/20 bg-[linear-gradient(145deg,rgba(7,25,50,0.98),rgba(1,7,19,0.98))] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:p-10"
          >
            <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#168cff] to-transparent" />

            <button
              type="button"
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-slate-300 transition hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-white"
            >
              ×
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#168cff]">
              LIMO AUTOMATION
            </p>

            <h2
              id="modal-title"
              className="mt-4 pr-12 text-2xl font-bold tracking-[0.06em] text-white sm:text-4xl"
            >
              {modalTitles[activeModal][language]}
            </h2>

            <div className="mt-7 h-px w-full bg-gradient-to-r from-[#168cff]/60 via-white/10 to-transparent" />

            <div className="mt-8">
              {activeModal === "about" && (
                <AboutContent language={language} />
              )}

              {activeModal === "services" && (
                <ServicesContent language={language} />
              )}

              {activeModal === "portfolio" && (
                <PortfolioContent language={language} />
              )}

              {activeModal === "project" && (
                <ProjectContent language={language} />
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

type ContentProps = {
  language: Language;
};

function AboutContent({ language }: ContentProps) {
  const isZh = language === "zh";

  const capabilities = isZh
    ? [
        {
          number: "01",
          title: "客製工程設計",
          description:
            "依據設備條件、操作流程與實驗需求，規劃機構、治具及自動化方案。",
        },
        {
          number: "02",
          title: "自動化系統整合",
          description:
            "整合機構、感測器、控制元件與資料擷取功能，建立可實際執行的設備系統。",
        },
        {
          number: "03",
          title: "檢測與設備監測",
          description:
            "提供量測、檢測、狀態監控、異常通知與設備資料整合方案。",
        },
        {
          number: "04",
          title: "設備改造與升級",
          description:
            "針對既有設備進行功能修改、效率改善、自動化升級與控制系統整合。",
        },
      ]
    : [
        {
          number: "01",
          title: "Custom Engineering Design",
          description:
            "Mechanical, fixture and automation concepts developed around equipment conditions, operating processes and test requirements.",
        },
        {
          number: "02",
          title: "Automation Integration",
          description:
            "Integration of mechanisms, sensors, controls and data acquisition into practical equipment systems.",
        },
        {
          number: "03",
          title: "Inspection and Monitoring",
          description:
            "Measurement, inspection, condition monitoring, abnormal notification and equipment-data integration solutions.",
        },
        {
          number: "04",
          title: "Equipment Retrofit",
          description:
            "Functional modification, efficiency improvement, automation upgrades and control-system integration for existing equipment.",
        },
      ];

  return (
    <div className="space-y-10">
      {/* Company introduction */}
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#168cff]">
            {isZh ? "關於我們" : "WHO WE ARE"}
          </p>

          <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
            {isZh
              ? "將客戶需求轉化為可執行、可製造與可驗證的工程方案"
              : "Turning customer requirements into practical, manufacturable and verifiable engineering solutions"}
          </h3>

          <div className="mt-6 space-y-5 text-[15px] leading-8 text-slate-300 sm:text-base">
            <p>
              {isZh
                ? "LIMO Automation 專注於客製自動化設備、實驗治具、檢測系統、設備監測及既有設備改造。"
                : "LIMO Automation focuses on custom automation equipment, experimental fixtures, inspection systems, equipment monitoring and equipment retrofits."}
            </p>

            <p>
              {isZh
                ? "我們從需求理解、功能定義與工程評估開始，逐步完成機構設計、製造、組裝、測試及安裝規劃。"
                : "We begin with requirement clarification, functional definition and engineering evaluation, then progress through mechanical design, manufacturing, assembly, testing and installation planning."}
            </p>

            <p>
              {isZh
                ? "每一個專案皆以實際操作、安全性、維護性與交付可行性為核心，避免過度設計，提供符合需求的工程解決方案。"
                : "Each project is developed around practical operation, safety, maintainability and delivery feasibility, avoiding unnecessary complexity while meeting the real requirement."}
            </p>
          </div>
        </div>

        {/* Positioning card */}
        <aside className="rounded-2xl border border-blue-400/20 bg-[linear-gradient(145deg,rgba(12,39,75,0.45),rgba(2,9,23,0.7))] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#168cff]">
            {isZh ? "服務定位" : "OUR POSITIONING"}
          </p>

          <h4 className="mt-4 text-xl font-semibold text-white">
            {isZh
              ? "彈性、直接且重視工程實際性的合作模式"
              : "Flexible, direct and engineering-focused collaboration"}
          </h4>

          <div className="mt-6 space-y-5">
            <AboutPoint
              title={isZh ? "客製化需求" : "Custom requirements"}
              description={
                isZh
                  ? "針對實驗室、研發單位與設備改造需求進行專案規劃。"
                  : "Project planning for laboratories, R&D teams and equipment-modification requirements."
              }
            />

            <AboutPoint
              title={isZh ? "工程師審查" : "Engineer review"}
              description={
                isZh
                  ? "AI 協助整理需求，所有功能、時程與報價均由工程師確認。"
                  : "AI assists with requirement organization, while functions, schedule and quotations are confirmed by an engineer."
              }
            />

            <AboutPoint
              title={isZh ? "明確交付範圍" : "Clear delivery scope"}
              description={
                isZh
                  ? "在設計前確認需求、工作內容、預估時程與交付條件。"
                  : "Requirements, work scope, estimated schedule and delivery conditions are clarified before design begins."
              }
            />
          </div>
        </aside>
      </div>

      {/* Capabilities */}
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#168cff]">
              {isZh ? "核心能力" : "CORE CAPABILITIES"}
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-white">
              {isZh ? "從概念到設備交付" : "From concept to equipment delivery"}
            </h3>
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-400">
            {isZh
              ? "依據不同專案需求，整合設計、製造、組裝、測試與安裝規劃。"
              : "Design, manufacturing, assembly, testing and installation planning are integrated according to each project requirement."}
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {capabilities.map((capability) => (
            <article
              key={capability.number}
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:border-blue-400/35 hover:bg-blue-500/[0.045]"
            >
              <div className="flex items-start gap-5">
                <span className="text-sm tracking-[0.16em] text-[#168cff]">
                  {capability.number}
                </span>

                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {capability.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {capability.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

type AboutPointProps = {
  title: string;
  description: string;
};

function AboutPoint({ title, description }: AboutPointProps) {
  return (
    <div className="border-l border-[#168cff]/60 pl-4">
      <h5 className="font-semibold text-white">{title}</h5>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

function ServicesContent({ language }: ContentProps) {
  const isZh = language === "zh";

  const services = isZh
    ? [
        {
          number: "01",
          title: "手動實驗治具",
          subtitle: "Manual Experimental Fixtures",
          description:
            "依據測試流程、樣品條件與操作需求，設計穩定、易操作且可重複使用的手動治具。",
          features: [
            "樣品定位與夾持",
            "壓力、拉力與位移測試",
            "可調式測試機構",
            "快速更換設計",
          ],
        },
        {
          number: "02",
          title: "半自動實驗治具",
          subtitle: "Semi-Automated Fixtures",
          description:
            "整合氣壓、電動致動器、感測器與簡易控制，降低人工操作負擔並提升測試一致性。",
          features: [
            "氣壓與電動驅動",
            "操作流程半自動化",
            "感測器整合",
            "測試條件控制",
          ],
        },
        {
          number: "03",
          title: "全自動實驗治具",
          subtitle: "Fully Automated Fixtures",
          description:
            "將測試動作、資料擷取、判定與異常通知整合為完整自動測試流程。",
          features: [
            "自動測試循環",
            "資料自動記錄",
            "結果判定",
            "異常警示與通知",
          ],
        },
        {
          number: "04",
          title: "客製自動化設備",
          subtitle: "Custom Automation Equipment",
          description:
            "依據製程、操作方式與產能需求，規劃專用自動化設備與控制系統。",
          features: [
            "專用機構設計",
            "流程自動化",
            "人機介面整合",
            "安全防護規劃",
          ],
        },
        {
          number: "05",
          title: "檢測與設備監測系統",
          subtitle: "Inspection & Monitoring Systems",
          description:
            "整合感測器、量測元件與資料擷取，建立檢測、監測及設備狀態管理方案。",
          features: [
            "感測器整合",
            "量測與資料擷取",
            "設備狀態監測",
            "異常通知",
          ],
        },
        {
          number: "06",
          title: "設備改造與升級",
          subtitle: "Equipment Retrofit & Upgrade",
          description:
            "針對既有設備進行機構修改、功能擴充、控制升級及操作改善。",
          features: [
            "既有設備評估",
            "機構與控制修改",
            "功能擴充",
            "操作與維護改善",
          ],
        },
      ]
    : [
        {
          number: "01",
          title: "Manual Experimental Fixtures",
          subtitle: "Fixture Design",
          description:
            "Stable, repeatable and operator-friendly fixtures developed around test procedures, samples and operating requirements.",
          features: [
            "Sample positioning and clamping",
            "Pressure, force and displacement tests",
            "Adjustable test mechanisms",
            "Quick-change design",
          ],
        },
        {
          number: "02",
          title: "Semi-Automated Fixtures",
          subtitle: "Semi-Automation",
          description:
            "Pneumatic, electric-actuator, sensor and basic control integration to reduce manual work and improve consistency.",
          features: [
            "Pneumatic and electric actuation",
            "Semi-automated operating cycles",
            "Sensor integration",
            "Test-condition control",
          ],
        },
        {
          number: "03",
          title: "Fully Automated Fixtures",
          subtitle: "Automated Testing",
          description:
            "Complete automated test workflows combining motion, data acquisition, result evaluation and abnormal notification.",
          features: [
            "Automated test cycles",
            "Automatic data recording",
            "Result evaluation",
            "Alarms and notifications",
          ],
        },
        {
          number: "04",
          title: "Custom Automation Equipment",
          subtitle: "Purpose-Built Systems",
          description:
            "Purpose-built equipment and control systems developed around production processes, operating methods and capacity requirements.",
          features: [
            "Dedicated mechanical design",
            "Process automation",
            "HMI integration",
            "Safety planning",
          ],
        },
        {
          number: "05",
          title: "Inspection & Monitoring Systems",
          subtitle: "Measurement and Monitoring",
          description:
            "Sensor, measurement and data-acquisition integration for inspection, monitoring and equipment-condition management.",
          features: [
            "Sensor integration",
            "Measurement and data acquisition",
            "Equipment-condition monitoring",
            "Abnormal notification",
          ],
        },
        {
          number: "06",
          title: "Equipment Retrofit & Upgrade",
          subtitle: "Modification and Improvement",
          description:
            "Mechanical modifications, functional expansion, control upgrades and operational improvements for existing equipment.",
          features: [
            "Existing-equipment evaluation",
            "Mechanical and control modification",
            "Functional expansion",
            "Operation and maintenance improvement",
          ],
        },
      ];

  return (
    <div className="space-y-9">
      {/* Introduction */}
      <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#168cff]">
            {isZh ? "服務項目" : "ENGINEERING SERVICES"}
          </p>

          <h3 className="mt-4 max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
            {isZh
              ? "從單一治具到完整自動化設備，依需求提供合適的工程方案"
              : "From individual fixtures to complete automation equipment, solutions are developed around the actual requirement"}
          </h3>

          <p className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-300 sm:text-base">
            {isZh
              ? "服務內容可依專案需求整合機械設計、製造、組裝、測試、感測器、控制系統、資料擷取與安裝規劃。"
              : "Services may combine mechanical design, manufacturing, assembly, testing, sensors, control systems, data acquisition and installation planning according to the project scope."}
          </p>
        </div>

        <aside className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.04] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#168cff]">
            {isZh ? "專案原則" : "PROJECT PRINCIPLES"}
          </p>

          <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
            <li>
              {isZh
                ? "先確認需求與功能，再進行設計。"
                : "Requirements and functions are confirmed before design."}
            </li>

            <li>
              {isZh
                ? "避免不必要的複雜度與過度設計。"
                : "Unnecessary complexity and overdesign are avoided."}
            </li>

            <li>
              {isZh
                ? "時程、工作範圍與報價皆由工程師確認。"
                : "Schedule, work scope and quotation are confirmed by an engineer."}
            </li>
          </ul>
        </aside>
      </div>

      {/* Service cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.number}
            className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/35 hover:bg-blue-500/[0.045]"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm tracking-[0.16em] text-[#168cff]">
                {service.number}
              </span>

              <span className="text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {service.subtitle}
              </span>
            </div>

            <h4 className="mt-5 text-xl font-semibold leading-snug text-white">
              {service.title}
            </h4>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              {service.description}
            </p>

            <div className="mt-6 h-px bg-gradient-to-r from-[#168cff]/45 to-transparent" />

            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {service.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#168cff]" />
                  <span className="leading-6">{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="flex flex-col gap-5 rounded-2xl border border-blue-400/20 bg-[linear-gradient(90deg,rgba(8,127,245,0.09),rgba(8,127,245,0.02))] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-white">
            {isZh
              ? "不確定您的需求屬於哪一類？"
              : "Not sure which service category fits your requirement?"}
          </h4>

          <p className="mt-2 text-sm leading-7 text-slate-400">
            {isZh
              ? "可先提交初步需求，我們會協助整理專案方向。"
              : "Submit the initial requirement and we will help organize the project direction."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const projectButton = document.querySelector<HTMLButtonElement>(
              '[data-open-project="true"]'
            );
            projectButton?.click();
          }}
          className="min-h-12 shrink-0 rounded-lg bg-[#087ff5] px-6 text-sm font-semibold text-white transition hover:bg-[#168cff]"
        >
          {isZh ? "開始專案" : "START A PROJECT"}
        </button>
      </div>
    </div>
  );
}

function PortfolioContent({ language }: ContentProps) {
  const isZh = language === "zh";

  const [selectedProject, setSelectedProject] = useState<{
    image: string;
    title: {
      zh: string;
      en: string;
    };
  } | null>(null);

  useEffect(() => {
  if (!selectedProject) return;

  function handleLightboxKeyDown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;

    event.preventDefault();
    event.stopImmediatePropagation();

    setSelectedProject(null);
  }

  window.addEventListener("keydown", handleLightboxKeyDown, true);

  return () => {
    window.removeEventListener("keydown", handleLightboxKeyDown, true);
  };
}, [selectedProject]);

  const projects = [
    {
      number: "01",
      image: "/image/achievements/ups-server-solution.png",
      category: {
        zh: "電源與伺服器設備",
        en: "POWER & SERVER SYSTEMS",
      },
      title: {
        zh: "UPS／伺服器電源解決方案",
        en: "UPS and Server Power Solution",
      },
      description: {
        zh: "針對伺服器、AI 運算與關鍵設備應用所規劃的高可靠度電源系統。",
        en: "A high-reliability power system developed for servers, AI computing and mission-critical equipment.",
      },
      tags: {
        zh: ["電源設備", "機構設計", "散熱規劃"],
        en: ["Power System", "Mechanical Design", "Thermal Design"],
      },
    },
    {
      number: "02",
      image: "/image/achievements/bone-conduction-glasses.png",
      category: {
        zh: "穿戴式科技設備",
        en: "WEARABLE TECHNOLOGY",
      },
      title: {
        zh: "骨傳導智慧眼鏡",
        en: "Bone-Conduction Smart Glasses",
      },
      description: {
        zh: "整合骨傳導音訊、無線通訊及開放式聆聽設計的智慧穿戴裝置。",
        en: "A smart wearable device integrating bone-conduction audio, wireless communication and open-ear listening.",
      },
      tags: {
        zh: ["穿戴裝置", "產品整合", "人體工學"],
        en: ["Wearable Device", "Product Integration", "Ergonomics"],
      },
    },
    {
      number: "03",
      image: "/image/achievements/glass-conveyor-system.png",
      category: {
        zh: "自動化輸送設備",
        en: "AUTOMATED CONVEYOR SYSTEM",
      },
      title: {
        zh: "玻璃基板輸送系統",
        en: "Glass Substrate Conveyor System",
      },
      description: {
        zh: "用於玻璃基板站點間傳送的模組化滾輪與鏈條輸送設備。",
        en: "A modular roller and chain conveyor system for transferring glass substrates between process stations.",
      },
      tags: {
        zh: ["輸送系統", "模組化設計", "伺服控制"],
        en: ["Conveyor System", "Modular Design", "Servo Control"],
      },
    },
    {
      number: "04",
      image: "/image/achievements/robot-glass-transfer.png",
      category: {
        zh: "機器人搬運系統",
        en: "ROBOTIC HANDLING SYSTEM",
      },
      title: {
        zh: "玻璃基板機械手臂搬運系統",
        en: "Robot-Based Glass Transfer System",
      },
      description: {
        zh: "具備多軸定位與雙臂搬運機構的玻璃基板自動取放系統。",
        en: "A multi-axis, dual-arm robotic system for automated pickup and transfer of glass substrates.",
      },
      tags: {
        zh: ["機械手臂", "精密定位", "自動搬運"],
        en: ["Robotics", "Precision Positioning", "Automated Transfer"],
      },
    },
    {
      number: "05",
      image: "/image/achievements/optical-inspection-system.png",
      category: {
        zh: "光學檢測設備",
        en: "OPTICAL INSPECTION",
      },
      title: {
        zh: "玻璃基板光學檢測系統",
        en: "Glass Substrate Optical Inspection System",
      },
      description: {
        zh: "結合光學成像、精密定位與自動搬運的表面缺陷檢測設備。",
        en: "A surface-defect inspection system combining optical imaging, precision positioning and automated handling.",
      },
      tags: {
        zh: ["機器視覺", "光學檢測", "品質判定"],
        en: ["Machine Vision", "Optical Inspection", "Quality Evaluation"],
      },
    },
    {
      number: "06",
      image: "/image/achievements/biomedical-pulse-system.png",
      category: {
        zh: "生醫檢測設備",
        en: "BIOMEDICAL EQUIPMENT",
      },
      title: {
        zh: "P101 生醫脈搏診斷設備",
        en: "P101 Biomedical Pulse Diagnostic System",
      },
      description: {
        zh: "整合三點脈搏量測、感測器控制與資料分析的生醫診斷設備。",
        en: "A biomedical diagnostic system integrating three-point pulse measurement, sensor control and data analysis.",
      },
      tags: {
        zh: ["生醫設備", "精密量測", "資料分析"],
        en: ["Biomedical", "Precision Measurement", "Data Analysis"],
      },
    },
    {
      number: "07",
      image: "/image/achievements/long-stroke-dual-arm.png",
      category: {
        zh: "長行程自動搬運",
        en: "LONG-STROKE AUTOMATION",
      },
      title: {
        zh: "長行程雙臂機器人系統",
        en: "Long-Stroke Dual-Arm Robot System",
      },
      description: {
        zh: "適用於多站點生產線的長行程雙臂自動搬運與定位系統。",
        en: "A long-stroke dual-arm handling and positioning system for multi-station production lines.",
      },
      tags: {
        zh: ["長行程", "雙臂機構", "生產線整合"],
        en: ["Long Stroke", "Dual-Arm Mechanism", "Line Integration"],
      },
    },
  ];

  return (
    <div className="space-y-9">
      {/* Introduction */}
      <div className="grid gap-7 lg:grid-cols-[1fr_0.72fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#168cff]">
            {isZh ? "技術成果與設備案例" : "ENGINEERING ACHIEVEMENTS"}
          </p>

          <h3 className="mt-4 max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
            {isZh
              ? "跨領域設備設計、自動化整合與精密工程應用"
              : "Cross-disciplinary equipment design, automation integration and precision engineering applications"}
          </h3>

          <p className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-300 sm:text-base">
            {isZh
              ? "涵蓋自動化搬運、光學檢測、生醫設備、穿戴式產品及伺服器電源設備等工程領域。"
              : "Applications include automated handling, optical inspection, biomedical systems, wearable products and server power equipment."}
          </p>
        </div>

        <aside className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.04] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#168cff]">
            {isZh ? "案例說明" : "PROJECT NOTICE"}
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            {isZh
              ? "圖片與說明以可公開內容為限。實際專案資訊會依客戶保密條件進行調整。"
              : "Images and descriptions are limited to publicly shareable information and may be adjusted according to customer confidentiality requirements."}
          </p>
        </aside>
      </div>

      {/* Achievement cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.number}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#020a18]/80 transition duration-300 hover:-translate-y-1 hover:border-[#168cff]/50 hover:shadow-[0_20px_55px_rgba(0,93,190,0.16)]"
          >
            <button
  type="button"
  onClick={() =>
    setSelectedProject({
      image: project.image,
      title: project.title,
    })
  }
  aria-label={
    isZh
      ? `放大查看 ${project.title.zh}`
      : `Enlarge ${project.title.en}`
  }
  className="relative block aspect-video w-full cursor-zoom-in overflow-hidden bg-[#010713] text-left"
>
  <Image
    src={project.image}
    alt={project.title[language]}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
    className="object-cover transition duration-500 group-hover:scale-[1.03]"
  />

  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#010713]/65 via-transparent to-transparent" />

  <span className="pointer-events-none absolute left-4 top-4 rounded-md border border-blue-400/30 bg-[#010713]/75 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-[#49aaff] backdrop-blur-sm">
    {project.number}
  </span>

  {/* 放大提示圖示 */}
  <span className="pointer-events-none absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#010713]/75 text-xl text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
    ↗
  </span>
</button>

            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#168cff]">
                {project.category[language]}
              </p>

              <h4 className="mt-3 text-xl font-semibold leading-snug text-white">
                {project.title[language]}
              </h4>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {project.description[language]}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags[language].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom action */}
      <div className="flex flex-col gap-5 rounded-2xl border border-blue-400/20 bg-[linear-gradient(90deg,rgba(8,127,245,0.09),rgba(8,127,245,0.02))] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-white">
            {isZh ? "需要規劃類似設備？" : "Planning a similar system?"}
          </h4>

          <p className="mt-2 text-sm leading-7 text-slate-400">
            {isZh
              ? "提交初步需求，我們將協助整理功能與專案方向。"
              : "Submit your initial requirements and we will help organize the functions and project direction."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const projectButton = document.querySelector<HTMLButtonElement>(
              '[data-open-project="true"]'
            );
            projectButton?.click();
          }}
          className="min-h-12 shrink-0 rounded-lg bg-[#087ff5] px-6 text-sm font-semibold text-white transition hover:bg-[#168cff]"
        >
          {isZh ? "開始專案" : "START A PROJECT"}
        </button>
      </div>
    {/* Image lightbox */}
       {selectedProject && (
        <div
        data-image-lightbox="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <div className="relative flex h-full max-h-[92vh] w-full max-w-[1500px] flex-col">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label={isZh ? "關閉圖片" : "Close image"}
              className="absolute right-2 top-2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#010713]/85 text-3xl text-white shadow-xl backdrop-blur-md transition hover:border-[#168cff] hover:bg-[#0a2447]"
            >
              <span aria-hidden="true">&times;</span>
            </button>

            {/* Enlarged image */}
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-blue-400/20 bg-[#010713] shadow-[0_30px_100px_rgba(0,0,0,0.75)]">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title[language]}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Image title */}
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white sm:text-base">
                {selectedProject.title[language]}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {isZh
                  ? "點擊ESC或右上角關閉按鈕"
                  : "Click ESC or use the close button"}
              </p>
            </div>
          </div>
        </div>
      )}
      </div>
  );
}

function ProjectContent({ language }: ContentProps) {
  const isZh = language === "zh";

  const projectSteps = isZh
    ? [
        {
          number: "01",
          title: "提交需求",
          description: "填寫設備、治具、檢測或自動化需求。",
        },
        {
          number: "02",
          title: "需求整理",
          description: "我們會整理功能、限制條件與初步工作範圍。",
        },
        {
          number: "03",
          title: "工程評估",
          description: "由工程師確認可行性、時程與後續討論方向。",
        },
        {
          number: "04",
          title: "報價與執行",
          description: "確認工作內容後，再提供正式報價與預估時程。",
        },
      ]
    : [
        {
          number: "01",
          title: "Submit Requirements",
          description:
            "Provide your equipment, fixture, inspection or automation requirement.",
        },
        {
          number: "02",
          title: "Requirement Review",
          description:
            "Functions, constraints and the initial work scope will be organized.",
        },
        {
          number: "03",
          title: "Engineering Evaluation",
          description:
            "An engineer will review feasibility, schedule and next-step requirements.",
        },
        {
          number: "04",
          title: "Quotation & Execution",
          description:
            "A formal quotation and estimated schedule will be provided after scope confirmation.",
        },
      ];

  const acceptedProjects = isZh
    ? [
        "手動、半自動與全自動實驗治具",
        "客製自動化設備",
        "檢測系統與設備監測",
        "感測器整合與資料擷取",
        "既有設備改造與升級",
      ]
    : [
        "Manual, semi-automated and fully automated fixtures",
        "Custom automation equipment",
        "Inspection and equipment monitoring systems",
        "Sensor integration and data acquisition",
        "Existing equipment retrofit and upgrade",
      ];

  const projectConditions = isZh
    ? [
        "設備最大尺寸原則上不超過 2 公尺",
        "一般專案時程約為 1 至 2 個月",
        "不承接需長期駐點的專案",
        "付款條件需於 15 天內",
        "正式功能、時程與報價皆由工程師確認",
      ]
    : [
        "Equipment should generally remain within 2 meters",
        "Typical project duration is approximately 1 to 2 months",
        "Projects requiring long-term on-site staffing are not accepted",
        "Payment terms must be within 15 days",
        "Functions, schedule and quotation are confirmed by an engineer",
      ];

  function openInquiryForm() {
    window.open(
      "https://tally.so/r/WOkN1k",
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="space-y-9">
      {/* Introduction */}
      <div className="grid gap-7 lg:grid-cols-[1fr_0.78fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#168cff]">
            {isZh ? "專案需求入口" : "PROJECT INQUIRY"}
          </p>

          <h3 className="mt-4 max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
            {isZh
              ? "告訴我們您想解決的問題，我們會協助整理成可執行的工程需求"
              : "Tell us what you need to solve, and we will help organize it into an actionable engineering requirement"}
          </h3>

          <p className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-300 sm:text-base">
            {isZh
              ? "您不需要在一開始就準備完整規格。只要提供目前問題、操作方式、預期功能及基本限制條件，即可開始初步評估。"
              : "You do not need a complete specification at the beginning. Current problems, operating methods, expected functions and basic constraints are enough for an initial review."}
          </p>
        </div>

        <aside className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.04] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#168cff]">
            {isZh ? "回覆原則" : "RESPONSE PRINCIPLES"}
          </p>

          <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
            <li>
              {isZh
                ? "收到需求後先進行資料整理，不會直接承諾功能、價格或時程。"
                : "Requirements are reviewed first. Functions, price and schedule are not committed automatically."}
            </li>

            <li>
              {isZh
                ? "必要時會請您補充樣品、尺寸、照片或現場條件。"
                : "Additional samples, dimensions, photos or site conditions may be requested."}
            </li>

            <li>
              {isZh
                ? "正式回覆將由工程師確認後提供。"
                : "Formal responses are provided after engineering confirmation."}
            </li>
          </ul>
        </aside>
      </div>

      {/* Process */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#168cff]">
          {isZh ? "專案流程" : "PROJECT PROCESS"}
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projectSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
            >
              <span className="text-sm font-semibold tracking-[0.16em] text-[#168cff]">
                {step.number}
              </span>

              <h4 className="mt-4 text-lg font-semibold text-white">
                {step.title}
              </h4>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Main inquiry area */}
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168cff]">
            {isZh ? "可承接項目" : "SUPPORTED PROJECT TYPES"}
          </p>

          <ul className="mt-6 space-y-4">
            {acceptedProjects.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate-300">
                <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#168cff]" />
                <span className="leading-7">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-blue-400/25 bg-[linear-gradient(145deg,rgba(8,127,245,0.1),rgba(8,127,245,0.025))] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168cff]">
            {isZh ? "客製化設備需求表" : "CUSTOM EQUIPMENT INQUIRY FORM"}
          </p>

          <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
            {isZh
              ? "提交您的初步需求"
              : "Submit Your Initial Requirement"}
          </h3>

          <p className="mt-4 leading-7 text-slate-300">
            {isZh
              ? "需求表將詢問聯絡資訊、設備類型、操作方式、預期功能、尺寸、環境、安全條件、預算與時程。"
              : "The form covers contact details, equipment type, operation method, expected functions, dimensions, environment, safety conditions, budget and schedule."}
          </p>

          <div className="mt-6 rounded-xl border border-white/10 bg-[#010713]/45 p-5">
            <p className="text-sm font-semibold text-white">
              {isZh ? "填寫前建議準備" : "Recommended Information"}
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              {isZh
                ? "現況照片、樣品尺寸、操作流程、預期功能、可用電源與氣源，以及希望完成的時間。"
                : "Current photos, sample dimensions, operating process, expected functions, available power and pneumatic supply, and preferred completion date."}
            </p>
          </div>

          <button
            type="button"
            onClick={openInquiryForm}
            className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-4 rounded-lg bg-[#087ff5] px-6 font-semibold text-white shadow-[0_12px_36px_rgba(0,112,255,0.24)] transition hover:bg-[#168cff]"
          >
            <span>
              {isZh ? "開啟專案需求表" : "OPEN PROJECT INQUIRY FORM"}
            </span>
            <span aria-hidden="true">→</span>
          </button>

          <p className="mt-4 text-center text-xs leading-6 text-slate-500">
            {isZh
              ? "需求送出後，系統將協助整理資料，再由工程師進行確認。"
              : "After submission, the information will be organized before engineering review."}
          </p>
        </div>
      </div>

      {/* Conditions */}
      <div className="rounded-2xl border border-white/10 bg-[#010713]/45 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#168cff]">
          {isZh ? "專案條件與限制" : "PROJECT CONDITIONS"}
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {projectConditions.map((condition) => (
            <div
              key={condition}
              className="flex gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
            >
              <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#168cff]" />
              <p className="text-sm leading-7 text-slate-300">{condition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
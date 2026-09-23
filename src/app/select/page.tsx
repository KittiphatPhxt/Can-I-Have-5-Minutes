"use client";

import { useRouter } from "next/navigation";
import { THEMES } from "../../data/prompts";
import {
  HeartHandshake,
  Trees,
  Sparkles,
  Wine,
  Fingerprint,
  Mountain,
  LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  HeartHandshake,
  Trees,
  Sparkles,
  Wine,
  Fingerprint,
  Mountain,
};

export default function SelectPage() {
  const router = useRouter();

  const handleSelect = (id: string) => {
    localStorage.setItem("ci5m_selected_theme", id);
    router.push(`/session/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-20 text-center min-h-screen min-h-[100dvh] bg-bg antialiased selection:bg-gold/30">
      {/* 🌑 Background Fade Effect */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_140%)] opacity-85" />

      <div className="relative z-10 mb-10 md:mb-14 space-y-3.5 animate-fade-in max-w-2xl mx-auto px-2">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-sans text-white tracking-normal font-semibold leading-relaxed">
          ถ้อยคำสุดท้ายก่อนจากลา
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-ink-muted font-sans leading-relaxed max-w-xl mx-auto">
          หากดวงวิญญาณของคุณได้รับอนุญาตให้ส่งเสียงถึงโลกใบนั้นได้อีกเพียง 5 นาที...
          <br className="hidden sm:inline" />
          ใครคือคนที่คุณยังติดค้าง และเสียดายที่สุดหากไม่ได้เอ่ยคำลาออกไป?
        </p>
      </div>

      {/* 📱 Responsive Grid: 1 คอลัมน์บนมือถือจอเล็ก, 2 คอลัมน์บนมือถือ/แท็บเล็ต, 3 คอลัมน์บนจอใหญ่ */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6 max-w-5xl w-full mx-auto">
        {THEMES.map((theme, idx) => {
          const Icon = ICON_MAP[theme.icon] || Sparkles;
          return (
            <button
              key={theme.id}
              onClick={() => handleSelect(theme.id)}
              style={{
                animationDelay: `${idx * 0.08 + 0.3}s`,
                animationFillMode: "both",
              }}
              className="group relative flex flex-col items-center justify-between p-5 sm:p-7 md:p-8 bg-surface/80 hover:bg-surface border border-white/10 hover:border-gold/50 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,169,110,0.12)] animate-fade-in cursor-pointer text-center min-h-[170px] sm:min-h-[210px]"
            >
              {/* Subtle top light highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-gold/40 transition-colors duration-500" />

              {/* Icon */}
              <div className="mb-3 sm:mb-4 text-gold-dim group-hover:text-gold transition-all duration-500 transform group-hover:-translate-y-0.5">
                <div className="p-3 rounded-full bg-white/[0.02] group-hover:bg-gold/10 transition-colors duration-500 border border-transparent group-hover:border-gold/20">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.4} />
                </div>
              </div>

              {/* Label */}
              <div className="space-y-2 w-full my-auto">
                <h3 className="text-base sm:text-lg md:text-xl text-white group-hover:text-gold-light transition-colors duration-300 font-sans font-medium leading-snug">
                  {theme.label}
                </h3>

                {/* Closing Text */}
                <p className="text-xs sm:text-sm text-ink-muted/80 font-sans leading-relaxed px-1 max-w-xs mx-auto">
                  {theme.closingText}
                </p>
              </div>

              {/* Action Prompt Hint */}
              <div className="mt-3 pt-2 text-[10px] sm:text-xs font-sans text-gold-dim/70 group-hover:text-gold tracking-widest uppercase transition-colors duration-300 flex items-center gap-1 font-medium">
                <span>เลือกหัวข้อนี้</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="relative z-10 mt-10 md:mt-14 animate-fade-in delay-2 fill-mode-both">
        <p className="text-ink-faint font-sans text-xs sm:text-sm tracking-wide">
          แตะเลือกหัวข้อที่คุณต้องการปลดเปลื้องความในใจ...
        </p>
      </div>
    </div>
  );
}
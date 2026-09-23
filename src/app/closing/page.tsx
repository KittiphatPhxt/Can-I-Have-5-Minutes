"use client";

import { useRouter } from "next/navigation";
import { useStorage } from "../../hooks/useStorage";
import { useEffect, useState } from "react";
import { FINAL_POEMS, THEMES } from "../../data/prompts";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Coffee, Music, Info, Sparkles, Scroll, Flame } from "lucide-react";
import MemorialLetterModal from "../../components/MemorialLetterModal";
import CandleWallModal from "../../components/CandleWallModal";
import { User, UserAnswer, Theme } from "../../types";

const REFLECTIONS = [
  "ถ้ามีความรักที่ยังไม่ได้เอ่ย... จงพูดมันออกมาเสียตั้งแต่วันนี้ เพราะคำว่า 'พรุ่งนี้' ไม่เคยถูกสัญญาไว้กับใคร",
  "อย่ารอให้ถึงนาทีสุดท้ายเพื่อจะบอกว่ารัก... เพราะในความเงียบงัน เสียงที่ดังที่สุดคือเสียงที่ไม่ได้พูดออกมา",
  "ถ้ามีสิ่งที่อยากทำแต่ยังลังเล... จงเริ่มซะ แม้จะล้มเหลว ก็ยังดีกว่าต้องมาเสียดายในนาทีที่ 5 สุดท้ายของชีวิต",
  "ความโกรธแค้นคือยาพิษที่คุณดื่มเอง... วางมันลงเสียตั้งแต่วันนี้ เพื่อให้หัวใจของคุณเบาสบายพอก่อนวันจากลา",
  "จงใช้ชีวิตให้คุ้มค่า... เพื่อที่ว่าเมื่อวันนั้นมาถึงจริงๆ คุณจะจากไปพร้อมรอยยิ้มที่บอกว่า 'ฉันใช้ชีวิตได้งดงามที่สุดแล้ว'",
  "สิ่งเดียวที่เราพกติดตัวไปได้ไม่ใช่ทรัพย์สิน... แต่คือความภาคภูมิใจที่ได้เป็นผู้ให้ และความทรงจำที่แสนงดงาม",
];

export default function ClosingPage() {
  const router = useRouter();
  const { clearAll, getUser, getAnswers } = useStorage();
  const [poem, setPoem] = useState("");
  const [reflection, setReflection] = useState("");
  const [isFinalized, setIsFinalized] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showCandleWall, setShowCandleWall] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    setUser(getUser());
    setAnswers(getAnswers());

    const selectedThemeId =
      typeof window !== "undefined"
        ? localStorage.getItem("ci5m_selected_theme") || "self"
        : "self";
    const currentTheme = THEMES.find((t) => t.id === selectedThemeId) || THEMES[4];
    setTheme(currentTheme);

    const themePoems = FINAL_POEMS[selectedThemeId] || FINAL_POEMS["self"];
    setPoem(themePoems[Math.floor(Math.random() * themePoems.length)]);
    setReflection(REFLECTIONS[Math.floor(Math.random() * REFLECTIONS.length)]);

    const timer = setTimeout(() => setIsFinalized(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    clearAll();
    localStorage.removeItem("ci5m_selected_theme");
    router.push("/");
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-10 text-center overflow-x-hidden font-sans antialiased selection:bg-gold/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(200,169,110,0.06)_0%,transparent_80%)] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto space-y-6 sm:space-y-8 flex flex-col items-center w-full my-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-base sm:text-xl md:text-2xl text-white/50 font-sans"
        >
          แสงสว่างสุดท้ายมอดดับลงแล้ว...
        </motion.p>

        <div className="min-h-[100px] sm:min-h-[120px] flex items-center justify-center px-2">
          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="text-xl sm:text-2xl md:text-3xl text-gold-light font-sans font-medium leading-relaxed drop-shadow-[0_0_20px_rgba(200,169,110,0.3)]"
          >
            &quot; {poem} &quot;
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1.5 }}
          className="w-full max-w-md bg-surface/70 border border-white/10 p-5 sm:p-7 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.6)]"
        >
          <div className="flex justify-center mb-3 text-gold/60">
            <Sparkles size={20} strokeWidth={1.2} />
          </div>
          <p className="text-xs sm:text-sm md:text-base text-ink-muted leading-relaxed font-sans">
            {reflection}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFinalized ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="pt-4 flex flex-col items-center gap-4 sm:gap-5 w-full"
        >
          {/* ปุ่มเปิดอ่านการ์ดจดหมายความทรงจำ */}
          <button
            onClick={() => setShowLetter(true)}
            className="group px-7 sm:px-9 py-3.5 rounded-full border border-gold/40 hover:border-gold bg-gold/15 hover:bg-gold/25 text-gold hover:text-gold-light text-xs sm:text-sm font-sans font-medium tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(200,169,110,0.2)] cursor-pointer flex items-center gap-2.5 animate-pulse"
          >
            <Scroll size={17} />
            <span>เปิดอ่านจดหมายถึงโลกใบเดิม</span>
          </button>

          {/* ปุ่มจุดเทียนนิรนาม */}
          <button
            onClick={() => setShowCandleWall(true)}
            className="px-6 sm:px-8 py-2.5 rounded-full border border-gold/30 hover:border-gold/60 bg-white/5 hover:bg-gold/10 text-gold-light/90 hover:text-gold text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(200,169,110,0.08)]"
          >
            <Flame size={15} className="text-orange-400" />
            <span>จุดเทียนแห่งการระลึกถึง (The Candle Wall)</span>
          </button>

          {/* ปุ่มก้าวกลับสู่โลกความเป็นจริง */}
          <button
            onClick={handleFinish}
            className="px-6 sm:px-8 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-ink-muted hover:text-white text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer"
          >
            ก้าวกลับสู่โลกความเป็นจริง
          </button>

          {/* ปุ่ม Credits */}
          <button
            onClick={() => setShowCredits(true)}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-gold-light tracking-wider font-sans cursor-pointer transition-colors duration-200 py-1 px-3 rounded-lg hover:bg-white/5"
          >
            <Info size={14} strokeWidth={1.5} />
            <span>ผู้พัฒนาและผู้สนับสนุน (Credits)</span>
          </button>
        </motion.div>
      </div>

      <p className="relative z-10 mt-8 text-[10px] font-mono text-ink-faint/40 tracking-widest uppercase pointer-events-none">
        End of Reflection
      </p>

      {/* Memorial Letter Modal (จดหมายถึงโลกใบเดิม) */}
      <MemorialLetterModal
        isOpen={showLetter}
        onClose={() => setShowLetter(false)}
        user={user}
        theme={theme}
        answers={answers}
        poem={poem}
      />

      {/* Candle Wall Modal (ลานจุดเทียนนิรนาม) */}
      <CandleWallModal
        isOpen={showCandleWall}
        onClose={() => setShowCandleWall(false)}
        userName={user?.name}
      />

      {/* Credits Modal */}
      <AnimatePresence>
        {showCredits && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
            onClick={() => setShowCredits(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 16, opacity: 0 }}
              className="bg-surface border border-gold/30 p-6 sm:p-8 md:p-10 rounded-3xl max-w-md w-full relative shadow-[0_0_80px_rgba(0,0,0,1)] max-h-[90dvh] overflow-y-auto overflow-x-hidden my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCredits(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-ink-muted hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
                aria-label="ปิดหน้าต่าง"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="space-y-6 sm:space-y-8 text-center pt-2">
                <div className="space-y-2">
                  <p className="text-[11px] tracking-widest text-gold-dim uppercase font-mono">
                    Created by
                  </p>
                  <h2 className="text-xl sm:text-2xl font-sans text-white tracking-wide font-medium">
                    Kittiphat Phengnamkham
                  </h2>
                  <a
                    href="https://www.instagram.com/p.phxnkhm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-xs font-mono pt-1 border-b border-gold/20 pb-0.5"
                  >
                    <Camera size={14} strokeWidth={1.5} />
                    <span>Instagram @p.phxnkhm</span>
                  </a>
                </div>

                <div className="space-y-2 py-4 border-y border-white/5">
                  <div className="flex justify-center items-center gap-2 text-gold-dim mb-1">
                    <Music size={14} strokeWidth={1.5} />
                    <p className="text-[10px] tracking-wider uppercase font-mono">Soundtrack</p>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
                    เพลง ยื้อ - ปรีชา ปัดภัย <br />
                    <span className="text-[10px] text-ink-faint not-italic">
                      เซิ้ง Music Ost. สัปเหร่อ Story
                    </span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2.5 bg-gold/10 rounded-full text-gold">
                      <Coffee size={20} strokeWidth={1.5} />
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed max-w-xs">
                      หากเรื่องราวนี้ช่วยให้คุณได้หยุดคิดและรู้สึกดีขึ้น
                      สามารถสนับสนุนค่ากาแฟเป็นกำลังใจให้คนพัฒนาได้ที่นี่
                    </p>
                  </div>

                  <div className="relative aspect-square max-w-[160px] sm:max-w-[180px] mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden p-2 shadow-inner group">
                    <img
                      src="/images/pay.jpg"
                      alt="Donation PromptPay QR"
                      className="w-full h-full object-contain rounded-xl"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement?.classList.add("bg-black/40");
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-wider text-white/30 pointer-events-none group-hover:text-white/50 transition-colors">
                      Support QR Code
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
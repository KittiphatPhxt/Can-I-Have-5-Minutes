"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Sparkles, Heart } from "lucide-react";

interface CandleItem {
  id: string;
  name: string;
  message: string;
  time: string;
}

const SAMPLE_CANDLES: CandleItem[] = [
  {
    id: "c1",
    name: "ใครบางคน",
    message: "ขอให้เธอมีความสุขบนดาวดวงนั้นนะ ไม่ต้องเป็นห่วงทางนี้แล้ว",
    time: "เมื่อสักครู่",
  },
  {
    id: "c2",
    name: "ลูกคนหนึ่ง",
    message: "ขอบคุณแม่สำหรับกับข้าวทุกจาน และความรักที่ไม่เคยมีเงื่อนไข",
    time: "2 นาทีที่แล้ว",
  },
  {
    id: "c3",
    name: "เพื่อนเก่า",
    message: "ขอโทษที่ไม่ได้ไปเจอตามนัด มิตรภาพยังคงงดงามในใจเสมอ",
    time: "15 นาทีที่แล้ว",
  },
  {
    id: "c4",
    name: "นักเดินทาง",
    message: "ยกโทษให้ตัวเองในทุกเรื่องราวที่ผ่านมา และพร้อมก้าวต่อไป",
    time: "32 นาทีที่แล้ว",
  },
  {
    id: "c5",
    name: "คนธรรมดา",
    message: "ขอบคุณลมหายใจในวันนี้ จะใช้ชีวิตให้คุ้มค่าที่สุด",
    time: "1 ชั่วโมงที่แล้ว",
  },
];

interface CandleWallModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export default function CandleWallModal({
  isOpen,
  onClose,
  userName = "ผู้ร่วมเดินทาง",
}: CandleWallModalProps) {
  const [isLit, setIsLit] = useState(false);
  const [message, setMessage] = useState("");
  const [candleCount, setCandleCount] = useState(1284);
  const [candles, setCandles] = useState<CandleItem[]>(SAMPLE_CANDLES);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCount = localStorage.getItem("ci5m_candle_count");
      const storedLit = localStorage.getItem("ci5m_candle_lit");
      const storedMsg = localStorage.getItem("ci5m_candle_msg");

      if (storedCount) {
        setCandleCount(parseInt(storedCount, 10));
      }
      if (storedLit === "true") {
        setIsLit(true);
        setHasSubmitted(true);
        if (storedMsg) {
          setMessage(storedMsg);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLightCandle = () => {
    setIsLit(true);
    setHasSubmitted(true);
    const newCount = candleCount + 1;
    setCandleCount(newCount);

    const newCandle: CandleItem = {
      id: Date.now().toString(),
      name: userName || "ผู้ร่วมเดินทาง",
      message: message.trim() || "จุดเทียนในความเงียบงัน... เพื่อระลึกถึงและปล่อยวาง",
      time: "เมื่อสักครู่",
    };

    setCandles([newCandle, ...candles]);

    if (typeof window !== "undefined") {
      localStorage.setItem("ci5m_candle_count", newCount.toString());
      localStorage.setItem("ci5m_candle_lit", "true");
      if (message.trim()) {
        localStorage.setItem("ci5m_candle_msg", message.trim());
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[220] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-lg bg-[#0e0e12] border border-gold/30 rounded-3xl p-5 sm:p-7 shadow-[0_0_80px_rgba(200,169,110,0.15)] overflow-hidden font-sans text-center my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="ปิด"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gold-dim uppercase flex items-center justify-center gap-1.5">
              <Sparkles size={13} />
              The Silent Candle Wall
            </span>
            <h2 className="text-xl sm:text-2xl font-medium text-white tracking-wide">
              ลานจุดเทียนนิรนาม
            </h2>
            <p className="text-xs text-ink-muted leading-relaxed max-w-sm mx-auto">
              จุดแสงสว่างหนึ่งดวงในความเงียบสงบ เพื่อระลึกถึงคนที่รัก ยกโทษให้ตัวเอง และส่งต่อความหวัง
            </p>
          </div>

          {/* Candle Visual */}
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="relative flex flex-col items-center">
              {/* Flame Aura */}
              <AnimatePresence>
                {isLit && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                      opacity: [0.7, 1, 0.8, 0.95],
                      scale: [0.95, 1.05, 0.98, 1.02],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-12 w-28 h-28 rounded-full bg-[radial-gradient(circle,rgba(255,200,100,0.4)_0%,rgba(255,140,40,0.15)_45%,transparent_75%)] blur-md pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Flame Element */}
              <div className="relative h-12 flex items-center justify-center">
                {isLit ? (
                  <motion.div
                    animate={{
                      scaleY: [1, 1.15, 0.95, 1.08, 1],
                      scaleX: [1, 0.92, 1.04, 0.96, 1],
                      rotate: [-1, 2, -2, 1, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8,
                      ease: "easeInOut",
                    }}
                    className="w-4 h-9 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full shadow-[0_0_24px_rgba(255,180,60,0.95)] relative"
                  >
                    {/* Inner core blue flame */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2.5 bg-blue-400/80 rounded-full blur-[1px]" />
                  </motion.div>
                ) : (
                  <div className="w-1 h-3 bg-neutral-600 rounded-t-sm" />
                )}
              </div>

              {/* Candle Body */}
              <div className="w-8 h-20 bg-gradient-to-b from-[#e3dac9] via-[#c8bcab] to-[#a89b88] rounded-t-sm rounded-b-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] relative overflow-hidden border-t border-white/20">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30" />
                {/* Wax drip details */}
                <div className="absolute top-0 left-1 w-2 h-4 bg-[#e8dfcf] rounded-b-full opacity-80" />
                <div className="absolute top-0 right-2 w-1.5 h-6 bg-[#ded5c5] rounded-b-full opacity-70" />
              </div>

              {/* Candle Stand / Base */}
              <div className="w-16 h-2 bg-[#2a2723] rounded-full shadow-lg border-t border-gold/30 mt-0.5" />
            </div>

            {/* Lit Counter Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-xs font-mono text-gold-light">
              <Flame size={13} className={isLit ? "text-orange-400 animate-pulse" : "text-ink-muted"} />
              <span>
                {candleCount.toLocaleString()} ดวงเทียนถูกจุดขึ้นแล้ว
              </span>
            </div>
          </div>

          {/* Action / Input Section */}
          {!hasSubmitted ? (
            <div className="space-y-3 bg-white/[0.02] border border-white/10 rounded-2xl p-4">
              <input
                type="text"
                maxLength={90}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="ฝากคำอธิษฐานหรือข้อความสั้นๆ 1 ประโยค (ไม่ระบุตัวตน)"
                className="w-full bg-white/5 border border-white/10 focus:border-gold/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-ink-faint/40 focus:outline-none text-center font-sans"
              />
              <button
                onClick={handleLightCandle}
                className="w-full py-2.5 px-4 rounded-xl bg-gold/20 hover:bg-gold/30 text-gold-light border border-gold/40 hover:border-gold font-sans text-xs sm:text-sm font-medium transition-all duration-300 shadow-[0_0_20px_rgba(200,169,110,0.15)] cursor-pointer flex items-center justify-center gap-2"
              >
                <Flame size={15} />
                <span>จุดเทียนดวงนี้ในความเงียบสงบ</span>
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-gold/10 border border-gold/30 rounded-2xl text-xs text-gold-light font-sans"
            >
              <p className="font-medium">✨ แสงสว่างของคุณถูกจุดขึ้นแล้ว</p>
              <p className="text-[11px] text-ink-muted pt-0.5">
                {message ? `"${message}"` : "แสงเทียนแห่งการปล่อยวางและระลึกถึง กำลังส่องสว่างเคียงข้างทุกคน"}
              </p>
            </motion.div>
          )}

          {/* Community Whisper Candles Carousel / List */}
          <div className="mt-5 text-left border-t border-white/10 pt-4">
            <p className="text-[11px] text-ink-muted font-sans flex items-center gap-1.5 mb-2.5">
              <Heart size={12} className="text-gold" />
              <span>ถ้อยคำจากกัลยาณมิตรที่จุดเทียนร่วมกัน</span>
            </p>
            <div className="space-y-2 max-h-[22dvh] overflow-y-auto pr-1">
              {candles.map((c) => (
                <div
                  key={c.id}
                  className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 space-y-0.5"
                >
                  <p className="text-[11px] sm:text-xs text-white/90 font-sans leading-relaxed">
                    &quot;{c.message}&quot;
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-ink-faint font-mono pt-0.5">
                    <span>— {c.name}</span>
                    <span>{c.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

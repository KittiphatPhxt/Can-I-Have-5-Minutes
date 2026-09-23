"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { THEMES, THEME_PROMPTS } from "../../../data/prompts";
import { useTimer } from "../../../hooks/useTimer";
import Timer from "../../../components/Timer";
import ProgressBar from "../../../components/ProgressBar";
import PromptCard from "../../../components/PromptCard";

import { useStorage } from "../../../hooks/useStorage";
import { useHeartbeat } from "../../../hooks/useHeartbeat";
import { useAudio } from "../../../context/AudioContext";
import { UserAnswer } from "../../../types";

export default function SessionPage() {
  const params = useParams();
  const themeId = params.themeId as string;
  const router = useRouter();
  const { saveAnswers } = useStorage();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answersList, setAnswersList] = useState<Record<number, string>>({});
  const [showSubText, setShowSubText] = useState(false);

  const prompts = useMemo(
    () => THEME_PROMPTS[themeId] || [],
    [themeId]
  );
  const theme = useMemo(() => THEMES.find((t) => t.id === themeId), [themeId]);

  const persistCurrentAnswers = (updatedAnswers: Record<number, string>) => {
    const answersToSave: UserAnswer[] = prompts.map((p, idx) => ({
      step: idx + 1,
      question: p.question,
      answer: (updatedAnswers[idx] || "").trim(),
    }));
    saveAnswers(answersToSave);
  };

  const { isMuted } = useAudio();
  const { timeLeft, formatTime } = useTimer(300, () => {
    const finalAnswers = { ...answersList, [currentIdx]: answer };
    persistCurrentAnswers(finalAnswers);
    router.push("/closing");
  });

  const isWarningPeriod = timeLeft <= 60 && timeLeft > 0;
  const { isBeating } = useHeartbeat(isWarningPeriod, {
    bpm: timeLeft <= 30 ? 76 : 64,
    volume: 0.45,
    isMuted,
  });

  const vignetteOpacity = useMemo(() => {
    if (timeLeft > 180) return 0;
    return (1 - timeLeft / 180) * 0.85;
  }, [timeLeft]);

  const phaseLabel = useMemo(() => {
    const step = currentIdx + 1;
    if (step === 1) return "หลับตาลง... ปล่อยให้ภาพจางๆ ในความทรงจำ ค่อยๆ ชัดเจนขึ้นมา";
    if (step === 2) return "ในความเงียบสงัดนี้... มีเสียงเรียกจากหัวใจดวงไหนที่ดังที่สุด?";
    if (step === 3) return "ปลดเปลื้องทุกหัวโขน... เหลือเพียงความจริงที่ติดค้างอยู่ข้างใน";
    if (step === 4) return "หากย้อนคืนกาลเวลาได้เพียงเสี้ยวนาที... คุณจะคว้ากอดสิ่งใดไว้?";
    if (step === 5) return "ก่อนที่ทุกอย่างจะกลายเป็นละอองดาว... จงให้อภัยทุกสิ่งที่ติดค้าง";
    if (step === 6) return "เมื่อแสงสุดท้ายมอดดับลง... นี่คือสิ่งที่คุณอยากทิ้งไว้ให้โลกใบเดิม";
    return "";
  }, [currentIdx]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubText(true);
    }, 600);

    return () => {
      clearTimeout(timer);
      setShowSubText(false);
    };
  }, [currentIdx]);

  useEffect(() => {
    if (!theme && themeId) {
      router.push("/select");
    }
  }, [theme, themeId, router]);

  const handleAnswerChange = (val: string) => {
    setAnswer(val);
    const updated = { ...answersList, [currentIdx]: val };
    setAnswersList(updated);
    persistCurrentAnswers(updated);
  };

  const handleNext = () => {
    const nextAnswers = { ...answersList, [currentIdx]: answer };
    setAnswersList(nextAnswers);
    persistCurrentAnswers(nextAnswers);

    if (currentIdx < prompts.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setAnswer(nextAnswers[nextIdx] || "");
    } else {
      router.push("/closing");
    }
  };

  if (!theme || prompts.length === 0) return null;

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full bg-bg flex flex-col items-center justify-between overflow-x-hidden transition-colors duration-1000 px-4 sm:px-6">
      {/* 🌑 Vignette Layer */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at center, transparent 25%, black 150%)`,
          opacity: vignetteOpacity,
        }}
      />

      {/* 💓 Heartbeat & 60s Warning Pulse Layer */}
      <div
        className={`pointer-events-none fixed inset-0 z-35 transition-opacity duration-300 ${
          isWarningPeriod && isBeating ? "opacity-70" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(185, 45, 35, 0.25) 85%, rgba(135, 20, 20, 0.45) 100%)",
        }}
      />

      <div className="relative z-40 flex flex-col items-center justify-between text-center w-full max-w-2xl mx-auto py-6 sm:py-10 min-h-screen min-h-[100dvh]">
        {/* Top: Theme & Timer */}
        <div className="w-full flex flex-col items-center gap-2 pt-2 sm:pt-4">
          <p className="text-[11px] sm:text-xs text-gold-dim/70 font-sans tracking-widest uppercase">
            {theme.label}
          </p>
          <Timer timeDisplay={formatTime()} isWarning={timeLeft < 60} />
          {isWarningPeriod && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-[11px] text-amber-200/90 font-sans animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block animate-ping" />
              <span>ห้วง 60 วินาทีสุดท้าย... ฟังเสียงจังหวะหัวใจของคุณ</span>
            </div>
          )}
        </div>

        {/* Center: Question & Textarea */}
        <div className="w-full my-auto py-4 sm:py-6 flex flex-col items-center">
          <PromptCard step={currentIdx}>
            <div className="space-y-4 sm:space-y-6 w-full">
              {/* บทกลอนนำ (SubText) */}
              <div className="min-h-[44px] flex items-center justify-center px-2">
                <p
                  className={`text-gold-light/75 font-sans text-xs sm:text-sm md:text-base transition-opacity duration-700 leading-relaxed ${
                    showSubText ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {phaseLabel}
                </p>
              </div>

              {/* คำถามหลัก */}
              <div className="min-h-[70px] sm:min-h-[90px] flex items-center justify-center px-2">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-sans text-white font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(200,169,110,0.15)]">
                  {prompts[currentIdx].question}
                </h2>
              </div>

              {/* ช่องพิมพ์ความในใจ */}
              <div className="w-full pt-2">
                <textarea
                  value={answer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="เอ่ยความในใจของคุณที่นี่... (ไม่บังคับพิมพ์ สามารถใคร่ครวญในใจได้)"
                  rows={3}
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-gold/40 focus:bg-white/[0.04] rounded-2xl p-4 sm:p-5 text-sm sm:text-base md:text-lg text-white/90 text-center font-sans resize-none placeholder:text-ink-faint/40 focus:outline-none transition-all duration-300 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </PromptCard>
        </div>

        {/* Bottom: Next Button & Progress */}
        <div className="w-full pb-4 sm:pb-6 flex flex-col items-center gap-6 sm:gap-8">
          <button
            onClick={handleNext}
            className="group px-6 sm:px-8 py-3 bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold text-gold hover:text-gold-light text-xs sm:text-sm font-sans font-medium rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(200,169,110,0.1)] cursor-pointer flex items-center gap-2"
          >
            <span>
              {currentIdx === prompts.length - 1
                ? "ปล่อยวางและจากลา"
                : "เอ่ยคำนั้นออกมา"}
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>

          <div className="w-full flex flex-col items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <ProgressBar current={currentIdx + 1} total={prompts.length} />
            <span className="text-[10px] sm:text-xs font-sans text-ink-muted/80 tracking-wider">
              ห้วงคำนึงที่ {currentIdx + 1} จาก {prompts.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hourglass } from "lucide-react";

export default function SimulationPage() {
  const router = useRouter();
  const [scene, setScene] = useState(1);
  const [userData, setUserData] = useState<{
    name: string;
    age: number;
  } | null>(null);
  const [filledYears, setFilledYears] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem("ci5m_user");
    if (!data) {
      router.push("/");
      return;
    }
    try {
      setUserData(JSON.parse(data));
    } catch {
      router.push("/");
      return;
    }

    const t1 = setTimeout(() => setScene(2), 6000);
    const t2 = setTimeout(() => router.push("/select"), 26000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [router]);

  useEffect(() => {
    if (scene === 2 && userData) {
      setFilledYears(0);
      const target = Math.min(userData.age, 80);
      let count = 0;
      const interval = setInterval(() => {
        if (count < target) {
          count++;
          setFilledYears(count);
        } else {
          clearInterval(interval);
        }
      }, 45);
      return () => clearInterval(interval);
    }
  }, [scene, userData]);

  if (!userData) return null;

  const currentAge = Math.min(userData.age, 80);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen min-h-[100dvh] px-4 sm:px-6 py-10 text-center bg-bg selection:bg-gold/30 overflow-x-hidden">
      {/* 🌑 Background Fade Effect */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_140%)] opacity-85" />

      {scene === 1 ? (
        <div className="relative z-10 space-y-8 md:space-y-10 animate-fade-in max-w-xl mx-auto w-full px-2">
          <div className="flex justify-center">
            <div className="p-4 bg-gold/5 rounded-full border border-gold/20 shadow-[0_0_25px_rgba(200,169,110,0.15)]">
              <Hourglass
                className="w-10 h-10 sm:w-12 sm:h-12 text-gold animate-pulse"
                strokeWidth={1.2}
              />
            </div>
          </div>

          {/* บทกลอน Scene 1: การสะท้อนสิ่งที่ผ่านมา */}
          <div className="space-y-4 sm:space-y-5 text-ink-muted font-sans text-lg sm:text-xl md:text-2xl leading-relaxed">
            <p className="animate-fade-in [animation-delay:0.8s] fill-mode-both">
              กาลเวลา... ไหลผ่านไปอย่างเงียบเชียบ
            </p>
            <p className="animate-fade-in [animation-delay:2s] fill-mode-both">
              ทุกเข็มนาฬิกาที่เดินผ่าน คือชีวิตที่ไม่มีวันหวนคืน
            </p>
          </div>

          <div className="space-y-3 pt-4 sm:pt-6 animate-fade-in [animation-delay:3.5s] fill-mode-both">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-sans font-medium text-white/95 leading-snug">
              คุณ <span className="text-gold font-semibold">{userData.name}</span> ใช้ชีวิตบนโลกมาแล้ว {userData.age} ปี
            </h2>
            <p className="text-base sm:text-xl font-mono text-gold-dim tracking-widest">
              ≈ {(userData.age * 365).toLocaleString()} วันที่ผ่านพ้น
            </p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 animate-fade-in flex flex-col items-center w-full max-w-2xl mx-auto px-2">
          {/* Life Grid (80 ปี) - 10 คอลัมน์ x 8 แถว = แถวละ 1 ทศวรรษ (10 ปี) */}
          <div className="mb-4 p-4 sm:p-6 bg-surface/70 rounded-2xl border border-white/10 backdrop-blur-md max-w-fit mx-auto shadow-[0_0_40px_rgba(0,0,0,0.7)]">
            <div className="grid-cols-10 gap-2 sm:gap-2.5 md:gap-3">
              {Array.from({ length: 80 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-[4px] transition-all duration-500 border ${i < filledYears
                      ? "bg-gold border-gold-light scale-105 shadow-[0_0_12px_rgba(200,169,110,0.55)]"
                      : "border-white/10 bg-white/[0.02]"
                    }`}
                  title={`ปีที่ ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-1 mb-8 sm:mb-10 text-center">
            <p className="text-gold-light/90 font-mono text-xs sm:text-sm tracking-wider uppercase">
              1 แถว = 10 ปี (1 ทศวรรษ) • สีทอง = {currentAge} ปีที่คุณได้ใช้ไปแล้ว
            </p>

          </div>

          {/* บทกลอน Scene 2: การตั้งคำถามถึงสิ่งที่เหลือ */}
          <div className="space-y-4 sm:space-y-5 text-white/90 font-sans leading-relaxed max-w-xl mx-auto px-2">
            <p className="text-base sm:text-xl animate-fade-in [animation-delay:0.8s] fill-mode-both text-ink-muted">
              แต่ละช่องที่ยังว่างเปล่า... คือเวลาที่คุณอาจไม่มีโอกาสได้ใช้อีกต่อไป
            </p>
            <p className="text-base sm:text-xl animate-fade-in [animation-delay:2s] fill-mode-both text-gold-light/90">
              สมมติว่า... นี่คือวันที่คุณได้จากโลกนี้ไปแล้วจริงๆ
            </p>
            <p className="text-lg sm:text-2xl font-sans font-medium text-white animate-fade-in [animation-delay:3.5s] fill-mode-both pt-2 leading-relaxed">
              คุณเสียดายชีวิตที่เหลืออยู่ไหม?... <br className="hidden sm:inline" />
              และหากมีโอกาสส่งเสียงกลับมาได้อีกเพียง 5 นาที คุณอยากจะพูดอะไรกับใคร?
            </p>
          </div>

          {/* ปุ่มก้าวสู่ขั้นตอนถัดไป */}
          <button
            onClick={() => router.push("/select")}
            className="mt-8 sm:mt-10 px-6 py-2.5 bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold text-gold hover:text-gold-light text-xs sm:text-sm font-sans font-medium rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(200,169,110,0.1)] cursor-pointer flex items-center gap-2 group"
          >
            <span>ก้าวสู่การเลือกหัวข้อ</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
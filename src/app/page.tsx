"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { HeartPulse, Phone } from "lucide-react";
import { useAudio } from "../context/AudioContext";

export default function IntroPage() {
  const router = useRouter();
  const { playMusic } = useAudio();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [isAccepted, setIsAccepted] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [roastData, setRoastData] = useState<{
    badge: string;
    title: string;
    message: string;
    icon: string;
  } | null>(null);

  const handleAccept = () => {
    setShowWarning(false);
    playMusic();
    setTimeout(() => setIsAccepted(true), 600);
  };

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && age.trim()) {
      const ageNum = parseInt(age, 10);
      if (isNaN(ageNum)) return;

      if (ageNum <= 0) {
        setRoastData({
          icon: "🍼",
          badge: "ตรวจพบสถานะ: ยังอยู่ในครรภ์มารดา",
          title: "เอิ่ม... คุณโยมยังไม่คลอดเหรอครับ?",
          message:
            "ระบบจำลองชีวิตนี้ออกแบบมาสำหรับผู้ที่ลืมตาดูโลกแล้วครับผม กรุณารอคลอดและใช้ชีวิตสักนิดก่อนค่อยมากดเล่นนะจ๊ะ 👶",
        });
        return;
      }

      if (ageNum > 80) {
        if (ageNum >= 500) {
          setRoastData({
            icon: "🦖",
            badge: "ตรวจพบสิ่งมีชีวิต: ยุคจูราสสิก / ฟอสซิลเดินได้",
            title: "กราบเรียนท่านไดโนเสาร์พันปี...",
            message: `กรอกมาได้ตั้ง ${ageNum} ปี! ท่านน่าจะผ่านยุคอุกกาบาตชนโลกและสร้างพีระมิดมาด้วยตัวเองใช่ไหมครับ? เว็บนี้จำลองชีวิตมนุษย์เดินดินธรรมดา (สูงสุด 80 ปี) รบกวนท่านผู้อาวุโสข้ามมิติกรอกอายุคนปกติด้วยครับผม 🙏`,
          });
        } else if (ageNum >= 100) {
          setRoastData({
            icon: "👻",
            badge: "ตรวจพบสถานะ: วิญญาณบรรพบุรุษข้ามภพภูมิ",
            title: "โอ้โห... ยมบาลปล่อยสัญญาณเน็ตให้เหรอครับ?",
            message: `อายุ ${ageNum} ปีเนี่ย ป่านนี้ลูกหลานน่าจะจุดธูปเรียกไปกินข้าวแล้วครับ เกรียนเก่งขนาดนี้แสดงว่าวิญญาณยังแข็งแรงแจ่มใสดีมาก รบกวนกรอกอายุขัยปัจจุบันที่ยังไม่ข้ามมิติโลกวิญญาณด้วยครับคุณพี่ 🪦`,
          });
        } else {
          setRoastData({
            icon: "🧓",
            badge: "ตรวจพบสถานะ: เกินขอบเขตมนุษย์จำลอง (Max 80 ปี)",
            title: "ขอประทานอภัยเป็นอย่างสูงครับคุณพี่...",
            message: `ตารางชีวิตของเราจำลองไว้สูงสุดที่ 80 ปีตามค่าเฉลี่ยมนุษย์โลกครับ หากท่านอายุ ${ageNum} ปีจริง ป่านนี้ลูกหลานคงพาไปสวดมนต์เข้าวัดแล้ว ไม่น่าจะมานั่งไถมือถือเกรียนใส่เว็บเล่นแบบนี้ รบกวนกรอกอายุจริง (1 - 80 ปี) สักนิดเถอะครับ 5555 📿`,
          });
        }
        return;
      }

      localStorage.setItem(
        "ci5m_user",
        JSON.stringify({ name: name.trim(), age: ageNum })
      );
      router.push("/simulation");
    }
  };

  const containerVars: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.9, delayChildren: 0.2 },
    },
  };

  const itemVars: Variants = {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full bg-bg flex flex-col items-center justify-center overflow-x-hidden font-sans antialiased px-4 sm:px-6">
      {/* 🌑 Background Effects */}
      <div
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          background: `radial-gradient(circle at center, transparent 15%, black 140%)`,
          opacity: 0.85,
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-10 animate-subtle-pulse opacity-25">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] md:w-[650px] md:h-[650px] bg-gold-dim rounded-full blur-[100px] md:blur-[160px]" />
      </div>

      <AnimatePresence mode="wait">
        {isAccepted && (
          <motion.div
            key="main-content"
            variants={containerVars}
            initial="initial"
            animate="animate"
            className="relative z-30 flex flex-col items-center justify-between text-center max-w-xl mx-auto w-full py-10 md:py-16 min-h-[85vh] md:min-h-[80vh]"
          >
            {/* บทกวีนำทาง */}
            <div className="flex flex-col items-center w-full my-auto px-2">
              <motion.h1
                variants={itemVars}
                className="text-2xl sm:text-3xl md:text-4xl text-white font-sans font-medium tracking-wide leading-relaxed mb-6 md:mb-10 drop-shadow-[0_2px_12px_rgba(200,169,110,0.15)]"
              >
                &quot;ขอเวลาสัก 5 นาที... ได้ไหม?&quot;
              </motion.h1>

              <motion.div
                variants={itemVars}
                className="space-y-3.5 sm:space-y-5 text-ink-muted font-sans text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mx-auto"
              >
                <p>หากวินาทีนี้... คือลมหายใจสุดท้ายของคุณบนโลกใบเดิม</p>
                <p>โลกจะยังคงหมุนต่อไป โดยไม่มีคุณอีกแล้ว</p>
                <p>เหลือทิ้งไว้เพียงความทรงจำ... และคำพูดที่คุณยังไม่เคยเอ่ยออกไป</p>
              </motion.div>

              <motion.div variants={itemVars} className="mt-8 md:mt-12 max-w-lg">
                <p className="text-sm sm:text-base md:text-lg text-gold-light/90 font-sans leading-relaxed px-4">
                  ก่อนที่แสงสุดท้ายจะมอดดับลงชั่วนิรันดร์...
                  <br />
                  <span className="text-gold font-medium">คุณมีเรื่องอะไรที่เสียดายที่สุดหากไม่ได้พูดออกมา?</span>
                </p>
              </motion.div>
            </div>

            {/* ส่วนกรอกข้อมูล */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1 }}
              className="w-full flex flex-col items-center max-w-sm mt-8 pt-4 pb-2"
            >
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="w-full space-y-3"
                  >
                    <label className="block text-ink-muted text-xs sm:text-sm font-sans tracking-wide uppercase">
                      นามของคุณ
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      placeholder="แตะเพื่อพิมพ์ชื่อหรือนามแฝง..."
                      className="w-full bg-surface/50 border-b border-white/20 focus:border-gold focus:bg-surface/80 focus:outline-none py-3 px-4 text-base sm:text-lg text-center transition-all duration-300 font-sans text-white placeholder:text-ink-faint/50 rounded-t-lg"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="w-full space-y-3"
                  >
                    <label className="block text-ink-muted text-xs sm:text-sm font-sans tracking-wide uppercase">
                      อายุขัยของคุณ (ปี)
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      placeholder="ระบุอายุของคุณ เช่น 25"
                      className="w-full bg-surface/50 border-b border-white/20 focus:border-gold focus:bg-surface/80 focus:outline-none py-3 px-4 text-base sm:text-lg text-center transition-all duration-300 font-sans text-white placeholder:text-ink-faint/50 rounded-t-lg"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleNext}
                disabled={step === 1 ? !name.trim() : !age.trim()}
                className="mt-8 px-6 py-2.5 text-xs sm:text-sm tracking-widest text-gold hover:text-gold-light disabled:text-ink-faint disabled:opacity-40 transition-all duration-300 font-sans font-medium border-b border-transparent hover:border-gold cursor-pointer disabled:cursor-not-allowed group flex items-center gap-2"
              >
                <span>ก้าวข้ามผ่าน</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal คำเตือนสุขภาพจิต */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4 } }}
              className="bg-surface/95 border border-gold/30 rounded-2xl max-w-lg w-full relative shadow-[0_0_60px_rgba(0,0,0,0.9)] max-h-[92dvh] overflow-hidden my-auto flex flex-col"
            >
              <div className="absolute -top-20 -right-20 w-44 h-44 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 text-center space-y-5 sm:space-y-6 p-5 sm:p-8 md:p-10 overflow-y-auto overflow-x-hidden">
                <div className="flex justify-center">
                  <div className="p-3 bg-gold/10 rounded-full border border-gold/20">
                    <HeartPulse className="text-gold animate-pulse w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-sans text-white tracking-normal font-medium">
                    แด่หัวใจที่กำลังอ่อนล้า...
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-ink-muted font-sans leading-relaxed px-2">
                    &quot;ในคืนที่มืดมิดที่สุด แสงดาวจะสว่างที่สุดเสมอ <br />
                    โลกใบนี้ยังมีที่ว่าง สำหรับรอยยิ้มของคุณเสมอ&quot;
                  </p>
                </div>

                <div className="bg-black/50 p-4 sm:p-5 rounded-xl border border-white/5 text-left space-y-3 sm:space-y-4 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  <p className="opacity-90 font-sans">
                    หากคุณกำลังเผชิญกับวันที่หนักหน่วง หรือรู้สึกไม่สบายใจ เราอยากให้คุณรู้ว่ามีคนพร้อมรับฟังคุณเสมอ:
                  </p>
                  <div className="space-y-2.5 pt-1">
                    <a
                      href="tel:1323"
                      className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] hover:bg-gold/10 text-gold-light hover:text-gold transition-all duration-200 group border border-transparent hover:border-gold/20"
                    >
                      <div className="p-2 bg-gold/10 rounded-md text-gold">
                        <Phone size={16} />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="font-mono text-sm sm:text-base font-semibold text-white group-hover:text-gold">
                          1323
                        </span>
                        <span className="text-xs sm:text-sm text-ink-muted group-hover:text-white/90">
                          สายด่วนสุขภาพจิต (โทรฟรี 24 ชม.)
                        </span>
                      </div>
                    </a>

                    <a
                      href="tel:021136793"
                      className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] hover:bg-gold/10 text-gold-light hover:text-gold transition-all duration-200 group border border-transparent hover:border-gold/20"
                    >
                      <div className="p-2 bg-gold/10 rounded-md text-gold">
                        <Phone size={16} />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="font-mono text-sm sm:text-base font-semibold text-white group-hover:text-gold">
                          02-113-6793
                        </span>
                        <span className="text-xs sm:text-sm text-ink-muted group-hover:text-white/90">
                          สมาคมสะมาริตันส์แห่งประเทศไทย
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleAccept}
                  className="w-full py-3.5 sm:py-4 px-6 bg-gold/15 hover:bg-gold/25 border border-gold/30 hover:border-gold text-gold hover:text-gold-light text-xs sm:text-sm font-sans font-medium tracking-wide rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(200,169,110,0.15)] cursor-pointer"
                >
                  รับทราบและเข้าสู่การทบทวนชีวิต
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🤡 Roast Modal สำหรับคนเกรียนกรอกอายุเกิน 80 */}
      <AnimatePresence>
        {roastData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-[#121217] border-2 border-amber-500/60 rounded-3xl max-w-md w-full relative shadow-[0_0_80px_rgba(245,158,11,0.25)] p-6 sm:p-8 text-center space-y-4 my-auto font-sans"
            >
              <div className="text-5xl sm:text-6xl animate-bounce pt-2">
                {roastData.icon}
              </div>

              <div className="space-y-1">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] sm:text-xs font-mono text-amber-300">
                  {roastData.badge}
                </span>
                <h3 className="text-lg sm:text-xl font-medium text-white pt-2">
                  {roastData.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed px-1">
                {roastData.message}
              </p>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setRoastData(null);
                    setAge("");
                  }}
                  className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-amber-500/25 via-gold/30 to-amber-500/25 hover:from-amber-500/35 hover:to-gold/40 border border-gold/50 text-gold-light hover:text-white text-xs sm:text-sm font-sans font-medium transition-all duration-300 shadow-[0_0_25px_rgba(200,169,110,0.2)] cursor-pointer"
                >
                  กราบขออภัยครับ... จะยอมกรอกอายุจริงดีๆ แล้ว 🥺
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Copy, Check, Sparkles, Scroll, Heart } from "lucide-react";
import html2canvas from "html2canvas";
import { UserAnswer, Theme, User } from "../types";

interface MemorialLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  theme: Theme | undefined;
  answers: UserAnswer[];
  poem: string;
}

export default function MemorialLetterModal({
  isOpen,
  onClose,
  user,
  theme,
  answers,
  poem,
}: MemorialLetterModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = async () => {
    if (!cardRef.current || isDownloading) return;
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: "#0a0a0c",
        logging: false,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `จดหมายถึงโลกใบเดิม-${user?.name || "บันทึก"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = () => {
    const textContent = `
จดหมายถึงโลกใบเดิม
ผู้บันทึก: คุณ ${user?.name || "นิรนาม"} (อายุ ${user?.age || "-"} ปี)
หัวข้อ: ${theme?.label || "ความในใจ"}
วันที่: ${todayStr}

----------------------------------------
${answers
  .map(
    (a, idx) =>
      `[ข้อที่ ${idx + 1}] ${a.question}\nความในใจ: ${
        a.answer || "— ใคร่ครวญในความเงียบงัน —"
      }\n`
  )
  .join("\n")}
----------------------------------------
บทกวีส่งท้าย:
"${poem}"

"บันทึกนี้เกิดขึ้นในห้วงจำลอง 5 นาทีก่อนจากลา... แต่ในความเป็นจริง คุณยังคงมีลมหายใจอยู่ จงนำความรู้สึกนี้ไปบอกแก่คนที่คุณรักในวันที่ยังมีโอกาส"
— Can I Have 5 Minutes
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-[480px] my-auto flex flex-col items-center gap-3 py-2"
        >
          {/* Top Actions Bar */}
          <div className="w-full flex items-center justify-between px-1 text-xs font-sans">
            <span className="text-gold-dim flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
              <Scroll size={14} />
              จดหมายความทรงจำ
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleCopyText}
                className="flex items-center gap-1.5 py-1 px-2.5 sm:px-3 rounded-full bg-white/5 hover:bg-gold/10 text-white/80 hover:text-gold border border-white/10 hover:border-gold/30 text-[11px] sm:text-xs transition-all cursor-pointer"
              >
                {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                <span>{copied ? "คัดลอกแล้ว" : "คัดลอกข้อความ"}</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-1.5 py-1 px-2.5 sm:px-3 rounded-full bg-gold/15 hover:bg-gold/25 text-gold hover:text-gold-light border border-gold/40 text-[11px] sm:text-xs transition-all cursor-pointer disabled:opacity-50"
              >
                <Download size={12} />
                <span>{isDownloading ? "กำลังบันทึก..." : "บันทึกเป็นรูปภาพ"}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1 sm:p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="ปิดหน้าต่าง"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Printable / Downloadable Card */}
          <div
            ref={cardRef}
            className="w-full bg-[#0d0d10] border border-gold/40 rounded-2xl p-3.5 sm:p-5 text-left relative shadow-[0_0_50px_rgba(200,169,110,0.12)] overflow-hidden font-sans"
          >
            {/* Background Decorative Accents */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            {/* Inner Border Line */}
            <div className="border border-gold/20 rounded-xl p-3.5 sm:p-5 relative z-10 space-y-4 bg-black/40">
              {/* Header */}
              <div className="text-center space-y-1.5 border-b border-white/10 pb-3">
                <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-gold/10 text-gold border border-gold/20 mb-0.5">
                  <Heart size={15} strokeWidth={1.5} />
                </div>
                <h2 className="text-lg sm:text-xl font-sans font-medium text-white tracking-wide">
                  จดหมายถึงโลกใบเดิม
                </h2>
                <p className="text-[11px] sm:text-xs text-gold-dim">
                  ถ้อยคำสุดท้ายในห้วงเวลาจำลอง 5 นาทีก่อนจากลา
                </p>

                <div className="pt-1 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 text-[10px] sm:text-[11px] text-ink-muted font-mono">
                  <span>ผู้เขียน: คุณ {user?.name || "นิรนาม"} ({user?.age || "-"} ปี)</span>
                  <span>•</span>
                  <span>แด่: {theme?.label || "คนสำคัญ"}</span>
                  <span>•</span>
                  <span>{todayStr}</span>
                </div>
              </div>

              {/* Answers Body */}
              <div className="space-y-2.5 max-h-[35dvh] overflow-y-auto pr-1 text-left">
                {answers.map((item, idx) => (
                  <div key={idx} className="space-y-1 bg-white/[0.02] p-2.5 sm:p-3 rounded-lg border border-white/5">
                    <p className="text-[11px] sm:text-xs text-gold-light/90 font-medium leading-snug">
                      {idx + 1}. {item.question}
                    </p>
                    <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed pl-2.5 border-l-2 border-gold/40">
                      {item.answer ? (
                        item.answer
                      ) : (
                        <span className="text-ink-muted/50 italic font-light">
                          — ใคร่ครวญในความเงียบงัน ไม่ได้เอ่ยเป็นตัวอักษร —
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Poem & Moral */}
              <div className="border-t border-white/10 pt-3 space-y-2 text-center">
                <div className="flex justify-center text-gold/60">
                  <Sparkles size={13} />
                </div>
                <p className="text-[11px] sm:text-xs text-gold-light font-medium italic leading-relaxed px-1">
                  &quot; {poem} &quot;
                </p>
                <p className="text-[10px] sm:text-[11px] text-ink-muted/80 leading-relaxed max-w-xs mx-auto">
                  บันทึกนี้เกิดขึ้นในห้วงจำลอง 5 นาทีก่อนจากลา... แต่ในความเป็นจริง หัวใจของคุณยังคงเต้นอยู่
                  จงนำความรู้สึกนี้ไปบอกแก่คนที่คุณรักในวันที่ยังมีโอกาส
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-ink-faint/80 pt-1.5 border-t border-white/5">
                <span>Can I Have 5 Minutes</span>
                <span>Spend 5 minutes with yourself</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

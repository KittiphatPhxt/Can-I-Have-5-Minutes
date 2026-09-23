export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className="w-full max-w-xs h-[2px] bg-white/10 rounded-full relative overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-dim via-gold to-gold-light rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(200,169,110,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
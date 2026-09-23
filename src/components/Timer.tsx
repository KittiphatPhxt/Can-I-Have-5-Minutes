interface TimerProps {
  timeDisplay: string;
  isWarning?: boolean;
}

export default function Timer({ timeDisplay, isWarning }: TimerProps) {
  return (
    <div className="flex flex-col items-center gap-2 animate-fade-in">
      <div
        className={`font-mono tabular-nums text-sm md:text-base tracking-[0.4em] font-medium transition-colors duration-500 ${
          isWarning
            ? "text-red-400 animate-pulse drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]"
            : "text-gold-dim/90 drop-shadow-[0_0_8px_rgba(200,169,110,0.2)]"
        }`}
      >
        {timeDisplay}
      </div>
      <div
        className={`h-[1px] w-12 transition-all duration-500 ${
          isWarning ? "bg-red-400/40" : "bg-gold-dim/30"
        }`}
      />
    </div>
  );
}
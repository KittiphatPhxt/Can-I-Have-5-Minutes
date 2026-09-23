interface TextInputProps {
  value: string;
  onChange: (val: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  type?: string;
}

export default function TextInput({
  value,
  onChange,
  onEnter,
  placeholder,
  type = "text",
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-white/20 focus:border-gold focus:outline-none py-3 text-white text-base sm:text-lg text-center font-sans transition-colors placeholder:text-ink-faint/50"
    />
  );
}
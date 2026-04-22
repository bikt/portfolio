export default function Research({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-16 border-t border-white/[0.06]">
      <span className="text-[10px] tracking-wide-label uppercase text-text-muted block mb-6">
        Исследование / Research
      </span>
      <div className="text-[16px] leading-relaxed text-text-secondary max-w-2xl space-y-4">
        {children}
      </div>
    </div>
  );
}

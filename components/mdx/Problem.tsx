export default function Problem({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-16 border-t border-white/[0.06]">
      <span className="text-[10px] tracking-wide-label uppercase text-text-muted block mb-6">
        Проблема / Problem
      </span>
      <p className="text-[28px] font-light leading-relaxed tracking-tight text-white/60 max-w-3xl">
        {children}
      </p>
    </div>
  );
}

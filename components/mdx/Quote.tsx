export default function Quote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <div className="py-16 border-t border-white/[0.06]">
      <blockquote className="text-[24px] font-light leading-relaxed text-white/50 max-w-3xl">
        <span className="text-[48px] leading-none text-white/10 font-serif">"</span>
        {children}
      </blockquote>
      {author && (
        <cite className="block mt-4 text-[12px] text-text-muted not-italic">— {author}</cite>
      )}
    </div>
  );
}

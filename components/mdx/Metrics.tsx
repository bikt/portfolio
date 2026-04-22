interface MetricItem {
  label: string;
  before: string;
  after: string;
}

interface MetricsProps {
  items: MetricItem[];
}

export default function Metrics({ items }: MetricsProps) {
  return (
    <div className="py-16 border-t border-white/[0.06]">
      <span className="text-[10px] tracking-wide-label uppercase text-text-muted block mb-8">
        Результат / Results
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div key={i} className="border-t-2 border-white/10 pt-6">
            <p className="text-[11px] text-text-muted mb-4">{item.label}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-[16px] text-white/20 line-through">{item.before}</span>
              <span className="text-[32px] font-bold tracking-tight text-white">{item.after}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

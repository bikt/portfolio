import Image from 'next/image';

interface FinalDesignProps {
  images: string[];
  caption?: string;
}

export default function FinalDesign({ images, caption }: FinalDesignProps) {
  return (
    <div className="py-16 border-t border-white/[0.06]">
      <span className="text-[10px] tracking-wide-label uppercase text-text-muted block mb-8">
        Решение / Solution
      </span>
      <div className="space-y-4">
        {images.map((src, i) => (
          <div key={i} className="relative w-full aspect-[16/9] bg-white/[0.03] rounded-sm overflow-hidden">
            <Image
              src={src}
              alt={caption ?? `Design ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        ))}
      </div>
      {caption && (
        <p className="mt-4 text-[12px] text-text-muted">{caption}</p>
      )}
    </div>
  );
}

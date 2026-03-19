/*
 * Design: Neuro-Medical × 次世代アプローチ
 * 漫画画像: ホワイト背景にメディカルブルーのアクセントで信頼感
 */
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface MangaImageProps {
  src: string;
  alt: string;
  delay?: number;
}

export default function MangaImage({ src, alt, delay = 0 }: MangaImageProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`
        w-full max-w-lg mx-auto
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative rounded-xl overflow-hidden shadow-xl shadow-[#1E3A5F]/10 border border-[#3B6FA0]/15">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
    </div>
  );
}

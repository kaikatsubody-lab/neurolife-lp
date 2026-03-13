/*
 * Design: 次世代ウェルネス・エレガンス
 * CTAボタン: 立体的で大きなボタン・ホバーで光るエフェクト
 * 鮮やかなオレンジ系グラデーション
 */
import { ChevronRight } from "lucide-react";

interface CTAButtonProps {
  onClick: () => void;
  size?: "lg" | "md";
}

export default function CTAButton({ onClick, size = "lg" }: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden
        bg-gradient-to-r from-[#D4662A] via-[#E8783E] to-[#D4662A]
        text-white font-bold tracking-wider
        rounded-xl
        shadow-lg shadow-[#D4662A]/30
        animate-pulse-glow
        transition-all duration-300 ease-out
        hover:scale-[1.04] hover:shadow-xl hover:shadow-[#D4662A]/40 hover:brightness-110
        active:scale-95
        ${size === "lg" ? "px-10 sm:px-14 py-5 sm:py-6 text-base sm:text-xl" : "px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-lg"}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        今すぐ特典を受取る
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
    </button>
  );
}

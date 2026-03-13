/*
 * Design: Neuro-Science Elegance
 * CTAボタン: コーラルオレンジの脈動グロウエフェクト
 * クリックでモーダルフォームを表示
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
        bg-gradient-to-r from-[#E85D3A] via-[#F07A56] to-[#E85D3A]
        text-white font-bold tracking-wider
        rounded-lg
        animate-pulse-glow
        transition-all duration-300
        hover:scale-105 hover:brightness-110
        active:scale-95
        ${size === "lg" ? "px-10 py-5 text-lg sm:text-xl" : "px-8 py-4 text-base sm:text-lg"}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        今すぐ特典を受取る
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
    </button>
  );
}

/*
 * Design: SNS広告の心理技術 × 孤立効果
 * CTAボタン: 寒色系ベースに対する補色（オレンジ・イエロー系）
 * 行動喚起型テキスト + 希少性マイクロコピー
 */
import { ChevronRight, Clock } from "lucide-react";

interface CTAButtonProps {
  onClick: () => void;
  size?: "lg" | "md";
  showMicrocopy?: boolean;
}

export default function CTAButton({ onClick, size = "lg", showMicrocopy = true }: CTAButtonProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Scarcity micro-copy (above button) */}
      {showMicrocopy && (
        <div className="inline-flex items-center gap-1.5 bg-[#C85A20]/10 border border-[#C85A20]/25 px-4 py-1.5 rounded-full mb-3">
          <Clock className="w-3.5 h-3.5 text-[#C85A20]" />
          <span className="text-[#C85A20] text-[11px] sm:text-xs font-bold">
            少人数限定枠が埋まり次第、募集終了
          </span>
        </div>
      )}

      {/* CTA Button — Orange/Yellow isolation effect against blue base */}
      <button
        onClick={onClick}
        className={`
          group relative overflow-hidden
          bg-gradient-to-r from-[#D4662A] via-[#E8923E] to-[#D4662A]
          text-white font-bold
          rounded-xl
          shadow-lg shadow-[#D4662A]/30
          animate-pulse-glow
          transition-all duration-300 ease-out
          hover:scale-[1.04] hover:shadow-xl hover:shadow-[#D4662A]/40 hover:brightness-110
          active:scale-95
          ${size === "lg" ? "px-6 sm:px-10 py-5 sm:py-6 text-[14px] sm:text-lg" : "px-5 sm:px-8 py-4 sm:py-5 text-[13px] sm:text-base"}
        `}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 leading-[1.6]">
          <span className="text-center">
            オンライン越しに体感して、
            <br />
            一生モノの【次世代ケア】を手に入れる
          </span>
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
      </button>

      {/* Sub-note */}
      <p className="text-[#6B7B8B] text-[11px] sm:text-xs mt-3">
        ※ 画面越しに、その場で体感していただきます。
      </p>
    </div>
  );
}

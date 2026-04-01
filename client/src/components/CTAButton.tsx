import { ChevronRight } from "lucide-react";

interface CTAButtonProps {
  onClick: () => void;
  size?: "lg" | "md";
  showMicrocopy?: boolean;
}

export default function CTAButton({ onClick, size = "lg", showMicrocopy = true }: CTAButtonProps) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Pre-label: 今だけ無料プレゼント */}
      <div className="mb-2 inline-flex items-center gap-1.5 bg-[#FFF3E0] border border-[#E07030]/40 rounded-full px-4 py-1.5">
        <span className="text-[#C85A10] text-[12px] sm:text-[13px] font-bold tracking-wide">
          ＼今だけ無料プレゼント／
        </span>
      </div>

      {/* CTA Button — Orange, large, tap-friendly */}
      <button
        onClick={onClick}
        className={`
          group relative overflow-hidden w-full
          bg-gradient-to-r from-[#C85A10] via-[#E07030] to-[#C85A10]
          text-white font-bold
          rounded-2xl
          shadow-lg shadow-[#C85A10]/30
          animate-pulse-glow
          transition-all duration-300 ease-out
          hover:scale-[1.02] hover:shadow-xl hover:shadow-[#C85A10]/40 hover:brightness-110
          active:scale-95
          ${size === "lg"
            ? "px-6 sm:px-10 py-5 sm:py-6 min-h-[70px] sm:min-h-[80px]"
            : "px-5 sm:px-8 py-4 sm:py-5 min-h-[64px] sm:min-h-[72px]"}
        `}
        style={{ maxWidth: "520px" }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <span className="text-center leading-[1.6]">
            <span className={`block font-black ${size === "lg" ? "text-[18px] sm:text-[22px]" : "text-[16px] sm:text-[20px]"}`}>
              次世代ケアの秘密を公開！
            </span>
            <span className={`block font-black ${size === "lg" ? "text-[18px] sm:text-[22px]" : "text-[16px] sm:text-[20px]"}`}>
              電子書籍を受け取る
            </span>
          </span>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1 shrink-0" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </button>

      {/* Scarcity micro-copy (below button) */}
      {showMicrocopy && (
        <p className="text-[#7A5A3A] text-[11px] sm:text-xs mt-2.5 text-center">
          ※ 定員に達し次第、募集を締め切ります
        </p>
      )}
    </div>
  );
}

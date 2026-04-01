import { ChevronRight } from "lucide-react";

interface CTAButtonProps {
  onClick: () => void;
  size?: "lg" | "md";
  showMicrocopy?: boolean;
}

export default function CTAButton({ onClick, size = "lg", showMicrocopy = true }: CTAButtonProps) {
  return (
    <div className="flex flex-col items-center w-full">
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
          ${size === "lg" ? "px-6 sm:px-10 py-5 sm:py-6 text-[15px] sm:text-lg min-h-[60px]" : "px-5 sm:px-8 py-4 sm:py-5 text-[14px] sm:text-base min-h-[56px]"}
        `}
        style={{ maxWidth: "480px" }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 leading-[1.7]">
          <span className="text-center">
            「次世代ケアの秘密」を
            <br />
            <span className="text-[#FFE0A0] font-black">無料</span>で受け取る
          </span>
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0" />
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

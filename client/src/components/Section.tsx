import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  bgImage?: string;
  overlay?: boolean;
  id?: string;
}

export default function Section({ children, className = "", bgImage, overlay = false, id }: SectionProps) {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={bgImage ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } : undefined}
    >
      {overlay && (
        <div className="absolute inset-0 bg-[#0A0E1A]/80" />
      )}
      <div
        className={`
          relative z-10 transition-all duration-700 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {children}
      </div>
    </section>
  );
}

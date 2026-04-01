import { useState } from "react";
import { X } from "lucide-react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LINE_URL = "https://lin.ee/MJgjSQz";

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("お名前を入力してください");
      return;
    }
    if (!phone.trim()) {
      setError("電話番号を入力してください");
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
        }),
      });

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "ニューロライフメソッド個別相談申込",
        });
      }

      window.location.href = LINE_URL;
    } catch {
      window.location.href = LINE_URL;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#3D2B1A]/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-gradient-to-b from-[#FAF5EE] to-[#F5EFE6] border border-[#D4B896]/40 rounded-2xl p-5 sm:p-8 shadow-2xl shadow-[#3D2B1A]/20 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9A7A5A] hover:text-[#3D2B1A] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#C07840] to-transparent rounded-full" />

        {/* Header */}
        <div className="text-center mb-6 mt-2">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF3E0] border border-[#E07030]/40 rounded-full px-4 py-1.5 mb-3">
            <span className="text-[#C85A10] text-[12px] font-bold tracking-wide">＼今だけ無料プレゼント／</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#3D2B1A] font-serif leading-relaxed">
            次世代ケアの秘密を公開！
            <br />
            <span className="orange-gradient-text">電子書籍を受け取る</span>
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-[#5A3A1A] mb-2 font-medium">
              お名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田 花子"
              className="w-full px-4 py-3 bg-white border border-[#D4B896]/50 rounded-xl text-[#3D2B1A] placeholder-[#B0906A] focus:border-[#C07840] focus:ring-2 focus:ring-[#C07840]/20 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-[#5A3A1A] mb-2 font-medium">
              電話番号
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="090-1234-5678"
              className="w-full px-4 py-3 bg-white border border-[#D4B896]/50 rounded-xl text-[#3D2B1A] placeholder-[#B0906A] focus:border-[#C07840] focus:ring-2 focus:ring-[#C07840]/20 transition-all outline-none"
            />
          </div>

          {error && (
            <p className="text-[#C85A10] text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-[#C85A10] via-[#E07030] to-[#C85A10] text-white font-bold text-lg rounded-xl shadow-lg shadow-[#C85A10]/30 hover:brightness-110 hover:shadow-xl hover:shadow-[#C85A10]/40 transition-all disabled:opacity-50 animate-pulse-glow"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                送信中...
              </span>
            ) : (
              "次世代ケアの秘密を公開！電子書籍を受け取る"
            )}
          </button>

          <p className="text-xs text-[#9A7A5A] text-center leading-relaxed">
            ※ 送信後、LINE登録画面に移動します。
            <br />
            特典はLINE登録後すぐにお届けします。
          </p>
        </form>
      </div>
    </div>
  );
}

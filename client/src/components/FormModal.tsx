/*
 * Design: 次世代ウェルネス・エレガンス
 * フォームモーダル: アイボリー背景にゴールドアクセント
 * 名前・電話番号入力 → バックエンド送信（DB + Google Sheets） → LINE自動リダイレクト
 */
import { useState } from "react";
import { X } from "lucide-react";
import { trpc } from "@/lib/trpc";

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

  const submitLead = trpc.lead.submit.useMutation();

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
      // Send data to backend (DB + Google Sheets + Notification)
      await submitLead.mutateAsync({
        name: name.trim(),
        phone: phone.trim(),
      });

      // Track conversion with Meta Pixel
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "ニューロライフメソッド個別相談申込",
        });
      }

      // Redirect to LINE
      window.location.href = LINE_URL;
    } catch {
      // Even if backend fails, redirect to LINE
      window.location.href = LINE_URL;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#3A2E22]/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-gradient-to-b from-white to-[#FAF6F0] border border-[#D4A853]/30 rounded-2xl p-5 sm:p-8 shadow-2xl shadow-[#D4A853]/10 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8B7B6B] hover:text-[#3A2E22] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Gold accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#D4A853] to-transparent rounded-full" />

        {/* Header */}
        <div className="text-center mb-6 mt-2">
          <p className="text-[#B8860B] text-sm font-medium tracking-widest mb-2">
            無料個別体験 & 相談会
          </p>
          <h3 className="text-lg sm:text-2xl font-bold text-[#3A2E22] font-serif leading-relaxed">
            特別特典を受け取って
            <br />
            <span className="gold-gradient-text">個別相談に申し込む</span>
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-[#6B5B4B] mb-2 font-medium">
              お名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田 花子"
              className="w-full px-4 py-3 bg-white border border-[#D4A853]/25 rounded-xl text-[#3A2E22] placeholder-[#B8A898] focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-[#6B5B4B] mb-2 font-medium">
              電話番号
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="090-1234-5678"
              className="w-full px-4 py-3 bg-white border border-[#D4A853]/25 rounded-xl text-[#3A2E22] placeholder-[#B8A898] focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20 transition-all outline-none"
            />
          </div>

          {error && (
            <p className="text-[#C85A20] text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-[#D4662A] via-[#E8783E] to-[#D4662A] text-white font-bold text-lg rounded-xl shadow-lg shadow-[#D4662A]/30 hover:brightness-110 hover:shadow-xl hover:shadow-[#D4662A]/40 transition-all disabled:opacity-50 animate-pulse-glow"
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
              "今すぐ特典を受取る"
            )}
          </button>

          <p className="text-xs text-[#8B7B6B] text-center leading-relaxed">
            ※ 送信後、LINE登録画面に移動します。
            <br />
            特典はLINE登録後すぐにお届けします。
          </p>
        </form>
      </div>
    </div>
  );
}

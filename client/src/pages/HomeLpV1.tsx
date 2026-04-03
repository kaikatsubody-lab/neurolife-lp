/*
 * ====================================================
 * ニューロライフメソッド・マスター講座 広告用LP
 * ====================================================
 * Design: スマホファースト・ブロック型デザイン
 * - アイボリー背景 × シャンパンゴールド × モカブラウン
 * - 重要テキストはブロック型で視認性UP
 * - コラージュ写真で講座・リトリートの空気感を伝える
 * ====================================================
 */
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import CTAButton from "@/components/CTAButton";
import FormModal from "@/components/FormModal";
import GoldDivider from "@/components/GoldDivider";
import MangaImage from "@/components/MangaImage";
import Section from "@/components/Section";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown, Star, CheckCircle, Gift, Clock, Users, MessageCircle, MapPin, Globe } from "lucide-react";

// CDN URLs for manga images
const MANGA = {
  m1: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/1_93e01fa8.jpg",
  m2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/2_eb4eee1e.jpg",
  m3: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/3_ab3a35b2.jpg",
  m4: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/4_318c7bc8.jpg",
  m5: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/5_a9756dd5.jpg",
  m6: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/6_43ad0a41.jpg",
  m7: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/7_95e27ef0.jpg",
  m8: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/8_5cbb5337.jpg",
  m9: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/9_0ff2fef1.jpg",
  m10: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/10_d4e1e88d.jpg",
  m11: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/11_d63a39f0.jpg",
};

// Background images
const BG = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/hero-bg-light_79530732.jpg",
  cta: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/cta-bg-warm_a2e26596.jpg",
  brainBody: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/brain-body-concept-KCVTzzdqnC6sX7XCqUBhKu.webp",
};

// Collage photos (new)
const COLLAGE = {
  kouza: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/kouza-collage_5c83c006.jpg",
  retreat: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/retreat-collage_b992dd99.jpg",
};

// Testimonial data
const testimonials = [
  {
    name: "60代女性（元主婦・セラピスト開業）",
    icon: "\u{1F469}",
    text: "私は長年、週3日のパートだけで体がキツく、午後は寝込むこともよくありました。それが今では信じられないくらい元気になって、\u201Cもっと動きたい！\u201Dって思えるようになったんです。周りからも『若返ってない！？』と言われるようになり、還暦直前に\u201C開業\u201Dするなんて、数年前の私なら想像すらできませんでした。孫とケアを返し合うようになり、代々受け継がれていくと思うと、お金では買えない人生の宝物になりました。",
  },
  {
    name: "整骨院の男性の先生",
    icon: "\u{1F468}\u200D\u2695\uFE0F",
    text: "こんなに短時間で、優しく触れるだけなので、施術する自分の動きもラク。『今まではなんだったんだ！』という気持ちでいっぱいです！これまで、患者さんには申し訳ないけれど、なかなか対応しきれず、ある程度は仕方のないものだと思っていました。でも受講後、『えっ、これだけ？』という手技で、これまで変化しにくかった状態がみるみる改善していることに、私自身が一番驚いています。",
  },
  {
    name: "50代女性",
    icon: "\u{1F469}",
    text: "10年以上、週3回は整体や整骨院に通っていました。行かないと体がつらくて、仕事にも支障が出るほどでした。でも、この講座を受け始めてからは……1度も通っていないんです！それに気づいた時、本当に驚きました。優しく触れるだけなのに、自分の体も、猫背だった息子の姿勢もどんどん変化し、気づけば息子の成績まで変わっていて。\u201C自分の手で家族を整えられる\u201Dって、こんなにも安心なんだと初めて知りました。",
  },
  {
    name: "家庭内別居の危機から、夫婦の絆と自分の夢を実現！",
    icon: "\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
    text: "主人への不信感や将来への不安から、当時は家庭内別居状態でした。心身の重さから子どもたちにもつい感情的になってしまい、「なんとかこの現状を変えたい」とワラにもすがる思いで参加しました。そこで「情報伝達のシステム」をリセットしたところ、驚くほど自分の中のイライラが消え、夫婦仲が劇的に改善。お互いを褒め合い、感謝し合えるパートナーシップを取り戻すことができました。さらに、未来への回路が繋がったことで主人の仕事も大きく飛躍し、私自身も諦めかけていた「自分のカフェ」を持つことができました！子供たちや、親へのケアもできて、あれだけ毎日息苦しかったのが嘘のように、今は家族全員で豊かな毎日を送っています。",
  },
];

/* Wave SVG divider */
function WaveDivider({ flip = false, color = "#F7F3EE" }: { flip?: boolean; color?: string }) {
  return (
    <div className={`w-full leading-[0] ${flip ? "rotate-180" : ""}`} style={{ marginTop: "-1px", marginBottom: "-1px" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={color} />
      </svg>
    </div>
  );
}

/* Highlight block - 重要テキストを目立たせるブロック */
function HighlightBlock({ children, variant = "gold" }: { children: React.ReactNode; variant?: "gold" | "orange" | "white" }) {
  const styles = {
    gold: "bg-gradient-to-br from-[#D4A853]/10 to-[#B8860B]/5 border-l-[4px] border-[#D4A853]",
    orange: "bg-gradient-to-br from-[#C85A20]/8 to-[#E8783E]/5 border-l-[4px] border-[#C85A20]",
    white: "bg-white/90 border border-[#D4A853]/20 shadow-lg shadow-[#D4A853]/5",
  };
  return (
    <div className={`${styles[variant]} rounded-xl p-5 sm:p-7 my-6 sm:my-8`}>
      {children}
    </div>
  );
}

/* Photo collage - 講座＆リトリートのコラージュ写真 */
function PhotoCollage() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Title badge */}
      <div className="text-center mb-5 sm:mb-6">
        <div className="inline-flex items-center gap-2 bg-[#D4A853]/10 px-4 py-2 rounded-full mb-3">
          <MapPin className="w-4 h-4 text-[#B8860B]" />
          <span className="text-[#8B6914] text-[13px] sm:text-sm font-bold tracking-wider">九州から東京、海外まで開催</span>
        </div>
        <p className="text-[#6B5B4B] text-[13px] sm:text-sm leading-[1.8]">
          講座・リトリートの雰囲気をご覧ください
        </p>
      </div>

      {/* Collage images - large, impactful display */}
      <div className="space-y-4 sm:space-y-5">
        {/* 講座写真 */}
        <div className="rounded-2xl overflow-hidden shadow-xl shadow-[#3A2E22]/10 border border-[#D4A853]/15">
          <img
            src={COLLAGE.kouza}
            alt="講座の様子 - 施術実習・グループワーク"
            className="w-full h-auto"
            loading="lazy"
          />
          <div className="bg-white/95 px-4 py-3 text-center">
            <p className="text-[#8B6914] text-[13px] sm:text-sm font-bold">全国各地での講座風景</p>
            <p className="text-[#8B7B6B] text-[11px] sm:text-xs mt-0.5">未経験者からプロまで、実践的な技術習得</p>
          </div>
        </div>

        {/* リトリート写真 */}
        <div className="rounded-2xl overflow-hidden shadow-xl shadow-[#3A2E22]/10 border border-[#D4A853]/15">
          <img
            src={COLLAGE.retreat}
            alt="リトリートの様子 - ハワイ・沖縄・各地"
            className="w-full h-auto"
            loading="lazy"
          />
          <div className="bg-white/95 px-4 py-3 text-center">
            <p className="text-[#8B6914] text-[13px] sm:text-sm font-bold">国内外でのリトリート</p>
            <p className="text-[#8B7B6B] text-[11px] sm:text-xs mt-0.5">日常から離れ、心身を深く解放する特別な時間</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-5 mt-5 text-[12px] sm:text-xs text-[#8B7B6B]">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
          全国9都府県で開催
        </span>
        <span className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#B8860B]" />
          海外からも参加
        </span>
      </div>
    </div>
  );
}

export default function HomeLpV1() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#3A2E22] overflow-x-hidden">
      <FormModal isOpen={isFormOpen} onClose={closeForm} />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${BG.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F3EE]/40 via-transparent to-[#F7F3EE]/90" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 py-14 sm:py-20 text-center">
          {/* Pre-head */}
          <p className="text-[#8B6914] text-[13px] sm:text-base tracking-[0.08em] sm:tracking-[0.15em] mb-6 sm:mb-8 font-medium animate-fade-in-up leading-[2]">
            「何とかしてあげたい」のに、
            <br />
            想いに応えられず涙したことのあるあなたへ。
          </p>

          {/* Main Copy - ブロック型 */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 sm:p-8 mb-6 sm:mb-8 border border-[#D4A853]/15">
              <p className="text-[#6B4226] text-[13px] sm:text-lg mb-4 sm:mb-5 leading-[2]">
                このまま、終わりの見えない
                <br />
                「その場しのぎのケア」で消耗し続けるか。
              </p>
              <p className="text-[#B8860B] text-[12px] sm:text-base mb-4 sm:mb-5 italic">それとも――</p>
              <h1 className="font-serif text-[20px] sm:text-2xl md:text-3xl lg:text-[2.5rem] font-bold leading-[1.9] sm:leading-[1.9] text-[#3A2E22]">
                伝達エラーを<span className="gold-gradient-text">リセット</span>し、
                <br />
                時間も労力も減るのに、
                <br />
                家族やお客様から
                <br className="sm:hidden" />
                <span className="gold-gradient-text">感謝</span>されながら
                <br />
                豊かになる
              </h1>
              <p className="mt-4 sm:mt-5 text-[#8B6914] font-serif text-[17px] sm:text-xl font-bold">
                【次世代のセラピスト】
                <br className="sm:hidden" />
                として突き抜けるか。
              </p>
            </div>
          </div>

          {/* Sub copy */}
          <div className="mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-[#6B4226] text-[13px] sm:text-base leading-[2] mb-3">
              原因探しも、力任せの強い施術も、難しい専門知識も、
            </p>
            <p className="text-[17px] sm:text-xl font-serif font-bold text-[#3A2E22]">
              実はもう<span className="text-[#C85A20]">『過去の常識！？』</span>
            </p>
          </div>

          {/* Method description - ブロック型 */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-5 sm:p-7 mb-6 sm:mb-8 text-[#5A4A3A] text-[13px] sm:text-base leading-[2.2]">
              <p className="mb-4">
                脳・心・体を繋ぐ「伝達ネットワーク」を正常化し、
                <br />
                人間が本来持つ<strong className="text-[#3A2E22]">【自然治癒力】</strong>を
                <br className="sm:hidden" />
                最大限に引き出す、次世代のアプローチ。
              </p>
              <p className="mb-4">
                嘘をつけない「肉体の反応」をモニターにし、
                <br />
                優しく触れるだけ。
              </p>
              <p className="mb-4">
                人間のシステムの大元をフラットな状態に戻すことで、
                長年繰り返す不調のサインを手放すだけでなく、
                パートナーシップや仕事など
                <strong className="text-[#8B6914]">「望む幸せな未来」</strong>へと
                自動的に動き出し始めます。
              </p>
              <p>
                「次世代のケア」を、
                未経験のあなたでも、その日から実践できる
                <strong className="text-[#3A2E22]">一生モノのスキル</strong>に。
              </p>
            </div>
          </div>

          {/* Program title - ブロック型 */}
          <div className="mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
            <div className="bg-white/70 backdrop-blur-sm border border-[#D4A853]/30 rounded-2xl p-5 sm:p-8 inline-block">
              <p className="font-serif text-[17px] sm:text-xl md:text-2xl font-bold text-[#3A2E22] leading-[1.8] mb-2">
                'ニューロライフメソッド・マスター講座'
              </p>
              <p className="text-[#6B4226] text-[12px] sm:text-sm leading-[2]">
                〜家族のケアから、一生のシゴトまで。
                <br />
                あなたの「優しい手」を結果で選ばれる
                <br />
                <strong className="text-[#8B6914]">【一生の宝物】</strong>に変える完全習得プログラム〜
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <p className="font-serif text-[15px] sm:text-lg text-[#6B4226] leading-[2] mb-2">
              「本当に、優しく触れるだけで、
              <br />
              そんなに変わるの？」
            </p>
            <p className="text-[#5A4A3A] text-[13px] sm:text-base mb-5 sm:mb-6 leading-[2]">
              オンライン越しに「あなたの体」で証明させてください。
            </p>
            <CTAButton onClick={openForm} />
            <p className="text-[#8B7B6B] text-[11px] sm:text-xs mt-4">
              ※ 画面越しに、その場で体感していただきます。
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-[#B8860B]/50" />
          </div>
        </div>
      </section>

      <WaveDivider color="#F7F3EE" />

      {/* ============================================ */}
      {/* 漫画パート① */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-24 bg-[#F7F3EE]">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#B8860B] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase">Story</p>
            <h2 className="font-serif text-[20px] sm:text-2xl md:text-3xl font-bold leading-relaxed text-[#3A2E22]">
              交差する<span className="gold-gradient-text">2つの悩み</span>
            </h2>
          </div>
          <div className="space-y-5 sm:space-y-6">
            <MangaImage src={MANGA.m1} alt="漫画1 - 体の不調に悩む主婦" />
            <MangaImage src={MANGA.m2} alt="漫画2 - 技術はあるのに変化につながらないセラピスト" delay={100} />
            <MangaImage src={MANGA.m3} alt="漫画3 - 二人の決意" delay={200} />
          </div>
        </div>
      </Section>

      <WaveDivider color="#FAF6F0" />

      {/* ============================================ */}
      {/* テキストエリア① - 過去の常識の破壊 */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-24 bg-[#FAF6F0]">
        <div className="max-w-3xl mx-auto px-5">
          {/* 導入 */}
          <div className="text-center mb-8 sm:mb-14">
            <p className="font-serif text-[16px] sm:text-xl md:text-2xl leading-[2.2] text-[#5A4A3A]">
              「どうして、こんなに頑張っているのに
              <br />
              変わらないのだろう？」
            </p>
            <GoldDivider />
          </div>

          <HighlightBlock variant="gold">
            <p className="text-[#6B5B4B] text-[13px] sm:text-base leading-[2.2] mb-3">
              あなたがもし、そうやって自分を責めているのだとしたら、今日で終わりにしてください。
            </p>
            <p className="text-[#6B5B4B] text-[13px] sm:text-base leading-[2.2]">
              思うように変わらなかったのは、あなたの努力不足でも、才能がないからでもありません。
            </p>
            <p className="text-[15px] sm:text-lg font-serif font-bold text-[#8B6914] mt-4 leading-[2]">
              あなたが信じてきた「良くなるための常識」が、
              <br />
              実はもう時代遅れだったからです。
            </p>
          </HighlightBlock>

          {/* 3つの過去の常識 */}
          <div className="space-y-5 sm:space-y-8 mt-8 sm:mt-10">
            <OldBeliefCard
              number="01"
              title="「強く揉みほぐせば良くなる」"
              description="体を力任せに強く揉みほぐしても、体は「攻撃された」と勘違いして、身を守るために再び硬くなってしまったり、その場しのぎで元に戻ってしまいます。体をラクにするためのはずが、どんどん壊していく方向に導いているということです。また、「強さ」と「深さ」は別物ですが、それを混同して「深さ」ではなく「強さ」を求めてしまい、お客様のお体だけではなく、施術者自身の体の負担にもなっています。"
            />
            <OldBeliefCard
              number="02"
              title="「何年もの修行と専門知識が必要」"
              description="体は、未だ解明されていないことがとても多くあります。専門知識を詰め込み、囚われた'頭の知識'だけで探ろうとすればするほど改善しにくくなります。実際に、未経験の方が、受講初日からプロの治療家の先生方が驚くような変化を出されています。"
            />
            <OldBeliefCard
              number="03"
              title="「原因を探したり、取り除くことで改善する」"
              description="実は「原因」なんて突き止めなくてもいいのです。なぜ悪くなったのか？より、そのことがなかったらどうなっているのか？の、未来にフォーカスすることで、体は反応し改善に繋がっていきます。"
            />
          </div>

          {/* 結論 - ブロック型 */}
          <HighlightBlock variant="white">
            <p className="text-[#5A4A3A] text-[13px] sm:text-base leading-[2.2] mb-4 text-center">
              これまでのアプローチが上手くいかなかった最大の理由。
              <br />
              それは、肉体の改善のために、
              <br />
              <strong className="text-[#3A2E22]">肉体だけをみて扱ってきたこと。</strong>
            </p>
            <p className="font-serif text-[15px] sm:text-lg font-bold text-[#8B6914] leading-[2] text-center">
              本来は、繋がっているはずの
              <br />
              「思考」「感情」「肉体」を、
              <br />
              それぞれバラバラに切り離して
              <br />
              扱おうとしてきたからです。
            </p>
          </HighlightBlock>
        </div>
      </Section>

      <WaveDivider flip color="#FAF6F0" />

      {/* ============================================ */}
      {/* 漫画パート② */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-24 bg-[#F7F3EE]">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#B8860B] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase">Mechanism</p>
            <h2 className="font-serif text-[20px] sm:text-2xl md:text-3xl font-bold leading-relaxed text-[#3A2E22]">
              出会いと<span className="gold-gradient-text">メカニズム解説</span>
            </h2>
          </div>
          <div className="space-y-5 sm:space-y-6">
            <MangaImage src={MANGA.m4} alt="漫画4 - 先生との出会い" />
            <MangaImage src={MANGA.m5} alt="漫画5 - 伝達ネットワークの解説" delay={100} />
            <MangaImage src={MANGA.m6} alt="漫画6 - 体験と驚き" delay={200} />
          </div>
        </div>
      </Section>

      <WaveDivider color="#FAF6F0" />

      {/* ============================================ */}
      {/* テキストエリア② - メソッドがもたらす本当の価値 */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-24 bg-[#FAF6F0]">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#B8860B] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase">True Value</p>
            <h2 className="font-serif text-[20px] sm:text-2xl md:text-3xl font-bold leading-relaxed text-[#3A2E22]">
              メソッドがもたらす
              <br />
              <span className="gold-gradient-text">本当の価値</span>
            </h2>
          </div>

          {/* Brain-body image */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <img
              src={BG.brainBody}
              alt="思考・感情・肉体の伝達ネットワーク"
              className="w-44 sm:w-64 h-auto rounded-2xl shadow-xl shadow-[#D4A853]/10 border border-[#D4A853]/15"
            />
          </div>

          <HighlightBlock variant="gold">
            <p className="text-[#5A4A3A] text-[13px] sm:text-base leading-[2.2]">
              肉体が緩み整うことは、<strong className="text-[#8B6914]">「叶う未来への回路」</strong>が繋がること。
            </p>
          </HighlightBlock>

          <div className="text-[#5A4A3A] text-[13px] sm:text-base leading-[2.2] space-y-4">
            <p>
              漫画の中で二人が体験したように、嘘をつけない「肉体反応（触覚）」を通じて見えない領域の状態を正確にモニタリングし、優しく触れて伝達ネットワークのバグをリセットする。
              これが<strong className="text-[#3A2E22]">『ニューロライフメソッド』</strong>の最大の特徴です。
            </p>
            <p>
              システムが正常化し、本来のフラットな状態に戻れば、体に起こっていた不調のサインが消え去るのは、ほんの<strong className="text-[#3A2E22]">「結果の一部」</strong>に過ぎません。
            </p>
          </div>

          <HighlightBlock variant="white">
            <p className="font-serif text-[15px] sm:text-lg font-bold text-center text-[#8B6914] leading-[2] mb-3">
              本当の驚きは、その後に起こります。
            </p>
            <p className="text-[#5A4A3A] text-center leading-[2.2] text-[13px] sm:text-base mb-3">
              思考やイメージ、本音（YES）かズレ（NO）かといった
              見えない世界を肉体の反応で瞬時に読み解く。
            </p>
            <p className="text-[#5A4A3A] text-center leading-[2.2] text-[13px] sm:text-base">
              過去の重い鎧を脱ぎ捨て、頑張る努力を手放した瞬間から、
              パートナーシップ、仕事、人間関係など、
              人生のあらゆる側面が最高のパフォーマンスを発揮し始めます。
            </p>
          </HighlightBlock>

          <p className="text-center font-serif text-[14px] sm:text-base text-[#3A2E22] leading-[2.2]">
            思考や感情をコントロールしようと必死に頑張らなくても、
            自動的に<span className="text-[#8B6914] font-bold">「望む幸せな現実」</span>へと
            動き出し始めるのです。
          </p>
        </div>
      </Section>

      <WaveDivider flip color="#FAF6F0" />

      {/* ============================================ */}
      {/* CTA中間 */}
      {/* ============================================ */}
      <section
        className="relative py-12 sm:py-20"
        style={{ backgroundImage: `url(${BG.cta})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#F7F3EE]/60 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-2xl mx-auto px-5 text-center">
          <p className="font-serif text-[16px] sm:text-xl md:text-2xl font-bold text-[#3A2E22] leading-[2] mb-3 sm:mb-4">
            「本当に、優しく触れるだけで、
            <br />
            そんなに変わるの？」
          </p>
          <p className="text-[#6B5B4B] text-[13px] sm:text-base mb-6 sm:mb-8 leading-[2]">
            オンライン越しに「あなたの体」で証明させてください。
          </p>
          <CTAButton onClick={openForm} />
          <p className="text-[#8B7B6B] text-[11px] sm:text-xs mt-4">
            ※ 画面越しに、その場で体感していただきます。
          </p>
        </div>
      </section>

      <WaveDivider color="#F7F3EE" />

      {/* ============================================ */}
      {/* 漫画パート③ */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-24 bg-[#F7F3EE]">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#B8860B] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase">Happy Future</p>
            <h2 className="font-serif text-[20px] sm:text-2xl md:text-3xl font-bold leading-relaxed text-[#3A2E22]">
              動き出す<span className="gold-gradient-text">「幸せな未来」</span>
            </h2>
          </div>
          <div className="space-y-5 sm:space-y-6">
            <MangaImage src={MANGA.m7} alt="漫画7 - 数ヶ月後の変化" />
            <MangaImage src={MANGA.m8} alt="漫画8 - 開業の夢" delay={100} />
            <MangaImage src={MANGA.m9} alt="漫画9 - お客様との関わり" delay={200} />
            <MangaImage src={MANGA.m10} alt="漫画10 - 次はあなたの番" delay={300} />
            <MangaImage src={MANGA.m11} alt="漫画11 - 先生からのメッセージ" delay={400} />
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <CTAButton onClick={openForm} />
          </div>
        </div>
      </Section>

      <WaveDivider color="#FAF6F0" />

      {/* ============================================ */}
      {/* 実績・受講生の声 */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-24 bg-[#FAF6F0]">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-4">
            <p className="text-[#B8860B] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase">Results</p>
            <h2 className="font-serif text-[19px] sm:text-2xl md:text-3xl font-bold leading-[1.8] mb-4 text-[#3A2E22]">
              「今までは何だったんだ！」
              <br />
              <span className="gold-gradient-text">プロも未経験者も驚愛する、</span>
              <br />
              人生が動いた数々の事実
            </h2>
          </div>

          <HighlightBlock variant="gold">
            <p className="text-[#6B5B4B] text-[13px] sm:text-base leading-[2.2] text-center">
              漫画のストーリーは、決して作り話ではありません。
              人間の持つ「自然治癒力」のメカニズムに基づいたアプローチだからこそ、
              私がやっても、未経験のあなたがやっても、プロのボディワーカーがやっても、
              <strong className="text-[#3A2E22]">同じように圧倒的な結果が出る</strong>のです。
            </p>
          </HighlightBlock>

          <div className="space-y-5 sm:space-y-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} delay={i * 100} />
            ))}
          </div>

          <p className="text-[11px] sm:text-xs text-[#8B7B6B] text-center mt-6">
            ※上記は個人の感想であり、成果や成功を保証するものではありません。
          </p>
        </div>
      </Section>

      <WaveDivider flip color="#FAF6F0" />

      {/* ============================================ */}
      {/* 主宰者プロフィール */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-24 bg-[#F7F3EE]">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#B8860B] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase">Profile</p>
            <h2 className="font-serif text-[19px] sm:text-2xl md:text-3xl font-bold leading-[1.8] text-[#3A2E22]">
              「諦め」を「希望」に変える。
              <br />
              <span className="gold-gradient-text">私がこのメソッドに行き着いた理由</span>
            </h2>
          </div>

          <div className="bg-white/80 border border-[#D4A853]/15 rounded-2xl p-5 sm:p-10 backdrop-blur-sm shadow-lg shadow-[#D4A853]/5">
            {/* Name & stats */}
            <div className="text-center mb-6">
              <p className="text-[#8B6914] font-serif text-lg sm:text-xl font-bold mb-1">
                橋本 みき
              </p>
              <p className="text-[#6B5B4B] text-[13px] sm:text-sm">
                『ニューロライフメソッド』開発者
              </p>
              <div className="flex items-center justify-center gap-4 mt-3 text-[12px] sm:text-xs text-[#8B7B6B]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#B8860B]" />
                  施術歴27年
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#B8860B]" />
                  のべ5万人以上
                </span>
              </div>
            </div>

            <div className="space-y-4 text-[#5A4A3A] text-[13px] sm:text-base leading-[2.2]">
              <p>
                申し遅れました。『ニューロライフメソッド』開発者の、橋本 みきと申します。
              </p>
              <p>
                プロの施術家としてのキャリアは27年になりますが、実は幼少期から人の体に触れる機会が多くありました。私自身がスポーツで怪我を繰り返していたこともあり、学生時代に怪我で練習に参加できない時は、なぜかチームメイトではなく「監督」のケアを何時間も任されたり、大学時代にはトレーナーを務めるなど、文字通り「生涯にわたって」人の身体と向き合い続けてきました。
              </p>
              <p>
                ただの感覚や自己流で終わらせないため、体育大学へ進学して解剖学や運動学など「人体の構造」を学術的に深く学び、その後も国際ライセンスをはじめとする数々の専門技術（ディプロマ）を取得してきました。
              </p>
              <p>
                その確かな理論と技術をベースに、これまでに親子で通われる小さなお子さんから第一線で活躍するプロ選手、深いお悩みを抱える方からVIP層の方まで、のべ5万人以上のお身体の声を聴かせていただきました。
              </p>
              <p>
                現在は、ラグジュアリーリゾートホテル内にてサロンを運営。一流の環境でお客様を癒やす傍ら、現場の最前線で活躍するプロのセラピストはもちろん、大切な家族の健康を守りたいと願う未経験の主婦の方々に至るまで、幅広い層に向けて技術指導を行っています。
              </p>

              {/* 転機 - ブロック型 */}
              <HighlightBlock variant="orange">
                <p className="text-[#5A4A3A] text-[13px] sm:text-base leading-[2.2]">
                  私がなぜ、このメソッドを開発し、全国へお伝えしているのか。それは、<strong className="text-[#3A2E22]">私自身がかつて、ドクターから「40代で歩けなくなる」と告げられるほどの不調に絶望した経験がある</strong>からです。
                </p>
              </HighlightBlock>

              <p>
                子供の頃からスポーツに打ち込んでいましたが、毎年のように全身に大きな怪我を繰り返していました。小学5年生ですでに現在の身長まで伸びていたのに、腰を傷めてからピタリと成長が止まり、選抜チームから漏れ、希望の進学先すら断念するという挫折の連続でした。
              </p>
              <p>
                さらに30代の頃。解剖学を学んでいた外科医のドクターから、「このままだと腕は上がらなくなるし、自分の足で歩くのも困難になる。今すぐ手術をしなさい」と何度も宣告されました。ですが当時の私は、「仕事を休みたくない！」という一心で、断固として手術を拒否したのです。年齢を重ねれば、過去の怪我の後遺症が重く出てくるのは仕方のないこと。私自身が最初はそう諦めかけていました。
              </p>
              <p>
                ですが、多くの方が様々なお悩みを抱えているのを目の当たりにしていると、「もっと何か根本的な解決策があるはず！」という思いはどんどん増すばかりで、世界中の手技、脳科学、身体の調整法、心理学、エネルギー療法など……様々なことを学び、自分の身体を実験台にして検証を繰り返しました。
              </p>

              {/* 発見 - ブロック型 */}
              <HighlightBlock variant="gold">
                <p className="font-serif text-[15px] sm:text-lg text-[#8B6914] font-bold leading-[2]">
                  「体を改善するために、"体だけ"を治そうとしても決して良くならない」
                </p>
                <p className="text-[#8B7B6B] text-[12px] sm:text-sm mt-2">
                  ── そこで辿り着いた衝撃的な事実
                </p>
              </HighlightBlock>

              <p>
                20年以上の現場経験と、自身の体を通じた実験から、「肉体だけを強く揉みほぐしても、思考と感情のエラー（バグ）が残っていればすぐに元の不調に戻ってしまう」という真理に到達したのです。
              </p>
              <p>
                重要なのは「伝達ネットワークのエラー」という概念でした。思考と感情と肉体。この3つを同時にみてアプローチしていくことが不可欠だったのです。
              </p>
              <p>
                思考・感情・肉体を繋ぐ伝達エラーを、モニターである"肉体の反応"を通じて見つけ出し、"極めて優しいタッチ"で自らの体をリセットし続けた結果……。
              </p>

              {/* 結果 - ブロック型 */}
              <HighlightBlock variant="white">
                <p className="text-[#3A2E22] text-[14px] sm:text-base leading-[2.2] text-center font-bold">
                  気付けば、子供の頃から抱えていた不調が嘘のように消え去り、後遺症すらも無くなっていました。
                </p>
                <p className="text-[#8B6914] text-[14px] sm:text-base leading-[2.2] text-center font-bold mt-2">
                  それどころか、スポーツ現役時代よりも可動域が広がり、滑らかな動きを取り戻してしまったのです。
                </p>
              </HighlightBlock>

              <p>
                今、医療や教育の現場は待ったなしの状況です。だからこそ、一部の天才にしかできない感覚を削ぎ落とし、特別な才能や力に頼らず、未経験のあなたでも「大切な家族を守り、プロとして圧倒的に感謝されながら豊かになる」ための本質的なアプローチとして体系化したのが<strong className="text-[#8B6914]">『ニューロライフメソッド』</strong>です。
              </p>

              {/* 講座開催実績 + 写真コラージュ */}
              <div className="bg-[#F7F3EE] rounded-xl p-4 sm:p-6 my-4">
                <p className="text-[#3A2E22] font-serif font-bold text-[14px] sm:text-base mb-3">
                  講座の広がり
                </p>
                <p className="text-[#5A4A3A] text-[13px] sm:text-sm leading-[2.2]">
                  現在、このメソッドは私の想像を超えて広がりを見せています。これまでの講座は、大分、宮崎、鹿児島、福岡、沖縄といった九州・沖縄各県をはじめ、山口、大阪、東京で開催。さらにオンラインを通じて、日本全国のみならずシンガポールなど海外からも受講生が参加してくださるようになりました。
                </p>
                <p className="text-[#5A4A3A] text-[13px] sm:text-sm leading-[2.2] mt-2">
                  また、講座の枠を超え、日常から離れて心身を深く解放する「国内外でのリトリート」も開催しており、その共感の輪は着実に世界へと広がっています。
                </p>
              </div>

              {/* Photo Collage */}
              <PhotoCollage />
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="font-serif text-[14px] sm:text-lg text-[#3A2E22] italic leading-[2]">
                「99%ダメだと言われても、1%の可能性があるなら、
                <br />
                それは希望に変えられる」
              </p>
              <p className="text-[#6B5B4B] text-[13px] sm:text-sm mt-2">私はそう信じています。</p>
              <p className="text-[#6B5B4B] text-[13px] sm:text-sm mt-3 leading-[2]">
                次は、オンライン越しに「あなたの体」で、
                <br />
                その希望を証明させてください。
                <br />
                個別相談会でお会いできることを、心より楽しみにしています。
              </p>
            </div>
          </div>
        </div>
      </Section>

      <WaveDivider color="#FAF6F0" />

      {/* ============================================ */}
      {/* こんな方におすすめ */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-24 bg-[#FAF6F0]">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#B8860B] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase">For You</p>
            <h2 className="font-serif text-[18px] sm:text-2xl md:text-3xl font-bold leading-[1.9] text-[#3A2E22]">
              最初は「本当に私にできるのかな…」と
              <br />
              迷いながらも、一歩を踏み出した人が、
              <br />
              <span className="gold-gradient-text">"人生を変える手"</span>を手にしてきました。
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
            {/* 未経験・主婦 */}
            <div className="bg-white/80 border border-[#D4A853]/15 rounded-2xl p-5 sm:p-8 shadow-lg shadow-[#D4A853]/5">
              <h3 className="font-serif text-[16px] sm:text-lg font-bold text-[#8B6914] mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#D4A853]/10 flex items-center justify-center text-sm">{"\uD83C\uDF31"}</span>
                未経験・主婦の方へ
              </h3>
              <p className="text-[#6B5B4B] text-[13px] sm:text-sm mb-4 leading-[2]">
                あなた自身が、家族を守る「次世代セラピスト」になれます。
              </p>
              <ul className="space-y-2">
                {[
                  "自分や家族の不調をどうにかしたい",
                  "専門家じゃなくても、人の役に立ちたい",
                  "いつかは「一生の宝物」をシゴトにして自立したい",
                  "何年も変わらない現実を、ここで終わらせたい",
                  "ただの体のケアではなく、子供たちの能力開発に興味がある",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] sm:text-sm text-[#5A4A3A] leading-[1.9]">
                    <CheckCircle className="w-4 h-4 text-[#B8860B] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* プロ・開業志望 */}
            <div className="bg-white/80 border border-[#D4A853]/15 rounded-2xl p-5 sm:p-8 shadow-lg shadow-[#D4A853]/5">
              <h3 className="font-serif text-[16px] sm:text-lg font-bold text-[#8B6914] mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#D4A853]/10 flex items-center justify-center text-sm">{"\u2B50"}</span>
                プロ・開業志望の方へ
              </h3>
              <p className="text-[#6B5B4B] text-[13px] sm:text-sm mb-4 leading-[2]">
                あなたの技術と経験に、「本質的なアプローチ」が加わります。対症療法から抜け出し、結果で選ばれる「次世代セラピスト」として圧倒的なポジションへ。
              </p>
              <ul className="space-y-2">
                {[
                  "様々な勉強をしたが、思うような変化につながらない",
                  "対症療法ではなく、もっと本質的なものを探している",
                  "お客様はもちろん、自分の人生ももっと体力・時間・豊かさすべてに余裕を持ちたい",
                  "肉体の改善はもちろん、メンタルヘルスや、お客様の「本来の能力を引き出し、望む未来を叶える」アプローチも取り入れたい",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] sm:text-sm text-[#5A4A3A] leading-[1.9]">
                    <CheckCircle className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-[#5A4A3A] text-[13px] sm:text-base leading-[2.2] mt-6 sm:mt-10">
            そんな「自分や大切な人を守れる力」を、
            <br />
            未経験からでも無理なく育てていけるのが、この講座です。
          </p>
        </div>
      </Section>

      <WaveDivider flip color="#FAF6F0" />

      {/* ============================================ */}
      {/* 無料個別体験＆相談会 + 特典 */}
      {/* ============================================ */}
      <section
        className="relative py-12 sm:py-24"
        style={{ backgroundImage: `url(${BG.cta})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#F7F3EE]/70 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#B8860B] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase">Special Offer</p>
            <h2 className="font-serif text-[19px] sm:text-2xl md:text-3xl font-bold leading-[1.9] mb-5 text-[#3A2E22]">
              「本当に、優しく触れるだけで
              <br />
              人生まで変わるの？」
            </h2>
            <p className="font-serif text-[15px] sm:text-lg text-[#8B6914] font-bold leading-[2]">
              まずは、オンライン越しに
              <br />
              「あなたの体」で証明させてください。
            </p>
          </div>

          <div className="text-[#5A4A3A] text-[13px] sm:text-base leading-[2.2] text-center mb-8 sm:mb-12">
            <p>
              ここまでお読みいただき、本当にありがとうございます。
              文章や漫画を見るだけでは、まだ半信半疑かもしれません。
            </p>
            <p className="mt-4">
              だからこそ、今回の個別相談会では、お悩みをお伺いするだけでなく、
              Zoomの画面越しに私がナビゲートし、
              あなた自身の手で<strong className="text-[#3A2E22]">「エラーのリセット」</strong>を
              実際に体験していただきます。
            </p>
            <p className="mt-4 font-serif text-[#8B6914] font-bold">
              ぜひあなた自身で確かめに来てください。
            </p>
          </div>

          {/* 特典 */}
          <div className="bg-white/90 border border-[#D4A853]/30 rounded-2xl p-5 sm:p-10 mb-8 sm:mb-12 shadow-xl shadow-[#D4A853]/10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-[#D4A853]/10 px-4 py-2 rounded-full mb-4">
                <Gift className="w-5 h-5 text-[#B8860B]" />
                <span className="text-[#8B6914] text-[13px] sm:text-sm font-bold tracking-wider">LINE登録特典</span>
              </div>
              <h3 className="font-serif text-[17px] sm:text-xl font-bold text-[#3A2E22]">
                今なら「特別特典」をプレゼント！
              </h3>
            </div>

            <div className="bg-[#F7F3EE] border border-[#D4A853]/15 rounded-xl p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#D4A853]/10 flex items-center justify-center shrink-0">
                  <span className="text-xl sm:text-2xl">{"\u{1F4D8}"}</span>
                </div>
                <div>
                  <p className="text-[#8B6914] text-[12px] sm:text-sm font-bold mb-1">電子書籍</p>
                  <p className="text-[#3A2E22] font-serif font-bold text-[15px] sm:text-lg mb-2 leading-[1.8]">
                    『変わらないプロと、変わる初心者の違い』
                  </p>
                  <p className="text-[#6B5B4B] text-[12px] sm:text-sm leading-[2]">
                    なぜ、いくら技術を学んでも結果が出ないのか？ 未経験からでも圧倒的な結果を出す人が、無意識にやっている「本質的な前提」を明かした、門外不出の一冊です。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 限定性 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#C85A20]/10 border border-[#C85A20]/30 px-5 py-3 rounded-full mb-6">
              <Clock className="w-4 h-4 text-[#C85A20]" />
              <span className="text-[#C85A20] text-[13px] sm:text-sm font-bold">少人数限定 ── 枠が埋まり次第、募集終了</span>
            </div>
            <p className="text-[#6B5B4B] text-[13px] sm:text-sm mb-6 leading-[2]">
              現在、複数店舗の経営やプログラム運営を行っているため、
              私が直接お話しできる枠には限りがございます。
              枠が埋まってしまう前に、
              今すぐLINEに登録して日程を確保してください。
            </p>
          </div>

          <div className="text-center">
            <CTAButton onClick={openForm} size="lg" />
            <p className="text-[#8B7B6B] text-[11px] sm:text-xs mt-4">
              ※ 定員に達し次第、募集を締め切らせていただきます
            </p>
          </div>
        </div>
      </section>

      <WaveDivider color="#F7F3EE" />

      {/* ============================================ */}
      {/* 追伸 */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-24 bg-[#F7F3EE]">
        <div className="max-w-2xl mx-auto px-5">
          <div className="text-center mb-6">
            <p className="text-[#B8860B] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase">P.S.</p>
            <h2 className="font-serif text-[18px] sm:text-xl md:text-2xl font-bold leading-relaxed text-[#3A2E22]">
              あなたへ贈る最後のメッセージ
            </h2>
          </div>

          <div className="space-y-4 text-[#5A4A3A] text-[13px] sm:text-base leading-[2.2]">
            <p>
              最後までお読みいただき、本当にありがとうございます。
            </p>

            <HighlightBlock variant="gold">
              <p className="text-[#5A4A3A] text-[13px] sm:text-base leading-[2.2]">
                私がこのメソッドを世に出し、あなたにお伝えしている一番の理由。
                それは、<strong className="text-[#3A2E22]">「諦めからではなく、希望から選ぶ人生を生きてほしい」</strong>という思い。
              </p>
              <p className="text-[#5A4A3A] text-[13px] sm:text-base leading-[2.2] mt-3">
                そしてもう一つ。
                あなた起点で始まる<strong className="text-[#8B6914]">「幸せのバタフライエフェクト」</strong>を起こしてほしいからです。
              </p>
            </HighlightBlock>

            <p>
              バタフライエフェクトとは、蝶の小さな羽ばたきが、やがて遠くで大きな竜巻を起こすという現象のこと。
            </p>
            <p>
              あなたがこのメソッドを手にし、ご自身や目の前の大切な人に「優しく触れる」こと。
              それは、最初はほんの小さな羽ばたきかもしれません。
            </p>
            <p>
              しかし、あなたの手から伝わった安心感が、家族の笑顔を取り戻し、お客様の人生を好転させます。
              そして本来のフラットな状態に戻り、元気で幸せになった彼らが、今度はまた別の誰かを笑顔にしていく……。
            </p>
            <p>
              その愛と豊かさの連鎖は、あなたの周りの人たち、そして社会全体へと大きく広がっていく。私はそう確信しています。
            </p>

            <HighlightBlock variant="white">
              <p className="font-serif text-[15px] sm:text-lg text-[#8B6914] font-bold leading-[2] text-center">
                特別な才能は不要です。
                <br />
                あなたのその「優しい手」から、
                <br />
                幸せの連鎖をスタートさせませんか？
              </p>
            </HighlightBlock>

            <p className="text-center">
              その最初の羽ばたきを起こすための第一歩として、
              まずは画面越しに、あなた自身の体でこの変化を体感しに来てください。
            </p>
            <p className="text-center font-serif text-[#8B6914]">
              あなたとお会いできるのを、心待ちにしています。
            </p>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-8 sm:mt-12">
            <CTAButton onClick={openForm} size="lg" />
            <p className="text-[#8B7B6B] text-[11px] sm:text-xs mt-4">
              ※ 定員に達し次第、募集を締め切らせていただきます
            </p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 bg-[#EDE8E0] border-t border-[#D4A853]/15">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="text-[#8B7B6B] text-[11px] sm:text-xs">
            &copy; {new Date().getFullYear()} ニューロライフメソッド・マスター講座 All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ============================================ */
/* Sub Components */
/* ============================================ */

function OldBeliefCard({ number, title, description }: { number: string; title: string; description: string }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`
        bg-white/60 border border-[#C85A20]/15 rounded-2xl p-5 sm:p-8
        transition-all duration-700 ease-out shadow-md
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C85A20]/10 border border-[#C85A20]/20 flex items-center justify-center">
            <span className="text-[#C85A20] text-xs font-bold">{"\u2715"}</span>
          </div>
        </div>
        <div>
          <p className="text-[#C85A20]/60 text-[11px] sm:text-xs font-mono mb-1">過去の常識 {number}</p>
          <h3 className="font-serif text-[15px] sm:text-lg font-bold text-[#3A2E22] mb-3 leading-[1.8]">
            {title}
          </h3>
          <p className="text-[#5A4A3A] text-[13px] sm:text-sm leading-[2.2]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ name, icon, text, delay = 0 }: { name: string; icon: string; text: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`
        bg-white/80 border border-[#D4A853]/15 rounded-2xl p-5 sm:p-8
        transition-all duration-700 ease-out shadow-lg shadow-[#D4A853]/5
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#D4A853]/10 flex items-center justify-center text-lg">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#D4A853] text-[#D4A853]" />
            ))}
          </div>
          <p className="text-[#8B6914] text-[12px] sm:text-xs font-medium">{name}</p>
        </div>
      </div>
      <div className="relative">
        <MessageCircle className="absolute -top-1 -left-1 w-4 h-4 text-[#D4A853]/20" />
        <p className="text-[#5A4A3A] text-[13px] sm:text-sm leading-[2.2] pl-2">
          {text}
        </p>
      </div>
    </div>
  );
}

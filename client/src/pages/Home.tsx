/*
 * ====================================================
 * ニューロライフメソッド・マスター講座 広告用LP
 * ====================================================
 * Design Philosophy: ニューロサイエンス・エレガンス
 * - ダーク背景 (#0A0E1A) × ゴールドアクセント (#D4A853)
 * - 神経ネットワークモチーフ
 * - コーラルオレンジCTA (#E85D3A)
 * - Shippori Mincho B1 (見出し) × Noto Sans JP (本文)
 * ====================================================
 */
import { useState } from "react";
import CTAButton from "@/components/CTAButton";
import FormModal from "@/components/FormModal";
import GoldDivider from "@/components/GoldDivider";
import MangaImage from "@/components/MangaImage";
import Section from "@/components/Section";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown, Star, CheckCircle, Gift, Clock, Users, MessageCircle } from "lucide-react";

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

// Generated background images
const BG = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/hero-bg-KwjfGxW4gKSK3WYSTbDFUc.webp",
  section: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/section-bg-YHHJS27eAAF88dTFzwFhEw.webp",
  cta: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/cta-bg-4ijwFoL9rXrBkajaqQzKZv.webp",
  testimonial: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/testimonial-bg-XyCYHM5edteuE7Rn8YCmYa.webp",
  brainBody: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/brain-body-concept-KCVTzzdqnC6sX7XCqUBhKu.webp",
};

// Testimonial data
const testimonials = [
  {
    name: "60代女性（元主婦・セラピスト開業）",
    icon: "👩",
    text: "長年、邑3日のパートだけで体がキツく、午後は寝込むこともよくありました。それが今では信じられないくらい元気になって、\u201Cもっと動きたい！\u201Dって思えるようになったんです。周りからも『若返ってない！？』と言われるようになり、還暦直前に\u201C開業\u201Dするなんて、数年前の私なら想像すらできませんでした。孫とケアを返し合うようになり、代々受け継がれていくと思うと、お金では買えない人生の宝物になりました。",
  },
  {
    name: "整骨院の男性の先生",
    icon: "👨‍⚕️",
    text: "こんなに短時間で、優しく触れるだけなので、施術する自分の動きもラク。『今まではなんだったんだ！』という気持ちでいっぱいです！これまで、患者さんには申し訳ないけれど、なかなか対応しきれず、ある程度は仕方のないものだと思っていました。でも受講後、『えっ、これだけ？』という手技で、これまで変化しにくかった状態がみるみる改善していることに、私自身が一番驚いています。",
  },
  {
    name: "50代女性",
    icon: "👩",
    text: "10年以上、週3回は整体や整骨院に通っていました。行かないと体がつらくて、仕事にも支障が出るほどでした。でも、この講座を受け始めてからは……1度も通っていないんです！それに気づいた時、本当に驚きました。優しく触れるだけなのに、自分の体も、猫背だった息子の姿勢もどんどん変化し、気づけば息子の成績まで変わっていて。\u201C自分の手で家族を整えられる\u201Dって、こんなにも安心なんだと初めて知りました。",
  },
  {
    name: "家庭内別居の危機から、夫婦の絆と自分の夢を実現！",
    icon: "👩‍👧‍👦",
    text: "主人への不信感や将来への不安から、当時は家庭内別居状態でした。心身の重さから子どもたちにもつい感情的になってしまい、「なんとかこの現状を変えたい」とワラにもすがる思いで参加しました。そこで「情報伝達のシステム」をリセットしたところ、驚くほど自分の中のイライラが消え、夫婦仲が劇的に改善。さらに、未来への回路が繋がったことで主人の仕事も大きく飛躍し、私自身も諦めかけていた「自分のカフェ」を持つことができました！",
  },
];

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white overflow-x-hidden">
      <FormModal isOpen={isFormOpen} onClose={closeForm} />

      {/* ============================================ */}
      {/* HERO SECTION - ファーストビュー */}
      {/* ============================================ */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${BG.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A]/60 via-[#0A0E1A]/40 to-[#0A0E1A]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 text-center">
          {/* Pre-head */}
          <p className="text-[#D4A853] text-sm sm:text-base tracking-[0.2em] mb-6 font-medium animate-fade-in-up">
            「何とかしてあげたい」のに、想いに応えられず
            <br className="sm:hidden" />
            涙したことのあるあなたへ。
          </p>

          {/* Main Copy */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.7rem] font-bold leading-[1.7] mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <span className="text-gray-300 text-lg sm:text-xl block mb-4">
              このまま、終わりの見えない
              <br />
              「その場しのぎのケア」で消耗し続けるか。
            </span>
            <span className="text-[#D4A853] text-base sm:text-lg block mb-6">それとも――</span>
            <span className="block leading-[1.8]">
              伝達エラーを<span className="gold-gradient-text">リセット</span>し、
              <br />
              時間も労力も減るのに、
              <br />
              家族やお客様から<span className="gold-gradient-text">感謝</span>されながら
              <br />
              豊かになる
            </span>
            <span className="block mt-4 text-[#D4A853]">
              【次世代のセラピスト】
              <br className="sm:hidden" />
              として突き抜けるか。
            </span>
          </h1>

          {/* Sub copy */}
          <div className="mb-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              原因探しも、力任せの強い施術も、難しい専門知識も、
            </p>
            <p className="text-xl sm:text-2xl font-serif font-bold text-white">
              実はもう<span className="text-[#E85D3A]">『過去の常識！？』</span>
            </p>
          </div>

          {/* CTA */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <CTAButton onClick={openForm} />
            <p className="text-gray-500 text-xs mt-4">
              ※ 画面越しに、その場で体感していただきます。
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-[#D4A853]/50" />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 漫画パート① - 交差する2つの悩み */}
      {/* ============================================ */}
      <Section className="py-16 sm:py-24 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#D4A853] text-sm tracking-[0.15em] mb-3">STORY</p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed">
              交差する<span className="gold-gradient-text">2つの悩み</span>
            </h2>
          </div>
          <div className="space-y-6">
            <MangaImage src={MANGA.m1} alt="漫画1 - 体の不調に悩む主婦" />
            <MangaImage src={MANGA.m2} alt="漫画2 - 技術はあるのに変化につながらないセラピスト" delay={100} />
            <MangaImage src={MANGA.m3} alt="漫画3 - 二人の決意" delay={200} />
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* テキストエリア① - 過去の常識の破壊 */}
      {/* ============================================ */}
      <Section className="py-16 sm:py-24" bgImage={BG.section} overlay>
        <div className="max-w-3xl mx-auto px-4">
          {/* Lead text */}
          <div className="text-center mb-16">
            <p className="font-serif text-lg sm:text-xl md:text-2xl leading-[2] text-gray-200">
              「どうして、こんなに頑張っているのに
              <br />
              変わらないのだろう？」
            </p>
            <GoldDivider />
            <p className="text-gray-300 text-sm sm:text-base leading-[2] max-w-2xl mx-auto">
              あなたがもし、そうやって自分を責めているのだとしたら、今日で終わりにしてください。
              思うように変わらなかったのは、あなたの努力不足でも、才能がないからでもありません。
            </p>
            <p className="text-lg sm:text-xl font-serif font-bold text-[#D4A853] mt-6">
              あなたが信じてきた「良くなるための常識」が、
              <br />
              実はもう時代遅れだったからです。
            </p>
          </div>

          {/* 3つの過去の常識 */}
          <div className="space-y-10">
            {/* 常識① */}
            <OldBeliefCard
              number="01"
              title="「強く揉みほぐせば良くなる」"
              description="体を力任せに強く揉みほぐしても、体は「攻撃された」と勘違いして、身を守るために再び硬くなってしまったり、その場しのぎで元に戻ってしまいます。体をラクにするためのはずが、どんどん壊していく方向に導いているということです。"
            />
            {/* 常識② */}
            <OldBeliefCard
              number="02"
              title="「何年もの修行と専門知識が必要」"
              description="体は、未だ解明されていないことがとても多くあります。専門知識を詰め込み、囚われた'頭の知識'だけで探ろうとすればするほど改善しにくくなります。実際に、未経験の方が、受講初日からプロの治療家の先生方が驚くような変化を出されています。"
            />
            {/* 常識③ */}
            <OldBeliefCard
              number="03"
              title="「原因を探したり、取り除くことで改善する」"
              description="実は「原因」なんて突き止めなくてもいいのです。なぜ悪くなったのか？より、そのことがなかったらどうなっているのか？の、未来にフォーカスすることで、体は反応し改善に繋がっていきます。"
            />
          </div>

          {/* 結論 */}
          <div className="mt-16 text-center">
            <div className="bg-[#0A0E1A]/60 border border-[#D4A853]/20 rounded-xl p-8 backdrop-blur-sm">
              <p className="text-gray-300 text-sm sm:text-base leading-[2] mb-4">
                これまでのアプローチが上手くいかなかった最大の理由。
                <br />
                それは、肉体の改善のために、<strong className="text-white">肉体だけをみて扱ってきたこと。</strong>
              </p>
              <p className="font-serif text-lg sm:text-xl font-bold text-[#D4A853] leading-[1.8]">
                本来は、繋がっているはずの
                <br />
                「思考」「感情」「肉体」を、
                <br />
                それぞれバラバラに切り離して
                <br />
                扱おうとしてきたからです。
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* 漫画パート② - 出会いとメカニズム解説 */}
      {/* ============================================ */}
      <Section className="py-16 sm:py-24 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#D4A853] text-sm tracking-[0.15em] mb-3">MECHANISM</p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed">
              出会いと<span className="gold-gradient-text">メカニズム解説</span>
            </h2>
          </div>
          <div className="space-y-6">
            <MangaImage src={MANGA.m4} alt="漫画4 - 先生との出会い" />
            <MangaImage src={MANGA.m5} alt="漫画5 - 伝達ネットワークの解説" delay={100} />
            <MangaImage src={MANGA.m6} alt="漫画6 - 体験と驚き" delay={200} />
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* テキストエリア② - メソッドがもたらす本当の価値 */}
      {/* ============================================ */}
      <Section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0E1A] via-[#0F1528] to-[#0A0E1A]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#D4A853] text-sm tracking-[0.15em] mb-3">TRUE VALUE</p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed">
              メソッドがもたらす
              <br />
              <span className="gold-gradient-text">本当の価値</span>
            </h2>
          </div>

          {/* Brain-body concept image */}
          <div className="flex justify-center mb-12">
            <img
              src={BG.brainBody}
              alt="思考・感情・肉体の伝達ネットワーク"
              className="w-48 sm:w-64 h-auto rounded-xl shadow-2xl shadow-[#D4A853]/10 border border-[#D4A853]/10"
            />
          </div>

          <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-[2]">
            <p>
              肉体が緩み整うことは、<strong className="text-[#D4A853]">「叶う未来への回路」</strong>が繋がること。
            </p>
            <p>
              漫画の中で二人が体験したように、嘘をつけない「肉体反応（触覚）」を通じて見えない領域の状態を正確にモニタリングし、優しく触れて伝達ネットワークのバグをリセットする。
              これが<strong className="text-white">『ニューロライフメソッド』</strong>の最大の特徴です。
            </p>
            <p>
              システムが正常化し、本来のフラットな状態に戻れば、体に起こっていた不調のサインが消え去るのは、ほんの<strong className="text-white">「結果の一部」</strong>に過ぎません。
            </p>

            <div className="bg-[#0A0E1A]/80 border border-[#D4A853]/20 rounded-xl p-8 my-8">
              <p className="font-serif text-lg sm:text-xl font-bold text-center text-[#D4A853] leading-[1.8] mb-4">
                本当の驚きは、その後に起こります。
              </p>
              <p className="text-gray-300 text-center leading-[2]">
                過去の重い鎧を脱ぎ捨て、頑張る努力を手放した瞬間から、
                <br />
                パートナーシップ、仕事、人間関係など、
                <br />
                人生のあらゆる側面が最高のパフォーマンスを発揮し始めます。
              </p>
            </div>

            <p className="text-center font-serif text-base sm:text-lg text-white">
              思考や感情をコントロールしようと必死に頑張らなくても、
              <br />
              自動的に<span className="text-[#D4A853] font-bold">「望む幸せな現実」</span>へと動き出し始めるのです。
            </p>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* CTA中間 */}
      {/* ============================================ */}
      <Section className="py-16 sm:py-20" bgImage={BG.cta} overlay>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-white leading-[1.8] mb-3">
            「本当に、優しく触れるだけで、
            <br />
            そんなに変わるの？」
          </p>
          <p className="text-gray-300 text-sm sm:text-base mb-8">
            オンライン越しに「あなたの体」で証明させてください。
          </p>
          <CTAButton onClick={openForm} />
          <p className="text-gray-500 text-xs mt-4">
            ※ 画面越しに、その場で体感していただきます。
          </p>
        </div>
      </Section>

      {/* ============================================ */}
      {/* 漫画パート③ - 動き出す幸せな未来 */}
      {/* ============================================ */}
      <Section className="py-16 sm:py-24 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#D4A853] text-sm tracking-[0.15em] mb-3">HAPPY FUTURE</p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed">
              動き出す<span className="gold-gradient-text">「幸せな未来」</span>
            </h2>
          </div>
          <div className="space-y-6">
            <MangaImage src={MANGA.m7} alt="漫画7 - 数ヶ月後の変化" />
            <MangaImage src={MANGA.m8} alt="漫画8 - 開業の夢" delay={100} />
            <MangaImage src={MANGA.m9} alt="漫画9 - お客様との関わり" delay={200} />
            <MangaImage src={MANGA.m10} alt="漫画10 - 次はあなたの番" delay={300} />
            <MangaImage src={MANGA.m11} alt="漫画11 - 先生からのメッセージ" delay={400} />
          </div>

          {/* CTA after manga */}
          <div className="text-center mt-12">
            <CTAButton onClick={openForm} />
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* 実績・受講生の声 */}
      {/* ============================================ */}
      <Section className="py-16 sm:py-24" bgImage={BG.testimonial} overlay>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-4">
            <p className="text-[#D4A853] text-sm tracking-[0.15em] mb-3">RESULTS</p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed mb-4">
              「今までは何だったんだ！」
              <br />
              <span className="gold-gradient-text">プロも未経験者も驚愕する、</span>
              <br />
              人生が動いた数々の事実
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              漫画のストーリーは、決して作り話ではありません。
              人間の持つ「自然治癒力」のメカニズムに基づいたアプローチだからこそ、
              私がやっても、未経験のあなたがやっても、プロのボディワーカーがやっても、
              同じように圧倒的な結果が出るのです。
            </p>
          </div>

          <GoldDivider />

          {/* Testimonials */}
          <div className="space-y-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} delay={i * 100} />
            ))}
          </div>

          <p className="text-xs text-gray-500 text-center mt-8">
            ※上記は個人の感想であり、成果や成功を保証するものではありません。
          </p>
        </div>
      </Section>

      {/* ============================================ */}
      {/* 主宰者プロフィール */}
      {/* ============================================ */}
      <Section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0E1A] via-[#0F1528] to-[#0A0E1A]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#D4A853] text-sm tracking-[0.15em] mb-3">PROFILE</p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed">
              「諦め」を「希望」に変える。
              <br />
              <span className="gold-gradient-text">私がこのメソッドに行き着いた理由</span>
            </h2>
          </div>

          <div className="bg-[#0F1528]/80 border border-[#D4A853]/15 rounded-2xl p-6 sm:p-10 backdrop-blur-sm">
            <div className="text-center mb-8">
              <p className="text-[#D4A853] font-serif text-lg sm:text-xl font-bold mb-1">
                橋本 みき
              </p>
              <p className="text-gray-400 text-sm">
                『ニューロライフメソッド』開発者
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#D4A853]" />
                  施術歴27年
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#D4A853]" />
                  のべ4万人以上
                </span>
              </div>
            </div>

            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-[2]">
              <p>
                施術家としては27年、これまでに、親子で通われる小さなお子さんから第一線で活躍するプロ選手、また、長年深いお悩みを抱える方からVIP層の方まで、のべ4万人以上のお身体に触れさせていただきました。
              </p>
              <p>
                私がこのメソッドをお伝えしている一番の理由。それは、<strong className="text-white">私自身がかつて、ドクターから「40代で歩けなくなる」と告げられるほどの不調に絶望した経験がある</strong>からです。
              </p>
              <p>
                子供の頃からスポーツに打ち込んでいましたが、毎年のように全身に大きな怪我を繰り返していました。30代の頃には外科医のドクターから、「このままだと腕は上がらなくなるし、自分の足で歩くのも困難になる。今すぐ手術をしなさい」と何度も宣告されました。
              </p>
              <p>
                「もっと何かあるはず！」という思いから、世界中の手技、脳科学、身体の調整法、心理学、エネルギー療法……ありとあらゆることを学び、自分の身体を実験台にして検証を繰り返しました。
              </p>

              <div className="bg-[#0A0E1A]/60 border-l-2 border-[#D4A853] pl-6 py-4 my-6">
                <p className="font-serif text-base sm:text-lg text-[#D4A853] font-bold leading-[1.8]">
                  「体を改善するために、"体だけ"を治そうとしても決して良くならない」
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  ── そこで辿り着いた衝撃的な事実
                </p>
              </div>

              <p>
                そのシステムを自らの体でリセットし続けた結果……。気付けば、子供の頃から抱えていた不調が嘘のように消え去り、後遺症すらも無くなっていました。それどころか、<strong className="text-white">スポーツ現役時代よりも可動域が広がり、滑らかな動きを取り戻してしまった</strong>のです。
              </p>
              <p>
                だからこそ、一部の天才にしかできない感覚を削ぎ落とし、<strong className="text-[#D4A853]">「誰でも安全に、確かな変化を感じられ、自立できる技術」</strong>として体系化しました。
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="font-serif text-base sm:text-lg text-white italic leading-[1.8]">
                「99%ダメだと言われても、1%の可能性があるなら、
                <br />
                それは希望に変えられる」
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* こんな方におすすめ */}
      {/* ============================================ */}
      <Section className="py-16 sm:py-24 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#D4A853] text-sm tracking-[0.15em] mb-3">FOR YOU</p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed">
              最初は「本当に私にできるのかな…」と
              <br />
              迷いながらも、一歩を踏み出した人が、
              <br />
              <span className="gold-gradient-text">"人生を変える手"</span>を手にしてきました。
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 未経験・主婦の方 */}
            <div className="bg-[#0F1528]/80 border border-[#D4A853]/15 rounded-xl p-6 sm:p-8">
              <h3 className="font-serif text-lg font-bold text-[#D4A853] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#D4A853]/10 flex items-center justify-center text-sm">🌱</span>
                未経験・主婦の方へ
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                あなた自身が、家族を守る「次世代セラピスト」になれます。
              </p>
              <ul className="space-y-3">
                {[
                  "自分や家族の不調をどうにかしたい",
                  "専門家じゃなくても、人の役に立ちたい",
                  "いつかは「一生の宝物」をシゴトにして自立したい",
                  "何年も変わらない現実を、ここで終わらせたい",
                  "子供たちの能力開発に興味がある",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-[#D4A853] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* プロ・開業志望の方 */}
            <div className="bg-[#0F1528]/80 border border-[#D4A853]/15 rounded-xl p-6 sm:p-8">
              <h3 className="font-serif text-lg font-bold text-[#D4A853] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#D4A853]/10 flex items-center justify-center text-sm">⭐</span>
                プロ・開業志望の方へ
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                対症療法から抜け出し、結果で選ばれる「次世代セラピスト」として圧倒的なポジションへ。
              </p>
              <ul className="space-y-3">
                {[
                  "様々な勉強をしたが、思うような変化につながらない",
                  "対症療法ではなく、もっと本質的なものを探している",
                  "自分の人生も体力・時間・豊かさすべてに余裕を持ちたい",
                  "メンタルヘルスや、お客様の望む未来を叶えるアプローチも取り入れたい",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-[#D4A853] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* 無料個別体験＆相談会 + 特典 */}
      {/* ============================================ */}
      <Section className="py-16 sm:py-24" bgImage={BG.cta} overlay>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#D4A853] text-sm tracking-[0.15em] mb-3">SPECIAL OFFER</p>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed mb-6">
              「本当に、優しく触れるだけで
              <br />
              人生まで変わるの？」
            </h2>
            <p className="font-serif text-lg sm:text-xl text-[#D4A853] font-bold">
              まずは、オンライン越しに
              <br />
              「あなたの体」で証明させてください。
            </p>
          </div>

          <div className="text-gray-300 text-sm sm:text-base leading-[2] text-center mb-12">
            <p>
              ここまでお読みいただき、本当にありがとうございます。
              <br />
              文章や漫画を見るだけでは、まだ半信半疑かもしれません。
            </p>
            <p className="mt-4">
              だからこそ、今回の個別相談会では、お悩みをお伺いするだけでなく、
              <br />
              Zoomの画面越しに私がナビゲートし、
              <br />
              あなた自身の手で<strong className="text-white">「エラーのリセット」</strong>を実際に体験していただきます。
            </p>
          </div>

          {/* 特典 */}
          <div className="bg-[#0A0E1A]/80 border border-[#D4A853]/30 rounded-2xl p-6 sm:p-10 mb-12">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-[#D4A853]/10 px-4 py-2 rounded-full mb-4">
                <Gift className="w-5 h-5 text-[#D4A853]" />
                <span className="text-[#D4A853] text-sm font-bold tracking-wider">LINE登録特典</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                当日の体感を最大化する
                <br />
                <span className="text-[#D4A853]">「特別特典」</span>をプレゼント！
              </h3>
            </div>

            <div className="bg-[#0F1528] border border-[#D4A853]/15 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#D4A853]/10 flex items-center justify-center shrink-0">
                  <span className="text-2xl">📘</span>
                </div>
                <div>
                  <p className="text-[#D4A853] text-sm font-bold mb-1">電子書籍</p>
                  <p className="text-white font-serif font-bold text-base sm:text-lg mb-2">
                    『変わらないプロと、変わる初心者の違い』
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    なぜ、いくら技術を学んでも結果が出ないのか？ 未経験からでも圧倒的な結果を出す人が、無意識にやっている「本質的な前提」を明かした、門外不出の一冊です。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 限定性 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#E85D3A]/10 border border-[#E85D3A]/30 px-6 py-3 rounded-full mb-6">
              <Clock className="w-4 h-4 text-[#E85D3A]" />
              <span className="text-[#E85D3A] text-sm font-bold">少人数限定 ── 枠が埋まり次第、募集終了</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">
              現在、複数店舗の経営やプログラム運営を行っているため、
              <br />
              私が直接お話しできる枠には限りがございます。
            </p>
          </div>

          <div className="text-center">
            <CTAButton onClick={openForm} size="lg" />
            <p className="text-gray-500 text-xs mt-4">
              ※ 定員に達し次第、募集を締め切らせていただきます
            </p>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* 追伸 */}
      {/* ============================================ */}
      <Section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0E1A] to-[#0F1528]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-[#D4A853] text-sm tracking-[0.15em] mb-3">P.S.</p>
            <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold leading-relaxed">
              あなたへ贈る最後のメッセージ
            </h2>
          </div>

          <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-[2]">
            <p>
              最後までお読みいただき、本当にありがとうございます。
            </p>
            <p>
              私がこのメソッドを世に出し、あなたにお伝えしている一番の理由。
              それは、<strong className="text-white">「諦めからではなく、希望から選ぶ人生を生きてほしい」</strong>という思い。
            </p>
            <p>
              そしてもう一つ。
              あなた起点で始まる<strong className="text-[#D4A853]">「幸せのバタフライエフェクト」</strong>を起こしてほしいからです。
            </p>
            <p>
              バタフライエフェクトとは、蝶の小さな羽ばたきが、やがて遠くで大きな竜巻を起こすという現象のこと。
              あなたがこのメソッドを手にし、ご自身や目の前の大切な人に「優しく触れる」こと。それは、最初はほんの小さな羽ばたきかもしれません。
            </p>
            <p>
              しかし、あなたの手から伝わった安心感が、家族の笑顔を取り戻し、お客様の人生を好転させます。
              そして本来のフラットな状態に戻り、元気で幸せになった彼らが、今度はまた別の誰かを笑顔にしていく……。
            </p>

            <div className="bg-[#0A0E1A]/60 border border-[#D4A853]/20 rounded-xl p-8 text-center my-8">
              <p className="font-serif text-base sm:text-lg text-[#D4A853] font-bold leading-[1.8]">
                特別な才能は不要です。
                <br />
                あなたのその「優しい手」から、
                <br />
                幸せの連鎖をスタートさせませんか？
              </p>
            </div>

            <p className="text-center">
              その最初の羽ばたきを起こすための第一歩として、
              <br />
              まずは画面越しに、あなた自身の体でこの変化を体感しに来てください。
            </p>
            <p className="text-center font-serif text-[#D4A853]">
              あなたとお会いできるのを、心待ちにしています。
            </p>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-12">
            <CTAButton onClick={openForm} size="lg" />
            <p className="text-gray-500 text-xs mt-4">
              ※ 定員に達し次第、募集を締め切らせていただきます
            </p>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* Footer */}
      {/* ============================================ */}
      <footer className="py-8 bg-[#060810] border-t border-[#D4A853]/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-xs">
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
        bg-[#0A0E1A]/60 border border-red-900/30 rounded-xl p-6 sm:p-8
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-red-900/20 border border-red-800/30 flex items-center justify-center">
            <span className="text-red-400 text-xs font-bold">✕</span>
          </div>
        </div>
        <div>
          <p className="text-red-300/60 text-xs font-mono mb-1">過去の常識 {number}</p>
          <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-3">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-[1.9]">
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
        bg-[#0F1528]/80 border border-[#D4A853]/15 rounded-xl p-6 sm:p-8
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#D4A853]/10 flex items-center justify-center text-lg">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#D4A853] text-[#D4A853]" />
            ))}
          </div>
          <p className="text-[#D4A853] text-xs font-medium">{name}</p>
        </div>
      </div>
      <div className="relative">
        <MessageCircle className="absolute -top-1 -left-1 w-4 h-4 text-[#D4A853]/20" />
        <p className="text-gray-300 text-sm leading-[1.9] pl-2">
          {text}
        </p>
      </div>
    </div>
  );
}

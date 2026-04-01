/*
 * ====================================================
 * ニューロライフメソッド・マスター講座 広告用LP
 * ====================================================
 * Design: ベージュ系エレガンス
 * - ベージュ/クリーム背景 (#FAF5EE)
 * - ネイビー文字 (#3D2B1A)
 * - オレンジCTAアクセント (#C85A10)
 * - Noto Serif JP (見出し) × Noto Sans JP (本文)
 * ====================================================
 */
import { useState } from "react";
import CTAButton from "@/components/CTAButton";
import FormModal from "@/components/FormModal";
import GoldDivider from "@/components/GoldDivider";
import MangaImage from "@/components/MangaImage";
import Section from "@/components/Section";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown, Star, CheckCircle, Clock, MessageCircle } from "lucide-react";

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

// Collage photos
const COLLAGE = {
  kouza: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/kouza-collage_5c83c006.jpg",
  retreat: "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/retreat-collage_b992dd99.jpg",
};

// Brain-body concept image
const BRAIN_BODY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663158061435/BctSMXLWunnVtABy2Hc8Pp/brain-body-concept-KCVTzzdqnC6sX7XCqUBhKu.webp";

// Testimonial data
const testimonials = [
  {
    name: "60代女性（元主婦・セラピスト開業）",
    icon: "👩",
    text: "長年、週3日のパートだけで体がキツく、午後は寝込むこともよくありました。それが今では信じられないくらい元気になって、もっと動きたい！って思えるようになったんです。周りからも「若返ってない！？」と言われるようになり、還暦直前に「開業」するなんて、数年前の私なら想像すらできませんでした。孫とケアを返し合うようになり、代々受け継がれていくと思うと、お金では買えない人生の宝物になりました。",
  },
  {
    name: "整骨院の男性の先生",
    icon: "👨‍⚕️",
    text: "こんなに短時間で、優しく触れるだけなので、施術する自分の動きもラク。「今まではなんだったんだ！」という気持ちでいっぱいです！これまで、患者さんには申し訳ないけれど、なかなか対応しきれず、ある程度は仕方のないものだと思っていました。でも受講後、「えっ、これだけ？」という手技で、これまで変化しにくかった状態がみるみる改善していることに、私自身が一番驚いています。",
  },
  {
    name: "50代女性",
    icon: "👩",
    text: "10年以上、週3回は整体や整骨院に通っていました。行かないと体がつらくて、仕事にも支障が出るほどでした。でも、この講座を受け始めてからは……1度も通っていないんです！それに気づいた時、本当に驚きました。優しく触れるだけなのに、自分の体も、猫背だった息子の姿勢もどんどん変化し、気づけば息子の成績まで変わっていて。「自分の手で家族を整えられる」って、こんなにも安心なんだと初めて知りました。",
  },
  {
    name: "家庭内別居の危機から、夫婦の絆と自分の夢を実現！",
    icon: "👩‍👧‍👦",
    text: "主人への不信感や将来への不安から、当時は家庭内別居状態でした。心身の重さから子どもたちにもつい感情的になってしまい、「なんとかこの現状を変えたい」とワラにもすがる思いで参加しました。そこで「情報伝達のシステム」をリセットしたところ、驚くほど自分の中のイライラが消え、夫婦仲が劇的に改善。さらに、未来への回路が繋がったことで主人の仕事も大きく飛躍し、私自身も諦めかけていた「自分のカフェ」を持つことができました！",
  },
];

// Photo slider data
const PHOTOS = [
  { src: COLLAGE.kouza, caption: "全国各地での講座の様子" },
  { src: COLLAGE.retreat, caption: "国内外リトリートの様子" },
  { src: MANGA.m1, caption: "受講生の変化" },
];

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#3D2B1A] overflow-x-hidden">
      {/* Meta Pixel */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3021374364734743');
            fbq('track', 'PageView');
          `,
        }}
      />

      <FormModal isOpen={isFormOpen} onClose={closeForm} />

      {/* ============================================ */}
      {/* HERO SECTION - ファーストビュー */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#FAF5EE] via-[#F5EFE6] to-[#EDE0D0] overflow-hidden">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, #C07840 1px, transparent 1px),
                            radial-gradient(circle at 70% 60%, #C07840 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, #C07840 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }} />

        {/* ① 権威バー（最上部） */}
        <div className="w-full bg-[#3D2B1A] py-2 px-4 text-center">
          <p className="text-[#F5C98A] text-[11px] sm:text-[13px] tracking-wide leading-relaxed">
            🧠 脳科学・量子力学×東洋西洋の叡智を統合 ｜ ✨ 施術歴27年・のべ5万人以上 ｜ 🌏 全国&amp;海外から受講者が続々
          </p>
        </div>

        <div className="relative z-10 w-full max-w-[800px] mx-auto px-5 pt-10 pb-6 text-center">

          {/* ② ターゲットコール */}
          <div className="mb-7 sm:mb-9 animate-fade-in-up">
            <p
              className="text-[#3D2B1A] font-medium leading-[1.55] tracking-[-0.5px]"
              style={{ fontSize: "clamp(20px, 5.5vw, 28px)" }}
            >
              「何とかしてあげたい」のに、
              <br />
              想いに応えられず涙したことのある
              <span className="text-[#C85A10] font-bold">あなたへ。</span>
            </p>
          </div>

          {/* ③ メインコピー */}
          <div className="mb-7 sm:mb-9 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <h1
              className="font-bold text-[#3D2B1A] leading-[1.45] tracking-[-0.5px]"
              style={{ fontSize: "clamp(26px, 7.5vw, 40px)" }}
            >
              原因探しも、力任せの施術も、
              <br />
              難しい専門知識も、
              <br />
              実はもう
              <span className="text-[#C85A10] underline underline-offset-4 decoration-[#C85A10]/60 decoration-2">
                『過去の常識！？』
              </span>
            </h1>
            <p
              className="font-bold text-[#3D2B1A] leading-[1.45] tracking-[-0.5px] mt-5"
              style={{ fontSize: "clamp(26px, 7.5vw, 40px)" }}
            >
              <span className="text-[#C85A10]">新しい視点</span>で、
              <br />
              家族やお客様から
              <span className="text-[#C85A10]">感謝</span>されながら
              <br />
              豊かになる
              <span className="text-[#3D2B1A]">【次世代のセラピスト】</span>
              <br />
              として突き抜けるか。
            </p>
          </div>

          {/* ④ サブコピー */}
          <div className="mb-8 sm:mb-10 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            <p
              className="text-[#5A3A1A] leading-[1.75] tracking-[-0.3px]"
              style={{ fontSize: "clamp(15px, 4vw, 20px)" }}
            >
              視点を変えて、<span className="text-[#C85A10] font-bold">優しく触れるだけ。</span>
              <br />
              力も、専門知識も、経験もいらない。
              <br />
              自分が整いながら、周りも元気に。
              <br />
              「ありがとう」が連鎖して、豊かになっていく。
              <br />
              その日からプロが驚く結果を出す人が続出しています。
            </p>
          </div>

          {/* ⑤ CTAボタン（1つ目） */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            <CTAButton onClick={openForm} />
          </div>

        </div>

        {/* ⑥ 講座写真スライド */}
        <div className="w-full max-w-[800px] mx-auto px-5 mt-6">
          <p className="text-center text-[#7A5A3A] text-[12px] sm:text-sm font-bold mb-3">
            📸 全国&amp;海外での講座・リトリートの様子
          </p>
          <PhotoSlider />
        </div>

        {/* ⑦ 漫画チラ見え — 写真スライダー直下に漫画1枚目の上部が少し見える */}
        <div className="relative w-full max-w-[800px] mx-auto px-5 mt-6">
          <div className="relative overflow-hidden rounded-t-xl" style={{ maxHeight: "220px" }}>
            <img
              src={MANGA.m1}
              alt="漫画1 - 続きを見る"
              className="w-full h-auto"
              loading="eager"
            />
            {/* フェードアウトグラデーション */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#EDE0D0] to-transparent" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center py-6 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#C07840]/60" />
        </div>
      </section>

      {/* ============================================ */}
      {/* セクション1: STORY 交差する2つの悩み */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-20 bg-[#FAF5EE]">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#C07840] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase font-bold">Story</p>
            <h2 className="font-serif text-[20px] sm:text-2xl md:text-3xl font-bold leading-relaxed text-[#3D2B1A]">
              交差する<span className="text-[#C85A10]">2つの悩み</span>
            </h2>
          </div>
          <div className="space-y-5 sm:space-y-6">
            <MangaImage src={MANGA.m1} alt="漫画1 - 体の不調に悩む主婦" />
            <MangaImage src={MANGA.m2} alt="漫画2 - 技術はあるのに変化につながらないセラピスト" delay={100} />
            <MangaImage src={MANGA.m3} alt="漫画3 - 二人の決意" delay={200} />
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* セクション2: 過去の常識の破壊 */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-20 bg-[#F5EFE6]">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-10 sm:mb-14">
            <p
              className="font-serif text-[#3D2B1A] leading-[2.2]"
              style={{ fontSize: "clamp(16px, 4vw, 22px)" }}
            >
              「どうして、こんなに頑張っているのに
              <br />
              変わらないのだろう？」
            </p>
            <GoldDivider />
            <p className="text-[#5A3A1A] text-[14px] sm:text-base leading-[2.2] max-w-2xl mx-auto">
              あなたがもし、そうやって自分を責めているのだとしたら、今日で終わりにしてください。
              思うように変わらなかったのは、あなたの努力不足でも、才能がないからでもありません。
            </p>
            <p
              className="font-serif font-bold text-[#C85A10] mt-5 leading-[1.8]"
              style={{ fontSize: "clamp(16px, 4vw, 20px)" }}
            >
              あなたが信じてきた「良くなるための常識」が、
              <br />
              実はもう時代遅れだったからです。
            </p>
          </div>

          {/* 3つの過去の常識 */}
          <div className="space-y-5 sm:space-y-8">
            <OldBeliefCard
              number="01"
              title="「強く揉みほぐせば良くなる」"
              description="体を力任せに強く揉みほぐしても、体は「攻撃された」と勘違いして、身を守るために再び硬くなってしまったり、その場しのぎで元に戻ってしまいます。体をラクにするためのはずが、どんどん壊していく方向に導いているということです。また、「強さ」と「深さ」は別物ですが、それを混同して「深さ」ではなく「強さ」を求めてしまい、お客様のお体だけではなく、施術者自身の体の負担にもなっています。"
            />
            <OldBeliefCard
              number="02"
              title="「何年もの修行と専門知識が必要」"
              description="体は、未だ解明されていないことがとても多くあります。専門知識を詰め込み、囚われた頭の知識だけで探ろうとすればするほど改善しにくくなります。実際に、未経験の方が、受講初日からプロの治療家の先生方が驚くような変化を出されています。"
            />
            <OldBeliefCard
              number="03"
              title="「原因を探したり、取り除くことで改善する」"
              description="実は「原因」なんて突き止めなくてもいいのです。なぜ悪くなったのか？より、そのことがなかったらどうなっているのか？の、未来にフォーカスすることで、体は反応し改善に繋がっていきます。"
            />
          </div>

          <div className="mt-10 sm:mt-14 bg-white/70 border border-[#D4B896]/40 rounded-2xl p-6 sm:p-8">
            <p className="text-[#5A3A1A] text-[14px] sm:text-base leading-[2.2] mb-4">
              これまでのアプローチが上手くいかなかった最大の理由。
              それは、肉体の改善のために、<strong className="text-[#3D2B1A]">肉体だけをみて扱ってきたこと。</strong>
            </p>
            <p className="font-serif font-bold text-[#C85A10] leading-[1.8]" style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>
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
      </Section>

      {/* ============================================ */}
      {/* セクション3: MECHANISM 出会いとメカニズム解説 */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-20 bg-[#FAF5EE]">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#C07840] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase font-bold">Mechanism</p>
            <h2 className="font-serif text-[20px] sm:text-2xl md:text-3xl font-bold leading-relaxed text-[#3D2B1A]">
              出会いと<span className="text-[#C85A10]">メカニズム解説</span>
            </h2>
          </div>
          <div className="space-y-5 sm:space-y-6">
            <MangaImage src={MANGA.m4} alt="漫画4 - 先生との出会い" />
            <MangaImage src={MANGA.m5} alt="漫画5 - 伝達ネットワークの解説" delay={100} />
            <MangaImage src={MANGA.m6} alt="漫画6 - 体験と驚き" delay={200} />
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* セクション4: TRUE VALUE メソッドがもたらす本当の価値 */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-20 bg-[#F5EFE6]">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#C07840] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase font-bold">True Value</p>
            <h2 className="font-serif text-[20px] sm:text-2xl md:text-3xl font-bold leading-relaxed text-[#3D2B1A]">
              メソッドがもたらす
              <br />
              <span className="text-[#C85A10]">本当の価値</span>
            </h2>
          </div>

          <div className="flex justify-center mb-10">
            <img
              src={BRAIN_BODY}
              alt="思考・感情・肉体の伝達ネットワーク"
              className="w-48 sm:w-64 h-auto rounded-xl shadow-xl shadow-[#C07840]/10 border border-[#D4B896]/20"
              loading="lazy"
            />
          </div>

          <div className="space-y-5 text-[#5A3A1A] text-[14px] sm:text-base leading-[2.2]">
            <p>
              肉体が緩み整うことは、<strong className="text-[#C85A10]">「叶う未来への回路」</strong>が繋がること。
            </p>
            <p>
              漫画の中で二人が体験したように、嘘をつけない「肉体反応（触覚）」を通じて見えない領域の状態を正確にモニタリングし、優しく触れて伝達ネットワークのバグをリセットする。
              これが<strong className="text-[#3D2B1A]">『ニューロライフメソッド』</strong>の最大の特徴です。
            </p>
            <p>
              システムが正常化し、本来のフラットな状態に戻れば、体に起こっていた不調のサインが消え去るのは、ほんの<strong className="text-[#3D2B1A]">「結果の一部」</strong>に過ぎません。
            </p>

            <div className="bg-white/70 border border-[#D4B896]/40 rounded-2xl p-6 sm:p-8 my-6">
              <p className="font-serif text-[16px] sm:text-lg font-bold text-center text-[#C85A10] leading-[1.8] mb-4">
                本当の驚きは、その後に起こります。
              </p>
              <p className="text-[#5A3A1A] text-center leading-[2.2]">
                過去の重い鎧を脱ぎ捨て、頑張る努力を手放した瞬間から、
                <br />
                パートナーシップ、仕事、人間関係など、
                <br />
                人生のあらゆる側面が最高のパフォーマンスを発揮し始めます。
              </p>
            </div>

            <p className="text-center font-serif text-[#3D2B1A]" style={{ fontSize: "clamp(15px, 3.5vw, 18px)" }}>
              思考や感情をコントロールしようと必死に頑張らなくても、
              <br />
              自動的に<span className="text-[#C85A10] font-bold">「望む幸せな現実」</span>へと
              動き出し始めるのです。
            </p>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* セクション5: CTA（2回目） */}
      {/* ============================================ */}
      <section className="py-12 sm:py-20 bg-[#3D2B1A]">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <p className="font-serif text-[16px] sm:text-xl font-bold text-white leading-[2] mb-3">
            「本当に、優しく触れるだけで、
            <br />
            そんなに変わるの？」
          </p>
          <p className="text-white/80 text-[13px] sm:text-base mb-8 leading-[2]">
            オンライン越しに「あなたの体」で証明させてください。
          </p>
          <CTAButton onClick={openForm} />
        </div>
      </section>

      {/* ============================================ */}
      {/* セクション6: HAPPY FUTURE 動き出す幸せな未来 */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-20 bg-[#FAF5EE]">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#C07840] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase font-bold">Happy Future</p>
            <h2 className="font-serif text-[20px] sm:text-2xl md:text-3xl font-bold leading-relaxed text-[#3D2B1A]">
              動き出す<span className="text-[#C85A10]">幸せな未来</span>
            </h2>
          </div>
          <div className="space-y-5 sm:space-y-6">
            <MangaImage src={MANGA.m7} alt="漫画7 - 数ヶ月後の変化" />
            <MangaImage src={MANGA.m8} alt="漫画8 - 開業の夢" delay={100} />
            <MangaImage src={MANGA.m9} alt="漫画9 - お客様との関わり" delay={200} />
            <MangaImage src={MANGA.m10} alt="漫画10 - 次はあなたの番" delay={300} />
            <MangaImage src={MANGA.m11} alt="漫画11 - 先生からのメッセージ" delay={400} />
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* セクション7: CTA（3回目） */}
      {/* ============================================ */}
      <section className="py-12 sm:py-16 bg-[#F5EFE6]">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <CTAButton onClick={openForm} />
        </div>
      </section>

      {/* ============================================ */}
      {/* セクション8: RESULTS 受講生の声 */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-20 bg-[#FAF5EE]">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#C07840] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase font-bold">Results</p>
            <h2 className="font-serif text-[18px] sm:text-2xl md:text-3xl font-bold leading-[1.8] text-[#3D2B1A]">
              「今までは何だったんだ！」
              <br />
              <span className="text-[#C85A10]">プロも未経験者も驚く、</span>
              <br />
              人生が動いた数々の事実
            </h2>
          </div>
          <div className="bg-[#F5EFE6] border border-[#D4B896]/40 rounded-2xl p-5 sm:p-7 mb-8">
            <p className="text-[#5A3A1A] text-[13px] sm:text-base leading-[2.2] text-center">
              漫画のストーリーは、決して作り話ではありません。
              人間の持つ「自然治癒力」のメカニズムに基づいたアプローチだからこそ、
              私がやっても、未経験のあなたがやっても、プロのボディワーカーがやっても、
              <strong className="text-[#3D2B1A]">同じように圧倒的な結果が出る</strong>のです。
            </p>
          </div>
          <div className="space-y-5 sm:space-y-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} delay={i * 100} />
            ))}
          </div>
          <p className="text-[11px] sm:text-xs text-[#9A7A5A] text-center mt-6">
            ※上記は個人の感想であり、成果や成功を保証するものではありません。
          </p>
        </div>
      </Section>

      {/* ============================================ */}
      {/* セクション9: PROFILE 講師プロフィール */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-20 bg-[#F5EFE6]">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#C07840] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase font-bold">Profile</p>
            <h2 className="font-serif text-[18px] sm:text-2xl md:text-3xl font-bold leading-[1.8] text-[#3D2B1A]">
              諦めを希望に変える。
              <br />
              <span className="text-[#C85A10]">私がこのメソッドに行き着いた理由</span>
            </h2>
          </div>

          <div className="space-y-5 text-[#5A3A1A] text-[14px] sm:text-base leading-[2.2]">
            <p>
              橋本みき。27年間、のべ5万人以上の方々に向き合ってきた中で、私自身も深刻な体の問題を経験しました。
            </p>
            <p>
              スポーツ選手として活躍していた頃、膝の半月板を損傷し、医師から「もう普通には歩けないかもしれない」と告げられました。
            </p>
            <div className="bg-white/70 border border-[#D4B896]/40 rounded-2xl p-5 sm:p-7">
              <p className="text-[#3D2B1A] text-[14px] sm:text-base leading-[2.2] font-bold text-center">
                気付けば、子供の頃から抱えていた不調が嘘のように消え去り、後遺症すらも無くなっていました。
              </p>
              <p className="text-[#C85A10] text-[14px] sm:text-base leading-[2.2] font-bold text-center mt-2">
                それどころか、スポーツ現役時代よりも可動域が広がり、滑らかな動きを取り戻してしまったのです。
              </p>
            </div>
            <p>
              今、医療や教育の現場は待ったなしの状況です。だからこそ、一部の天才にしかできない感覚を削ぎ落とし、特別な才能や力に頼らず、未経験のあなたでも「大切な家族を守り、プロとして圧倒的に感謝されながら豊かになる」ための本質的なアプローチとして体系化したのが<strong className="text-[#3D2B1A]">『ニューロライフメソッド』</strong>です。
            </p>

            {/* 講座開催実績 */}
            <div className="bg-white/70 border border-[#D4B896]/40 rounded-xl p-4 sm:p-6 my-4">
              <p className="text-[#3D2B1A] font-serif font-bold text-[14px] sm:text-base mb-3">
                講座の広がり
              </p>
              <p className="text-[#5A3A1A] text-[13px] sm:text-sm leading-[2.2]">
                現在、このメソッドは私の想像を超えて広がりを見せています。これまでの講座は、大分、宮崎、鹿児島、福岡、沖縄といった九州・沖縄各県をはじめ、山口、大阪、東京で開催。さらにオンラインを通じて、日本全国のみならずシンガポールなど海外からも受講生が参加してくださるようになりました。
              </p>
              <p className="text-[#5A3A1A] text-[13px] sm:text-sm leading-[2.2] mt-2">
                また、講座の枠を超え、日常から離れて心身を深く解放する「国内外でのリトリート」も開催しており、その共感の輪は着実に世界へと広がっています。
              </p>
            </div>

            {/* Photo Collage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <img src={COLLAGE.kouza} alt="講座の様子" className="w-full h-auto rounded-xl shadow-md" loading="lazy" />
              <img src={COLLAGE.retreat} alt="リトリートの様子" className="w-full h-auto rounded-xl shadow-md" loading="lazy" />
            </div>

            <div className="mt-6 text-center">
              <p className="font-serif text-[14px] sm:text-lg text-[#3D2B1A] italic leading-[2]">
                「99%ダメだと言われても、1%の可能性があるなら、
                <br />
                それは希望に変えられる」
              </p>
              <p className="text-[#5A3A1A] text-[13px] sm:text-sm mt-2">私はそう信じています。</p>
              <p className="text-[#5A3A1A] text-[13px] sm:text-sm mt-3 leading-[2]">
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

      {/* ============================================ */}
      {/* セクション10: SPECIAL GIFT 特別特典 */}
      {/* ============================================ */}
      <section
        className="relative py-12 sm:py-20 bg-[#3D2B1A]"
      >
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-8">
            <p className="text-[#F5C98A] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase font-bold">Special Gift</p>
            <h2 className="font-serif text-[18px] sm:text-xl md:text-2xl font-bold text-white leading-[1.8]">
              今なら「特別特典」をプレゼント！
            </h2>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-xl p-5 sm:p-7 mb-8">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#C07840]/30 flex items-center justify-center shrink-0">
                <span className="text-xl sm:text-2xl">📘</span>
              </div>
              <div>
                <p className="text-[#F5C98A] text-[12px] sm:text-sm font-bold mb-1">電子書籍</p>
                <p className="text-white font-serif font-bold text-[15px] sm:text-lg mb-2 leading-[1.8]">
                  『変わらないプロと、変わる初心者の違い』
                </p>
                <p className="text-white/75 text-[12px] sm:text-sm leading-[2]">
                  なぜ、いくら技術を学んでも結果が出ないのか？ 未経験からでも圧倒的な結果を出す人が、無意識にやっている「本質的な前提」を明かした、門外不出の一冊です。
                </p>
              </div>
            </div>
          </div>

          {/* 限定性 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#C85A10]/20 border border-[#C85A10]/40 px-5 py-3 rounded-full mb-6">
              <Clock className="w-4 h-4 text-[#F5C98A]" />
              <span className="text-white text-[13px] sm:text-sm font-bold">少人数限定 ── 枠が埋まり次第、募集終了</span>
            </div>
            <p className="text-white/75 text-[13px] sm:text-sm mb-6 leading-[2]">
              現在、複数店舗の経営やプログラム運営を行っているため、
              私が直接お話しできる枠には限りがございます。
              枠が埋まってしまう前に、
              今すぐLINEに登録して日程を確保してください。
            </p>
          </div>

          <div className="text-center">
            <CTAButton onClick={openForm} size="lg" />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* セクション11: 追伸 */}
      {/* ============================================ */}
      <Section className="py-12 sm:py-20 bg-[#FAF5EE]">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-6">
            <p className="text-[#C07840] text-[11px] sm:text-xs tracking-[0.2em] mb-3 uppercase font-bold">P.S.</p>
            <h2 className="font-serif text-[18px] sm:text-xl md:text-2xl font-bold leading-relaxed text-[#3D2B1A]">
              あなたへ贈る最後のメッセージ
            </h2>
          </div>
          <div className="space-y-4 text-[#5A3A1A] text-[14px] sm:text-base leading-[2.2]">
            <p>最後までお読みいただき、本当にありがとうございます。</p>
            <div className="bg-[#F5EFE6] border border-[#D4B896]/40 rounded-2xl p-5 sm:p-7">
              <p className="text-[#5A3A1A] text-[13px] sm:text-base leading-[2.2]">
                私がこのメソッドを世に出し、あなたにお伝えしている一番の理由。
                それは、<strong className="text-[#3D2B1A]">「諦めからではなく、希望から選ぶ人生を生きてほしい」</strong>という思い。
              </p>
              <p className="text-[#5A3A1A] text-[13px] sm:text-base leading-[2.2] mt-3">
                そしてもう一つ。
                あなた起点で始まる<strong className="text-[#C85A10]">「幸せのバタフライエフェクト」</strong>を起こしてほしいからです。
              </p>
            </div>
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
            <div className="bg-white/70 border border-[#D4B896]/40 rounded-2xl p-5 sm:p-7">
              <p className="font-serif text-[#3D2B1A] font-bold leading-[2] text-center" style={{ fontSize: "clamp(15px, 3.5vw, 18px)" }}>
                特別な才能は不要です。
                <br />
                あなたのその「優しい手」から、
                <br />
                幸せの連鎖をスタートさせませんか？
              </p>
            </div>
            <p className="text-center">
              その最初の羽ばたきを起こすための第一歩として、
              まずは画面越しに、あなた自身の体でこの変化を体感しに来てください。
            </p>
            <p className="text-center font-serif text-[#C07840]">
              あなたとお会いできるのを、心待ちにしています。
            </p>
          </div>
          {/* Final CTA */}
          <div className="text-center mt-8 sm:mt-12">
            <CTAButton onClick={openForm} size="lg" />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 bg-[#3D2B1A] border-t border-[#5A3A1A]/30">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <p className="text-[#9A7A5A] text-[11px] sm:text-xs">
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
        bg-white/80 border border-[#D4B896]/40 rounded-2xl p-5 sm:p-8
        transition-all duration-700 ease-out shadow-md
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C85A10]/10 border border-[#C85A10]/20 flex items-center justify-center">
            <span className="text-[#C85A10] text-xs font-bold">✕</span>
          </div>
        </div>
        <div>
          <p className="text-[#C85A10]/60 text-[11px] sm:text-xs font-mono mb-1">過去の常識 {number}</p>
          <h3 className="font-serif text-[15px] sm:text-lg font-bold text-[#3D2B1A] mb-3 leading-[1.8]">
            {title}
          </h3>
          <p className="text-[#5A3A1A] text-[13px] sm:text-sm leading-[2.2]">
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
        bg-white/80 border border-[#D4B896]/40 rounded-2xl p-5 sm:p-8
        transition-all duration-700 ease-out shadow-md
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#C07840]/10 flex items-center justify-center text-lg">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#C85A10] text-[#C85A10]" />
            ))}
          </div>
          <p className="text-[#5A3A1A] text-[12px] sm:text-xs font-medium">{name}</p>
        </div>
      </div>
      <div className="relative">
        <MessageCircle className="absolute -top-1 -left-1 w-4 h-4 text-[#C07840]/20" />
        <p className="text-[#5A3A1A] text-[13px] sm:text-sm leading-[2.2] pl-2">
          {text}
        </p>
      </div>
    </div>
  );
}

function PhotoSlider() {
  const [current, setCurrent] = useState(0);
  const photos = [
    { src: COLLAGE.kouza, caption: "全国各地での講座の様子" },
    { src: COLLAGE.retreat, caption: "国内外リトリートの様子" },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {photos.map((photo, i) => (
          <div key={i} className="w-full shrink-0">
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="bg-[#3D2B1A]/80 text-white text-[12px] sm:text-sm text-center py-2 px-4">
              {photo.caption}
            </div>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[#C85A10] w-4" : "bg-[#D4B896]"}`}
          />
        ))}
      </div>
    </div>
  );
}

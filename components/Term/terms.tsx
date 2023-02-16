import Tiles from "../Tile/Tiles";
import s from "@/styles/Terms.module.css";

function Example(props: { text?: string; tiles: string }) {
  return (
    <div className={s.tileExample}>
      {props.text && <div>{props.text}</div>}
      <Tiles height={32} names={props.tiles} />
    </div>
  );
}

type TermType = {
  word: string;
  kana?: string;
  description: React.ReactNode;
};

// List of terms (sorted by replacement priority)
const terms: TermType[] = [
  {
    word: "副露",
    kana: "フーロ",
    description: <>チー・ポン・カン（大明槓）の総称。鳴き。</>,
  },
  {
    word: "嶺上牌",
    kana: "リンシャンパイ",
    description: <>槓(カン)をした際にドラ表示牌の左側から補填する牌のこと。</>,
  },
  {
    word: "海底牌",
    kana: "ハイテイハイ",
    description: <>局における最後のツモ牌のこと。</>,
  },
  {
    word: "河底牌",
    kana: "ホウテイハイ",
    description: <>局における最後の打牌のこと。</>,
  },
  {
    word: "役牌",
    kana: "ヤクハイ",
    description: <>場風牌、自風牌、三元牌（白・發・中）の総称。</>,
  },
  {
    word: "風牌",
    kana: "フォンパイ",
    description: (
      <>
        東・南・西・北の総称。
        <Example tiles="ton,nan,shaa,pei" />
      </>
    ),
  },

  {
    word: "暗槓",
    kana: "アンカン",
    description: (
      <>
        自分の手牌にある4つの同じ牌で完成させるカンのこと。牌を晒すが門前(メンゼン)が崩れないという特徴がある。
        <Example text="例 ）" tiles="back,man3*2,back" />
      </>
    ),
  },
  {
    word: "門前",
    kana: "メンゼン",
    description: <>鳴いていない状態のこと。</>,
  },
  {
    word: "テンパイ",
    description: <>和了（アガリ）に必要な牌が残り1枚となった状態のこと</>,
  },
  {
    word: "対子",
    kana: "トイツ",
    description: "牌2つからなるペア",
  },
  {
    word: "刻子",
    kana: "コーツ",
    description: (
      <>
        同じ牌を3枚集めた1組のこと。数牌でも字牌でも作ることができる。
        <Example text="例 ）" tiles="pin2*3" />
      </>
    ),
  },
  {
    word: "順子",
    kana: "シュンツ",
    description: (
      <>
        数の連続する牌を3枚集めた1組のこと。数牌のみで作ることができる。
        <Example text="例 ）" tiles="pin2^3" />
      </>
    ),
  },
  {
    word: "面子",
    kana: "メンツ",
    description: (
      <>
        和了（ホーラ＝アガり）の形を整える際に揃える牌の組み合わせのこと。順子、刻子、槓子の総称。
        <Example text="例 ）" tiles="sou6^3" />
        <Example text="例 ）" tiles="pin1*3" />
      </>
    ),
  },
  {
    word: "槓子",
    kana: "カンツ",
    description: (
      <>
        槓をして同じ牌を4つ1組にして晒したもののこと。4枚組になっているが、刻子としても扱う。
        <Example text="例）" tiles="man2,(man2),man2*2" />
        <Example text="例）" tiles="ton,(ton+ton),ton" />
        <Example text="例）" tiles="back,pin5*2,back" />
      </>
    ),
  },
  {
    word: "雀頭",
    kana: "ジャントウ",
    description: (
      <>
        同じ牌2枚がそろったもの。あたま。
        <Example text="例 ）" tiles="pin5*2" />
      </>
    ),
  },
  {
    word: "自風牌",
    kana: "ジカゼハイ",
    description: (
      <>
        東・南・西・北のうち、自風と対応する牌のこと。三元牌(白・發・中)と同じように役牌扱いになる。
      </>
    ),
  },
  {
    word: "場風牌",
    kana: "バカゼハイ",
    description: (
      <>
        東・南・西・北のうち、場風と対応する牌のこと。三元牌(白・發・中)と同じように役牌扱いになる。
      </>
    ),
  },
  {
    word: "三元牌",
    kana: "サンゲンパイ",
    description: (
      <>
        白・發・中の総称。
        <Example tiles="haku,hatsu,chun" />
      </>
    ),
  },
  {
    word: "中張牌",
    kana: "チュンチャンパイ",
    description: (
      <>
        数牌の2から8のこと。
        <Example tiles="man2^7" />
        <Example tiles="pin2^7" />
        <Example tiles="sou2^7" />
      </>
    ),
  },
  {
    word: "么九牌",
    kana: "ヤオチューパイ",
    description: (
      <>
        一九字牌の総称。
        <Example text="" tiles="man1,man9,pin1,pin9,sou1,sou9" />
        <Example text="" tiles="ton,nan,shaa,pei,haku,hatsu,chun" />
      </>
    ),
  },
  {
    word: "加槓",
    kana: "カカン",
    description: (
      <>
        ポンで晒した牌（3枚）に、その牌の4枚目を加える行為。ポンした牌と同じ牌をツモってきた場合と、すでに手の内に持っている場合に可能。
        <Example text="例 ）" tiles="hatsu,(hatsu+hatsu),hatsu" />
      </>
    ),
  },
];

export default terms;
export type { TermType };

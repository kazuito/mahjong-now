import Header from "@/components/Header";
import s from "@/styles/HandsPage.module.css";
import Link from "next/link";
import { useRef } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { HiBadgeCheck } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { handSearchQueryState } from "@/components/states";
import hepburn from "hepburn";
import Tiles from "@/components/Tile/Tiles";
import TermReplacer from "@/components/Term/TermReplacer";

type hanValueType = {
  key: string;
  displayText: string;
  value: number;
};

const hanValues = {
  han1: {
    key: "han1",
    displayText: "1翻",
    value: 1,
  },
  han2: {
    key: "han2",
    displayText: "2翻",
    value: 2,
  },
  han2_25: {
    key: "han2_25",
    displayText: "2翻25符",
    value: 2.25,
  },
  han3: {
    key: "han3",
    displayText: "3翻",
    value: 3,
  },
  han6: {
    key: "han6",
    displayText: "6翻",
    value: 6,
  },
  yakuman: {
    key: "yakuman",
    displayText: "役満",
    value: 13,
  },
};

// Text Decoration
function Deco(props: { children: any; hl?: boolean; bold?: boolean }) {
  let classNames = [];

  if (props.hl) classNames.push(s.textDeco_hl);
  if (props.bold) classNames.push(s.textDeco_bold);

  return <span className={classNames.join(" ")}>{props.children}</span>;
}

function Hand(props: {
  name: {
    kana: string;
    kanji: string;
    en: string;
  };
  claim?: boolean; // 鳴き
  gradeDownByClaim?: number; // 喰い下がり
  hanValue: hanValueType; // 翻
  description: any;
  shortDesc: string;
  children: any;
}) {
  const [searchQuery, setSearchQuery] = useRecoilState(handSearchQueryState);

  let visible = true;
  let queryRomaji = hepburn.fromKana(searchQuery);
  let nameRomaji = hepburn.fromKana(props.name.kana);
  let queryKatakana = hepburn.toKatakana(queryRomaji);

  if (
    searchQuery != "" &&
    !(
      props.name.kana.includes(queryKatakana) ||
      queryKatakana.includes(props.name.kana) ||
      nameRomaji.includes(queryRomaji) ||
      queryRomaji.includes(nameRomaji) ||
      props.name.kana.includes(searchQuery) ||
      searchQuery.includes(props.name.kana) ||
      props.name.kanji.includes(searchQuery) ||
      searchQuery.includes(props.name.kanji) ||
      props.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery.toLowerCase().includes(props.name.en.toLowerCase())
    )
  )
    visible = false;

  let attr = visible ? { "data-visible": "" } : { "data-hidden": "" };

  let id = props.name.en.toLowerCase().replace(/\s/g, "-");
  return (
    <div id={id} className={s.handBox} {...attr}>
      <div className={`${s.handHead} ${s["val-" + props.hanValue.key]}`}>
        <div className={s.handTags}>
          <div className={`${props.claim ? s.handTagBorder : s.handTag}`}>
            {props.gradeDownByClaim
              ? `喰い下がり${props.gradeDownByClaim}翻`
              : props.claim
              ? "鳴きOK"
              : "門前のみ"}
          </div>
        </div>
        <div className={s.handNames}>
          <h3 className={s.handName}>{props.name.kana}</h3>
          <div className={s.handSubName}>{props.name.kanji}</div>
        </div>
        <div className={s.handHanValue}>{props.hanValue.displayText}</div>
      </div>
      <div className={s.handShortDescriptionWrapper}>
        <HiBadgeCheck />
        <div className={s.handShortDescription}>
          <TermReplacer>{props.shortDesc}</TermReplacer>
        </div>
      </div>
      <div className={s.tileLine}>{props.children}</div>
      <div className={s.handDescription}>
        <TermReplacer>{props.description}</TermReplacer>
      </div>
      <Link href={`./hands/${id}`} className={s.handDetailsLink}>
        <BsCaretRightFill size={16} />
        <span>詳しい解説を見る</span>
      </Link>
    </div>
  );
}

function TileGroup(props: {
  children: any;
  description: any;
  lineColor: string;
  marginLeft?: boolean;
}) {
  const colors = {
    blue: "#4d9fc1",
    red: "#d96b6b",
  };

  let color = colors[props.lineColor as keyof typeof colors];
  return (
    <>
      <div
        className={s.tileGroup}
        style={{
          marginLeft: props.marginLeft ? 12 : 0,
        }}
      >
        {props.children}
        <div
          className={s.groupLine}
          style={{
            background: color,
          }}
        ></div>
        <div className={s.tileGroupDetails}>{props.description}</div>
      </div>
    </>
  );
}

export default function Hands() {
  const [searchQuery, setSearchQuery] = useRecoilState(handSearchQueryState);
  const inputRef = useRef<any>();

  return (
    <>
      <Header />
      <main className={s.main}>
        <div className={s.searchBox}>
          <FiSearch size={28} />
          <input
            ref={inputRef}
            value={searchQuery}
            onInput={(e) => {
              setSearchQuery((e.target as HTMLInputElement).value);
            }}
            className={s.searchInput}
            placeholder="役の名前で検索"
            type="text"
          />
          <div className={s.searchResetBtn}>
            <GrClose
              size={18}
              onClick={() => {
                setSearchQuery("");
                inputRef?.current.focus();
              }}
            />
          </div>
        </div>

        <div className={s.handSection}>
          <div className={s.sectionTitle}>
            １翻役
            <span>　全11種</span>
          </div>
          <Hand
            name={{
              kana: "リーチ",
              kanji: "立直",
              en: "Reach",
            }}
            hanValue={hanValues.han1}
            description={
              <>
                テンパイの形になっている場合、リーチと宣言して1,000点棒を場に出すことで成立。アガったときに裏ドラを見ることができる。
              </>
            }
            shortDesc="鳴かずにテンパイで宣言"
          >
            <TileGroup description="１雀頭" lineColor="blue">
              <Tiles names="sou2*2" />
            </TileGroup>
            <TileGroup description="４面子" lineColor="red">
              <Tiles names="man5*3,pin2,pin3,pin4,sou4,sou5,sou6,man7,man8,man9" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "イッパツ",
              kanji: "一発",
              en: "First Turn Win",
            }}
            hanValue={hanValues.han1}
            description="リーチの宣言後、一巡目までにツモまたはロンでアガった場合に成立する役。ただし、一巡以内に鳴きが入ると成立しない。"
            shortDesc="リーチ後の一巡目でアガる"
          >
            <TileGroup
              description="立直（リーチ）の宣言をしている状態"
              lineColor="blue"
            >
              <Tiles names={"blank*14"} />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "メンゼンチンツモ",
              kanji: "門前清自摸和",
              en: "Concealed Self-Draw",
            }}
            hanValue={hanValues.han1}
            description="門前の状態で、ツモによって手牌がアガりの形にそろった場合に付く役。"
            shortDesc="鳴かずにツモ上がり"
          >
            <TileGroup description="門前" lineColor="blue">
              <Tiles names="blank*14" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ヤクハイ",
              kanji: "役牌",
              en: "Value Tiles",
            }}
            hanValue={hanValues.han1}
            description={
              <>
                三元牌と自風牌や場風牌の東・南・西・北で刻子や槓子を作ると成立する役。雀頭や待ちの制限はない。
              </>
            }
            shortDesc="役牌の刻子か槓子を揃える"
            claim
          >
            <TileGroup description="役牌の刻子か槓子" lineColor="red">
              <Tiles names="chun*3" />
            </TileGroup>
            <TileGroup description="上がりの形" lineColor="blue">
              <Tiles names="blank*11" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "タンヤオ",
              kanji: "断么九",
              en: "All Simples",
            }}
            hanValue={hanValues.han1}
            description={
              <>
                么九牌を一つも使わず、中張牌のみを使って手牌を完成させた場合に成立する。
                面子は刻子、順子、槓子のどれでもよい。
              </>
            }
            shortDesc="２～８だけで揃える"
            claim
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="sou3*2" />
            </TileGroup>
            <TileGroup description="一九字牌の無い面子" lineColor="blue">
              <Tiles names="pin3,pin4,pin5,pin8*3,man2,man3,man4,man6*3" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ピンフ",
              kanji: "平和",
              en: "All Runs",
            }}
            hanValue={hanValues.han1}
            description={
              <>
                4つの面子を順子で作る。
                <Deco hl>雀頭は役牌以外で作らなければならない</Deco>。
                <Deco hl>両面待ちの場合のみ成立</Deco>。
              </>
            }
            shortDesc="鳴かずに、両面待ちで４つの順子"
          >
            <TileGroup
              description={
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  雀頭
                  <br />
                  (役牌以外)
                </div>
              }
              lineColor="red"
            >
              <Tiles names="man4*2" />
            </TileGroup>
            <TileGroup description="門前で順子のみの面子" lineColor="blue">
              <Tiles names="man6,man7,man8,pin5,pin6,pin7,sou6,sou7,sou8" />
            </TileGroup>
            <TileGroup description="両面待ち" lineColor="red">
              <Tiles names="sou4,sou5" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "イーペーコー",
              kanji: "一盃口",
              en: "Double-Run",
            }}
            hanValue={hanValues.han1}
            description="同種(＝同じ色の牌)の牌で同じ順序の 順子 を 2面子(メンツ)を作る。"
            shortDesc="同じ順子を2組揃える"
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="blank*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="blue">
              <Tiles names="blank*6" />
            </TileGroup>
            <TileGroup description="同じ順子2組" lineColor="red">
              <Tiles names="pin2,pin3,pin4,pin2,pin3,pin4" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ハイテイ",
              kanji: "海底撈月",
              en: "Final Tile Win",
            }}
            hanValue={hanValues.han1}
            description={
              <>
                牌山の最後の牌を海底牌といい、その牌をツモしてアガると成立。ツモアガり。
              </>
            }
            shortDesc="最後のツモでアガる"
            claim
          >
            <TileGroup description="アガりの形" lineColor="blue">
              <Tiles names="blank*15" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ホウテイ ",
              kanji: "河底撈魚",
              en: "Final Tile Win",
            }}
            hanValue={hanValues.han1}
            description={
              <>
                海底牌をツモした人が最後に打牌した河底牌でロンをすると成立。ロンアガり。
              </>
            }
            shortDesc="最後の打牌でロン"
            claim
          >
            <TileGroup description="アガりの形" lineColor="blue">
              <Tiles names="blank*15" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "リンシャンカイホウ",
              kanji: "嶺上開花",
              en: "King’s Tile Draw",
            }}
            hanValue={hanValues.han1}
            description={
              <>
                カンしたときに補填する嶺上牌でアガると成立。明槓でも暗槓でもOK。※槍槓でロンをされた場合は、嶺上開花は不成立。
              </>
            }
            shortDesc="カンしたときの嶺上牌でアガる"
            claim
          >
            <TileGroup description="アガりの形" lineColor="blue">
              <Tiles names="blank*15" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "チャンカン",
              kanji: "槍槓",
              en: "Add-A-Quad",
            }}
            hanValue={hanValues.han1}
            description={
              <>
                他家が加槓した際、その牌(カカンで晒された牌)でロンをすると成立。
              </>
            }
            shortDesc="他のプレーヤーの加槓(カカン)牌でロン"
            claim
          >
            <TileGroup description="アガりの形" lineColor="blue">
              <Tiles names="blank*15" />
            </TileGroup>
          </Hand>
        </div>
        <div className={s.handSection}>
          <div className={s.sectionTitle}>２翻役</div>
          <Hand
            name={{
              kana: "ダブルリーチ",
              kanji: "ダブル立直",
              en: "Double Reach",
            }}
            hanValue={hanValues.han2}
            description={
              <>
                一巡目の捨牌でリーチをかけると成立。ただし、それまでに副露があった場合は成立しない。※子：最初の配牌時にテンパイかイーシャンテンであり、第一ツモでテンパイが確定すればOK
                ※親：最初の配牌時の14枚でテンパイが確定していればOK
              </>
            }
            shortDesc="一巡目の捨牌でリーチを宣言"
          >
            <TileGroup description="上がりの形" lineColor="blue">
              <Tiles names="blank*14" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "サンショクドウジュン",
              kanji: "三色同順",
              en: "Three Color Triples",
            }}
            hanValue={hanValues.han2}
            description={
              <>
                萬子・索子・筒子それぞれの色で同じ並びの順子を作ったときに成立する。鳴いた場合は1翻となる。
              </>
            }
            shortDesc="萬子・筒子・索子で同じ並びの順子を揃える"
            gradeDownByClaim={1}
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="blank*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="blue">
              <Tiles names="blank*3" />
            </TileGroup>
            <TileGroup
              description="萬子、筒子、索子で同じ数字の順子"
              lineColor="red"
            >
              <Tiles names="man3^3,pin3^3,sou3^3" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "サンショクドウコウ",
              kanji: "三色同刻",
              en: "Three Concealed Triples",
            }}
            hanValue={hanValues.han2}
            description={
              <>
                萬子・筒子・索子それぞれの色で同じ数字の刻子（槓子も含む）を作ったときに成立する。
              </>
            }
            shortDesc="萬子・筒子・索子で同じ数字の刻子を揃える"
            claim
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="blank*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="blue">
              <Tiles names="blank*3" />
            </TileGroup>
            <TileGroup
              description="萬・筒・索子で同じ数字の刻子"
              lineColor="red"
            >
              <Tiles names="man3*3,pin3*3" />
            </TileGroup>
            <TileGroup marginLeft description="鳴きOK" lineColor="red">
              <Tiles names="(sou3),sou3*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "サンアンコウ",
              kanji: "三暗刻",
              en: "Three Concealed Triples",
            }}
            hanValue={hanValues.han2}
            description={
              <>
                暗刻を3つ作った時に成立する。暗槓が含まれていてもよい。残りの1面子は順子でもよく、鳴いてもよい。
              </>
            }
            shortDesc="3つの暗刻を揃える"
            claim
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="blank*2" />
            </TileGroup>
            <TileGroup description="3暗刻" lineColor="red">
              <Tiles names="man7*3,pin2*3,shaa*3" />
            </TileGroup>
            <TileGroup marginLeft description="1面子は鳴きOK" lineColor="blue">
              <Tiles names="(blank),blank*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "イッキツウカン",
              kanji: "一気通貫",
              en: "Full straight",
            }}
            hanValue={hanValues.han2}
            description={
              <>1つの色の数牌1から9までをすべて1枚ずつ揃えて3つの順子を作る。</>
            }
            shortDesc="同種の数牌で123・456・789と揃える"
            gradeDownByClaim={1}
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="blank*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="blue">
              <Tiles names="blank*3" />
            </TileGroup>
            <TileGroup description="1~9で3順子" lineColor="red">
              <Tiles names="man1^9" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "チートイツ",
              kanji: "七対子",
              en: "7 Pairs",
            }}
            hanValue={hanValues.han2_25}
            description={<>対子を7組そろえることで成立する。</>}
            shortDesc="7組の対子を揃える"
          >
            <TileGroup description="7対子" lineColor="blue">
              <Tiles names="man4*2,man6*2,pin2*2,sou3*2,sou8*2,nan*2,chun*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "トイトイホー",
              kanji: "対々和",
              en: "All Triples",
            }}
            hanValue={hanValues.han2}
            description={
              <>
                刻子を4つ作って上がると成立する（槓子が含まれていてもよい）。鳴き無しの場合、四暗刻（スーアンコウ）で役満となる。
              </>
            }
            shortDesc="4つの刻子を揃える"
            claim
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="blank*2" />
            </TileGroup>
            <TileGroup description="刻子" lineColor="red">
              <Tiles names="man8*3,pin3*3,sou4*3" />
            </TileGroup>
            <TileGroup marginLeft description="鳴きOK" lineColor="red">
              <Tiles names="(ton),ton*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "チャンタ",
              kanji: "混全帯么九",
              en: "Mixed outside hand",
            }}
            hanValue={hanValues.han2}
            description={
              <>4面子1雀頭の全てに么九牌（一九字牌）が関わっている形。</>
            }
            shortDesc="それぞれに一九字牌を含めて揃える"
            gradeDownByClaim={1}
          >
            <TileGroup description="雀頭" lineColor="red">
              <Tiles names="chun*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="red">
              <Tiles names="man7^3,pin1^3,nan*3,hatsu*3" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "サンカンツ",
              kanji: "三槓子",
              en: "Three Quads",
            }}
            hanValue={hanValues.han2}
            description={<>槓子を3つ作ることで成立する。</>}
            shortDesc="カンを3回する"
            claim
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="blank*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="blue">
              <Tiles names="blank*3" />
            </TileGroup>
            <TileGroup marginLeft description="3槓子" lineColor="red">
              <Tiles names="man2,(man2),man2*2,back,ton*2,back,chun,(chun+chun),chun" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ショウサンゲン",
              kanji: "小三元",
              en: "Little Dragons",
            }}
            hanValue={hanValues.han2}
            description={
              <>
                三元牌（白・發・中）のいずれか1種で雀頭を作り、
                残り2種を刻子もしくは槓子にすることで成立する。
                <Deco hl>必ず役牌×2と複合するので、実質4翻になります</Deco>。
              </>
            }
            shortDesc="白・發・中で1雀頭2面子を揃える"
            claim
          >
            <TileGroup description="面子" lineColor="blue">
              <Tiles names="blank*6" />
            </TileGroup>
            <TileGroup description="雀頭" lineColor="red">
              <Tiles names="hatsu*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="red">
              <Tiles names="haku*3" />
            </TileGroup>
            <TileGroup marginLeft description="鳴きOK" lineColor="red">
              <Tiles names="(chun),chun*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ホンロウトウ",
              kanji: "混老頭",
              en: "All terminals and honors",
            }}
            hanValue={hanValues.han2}
            description={
              <>
                4面子1雀頭を全て么九牌だけで揃える。
                <Deco hl>
                  必ずトイトイか七対子と複合するので、実質4翻になります
                </Deco>
                。 門前の場合は、三暗刻(サンアンコウ)とも複合します。
                また、門前でツモアガりもしくは単騎待ちでのロンの場合は四暗刻(スーアンコウ)[役満]となります。
              </>
            }
            shortDesc="一九字牌だけで揃える"
            claim
          >
            <TileGroup description="雀頭" lineColor="red">
              <Tiles names="man1*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="red">
              <Tiles names="man9*3,pin9*3,pei*3" />
            </TileGroup>
            <TileGroup marginLeft description="鳴きOK" lineColor="red">
              <Tiles names="(chun),chun*2" />
            </TileGroup>
          </Hand>
        </div>
        <div className={s.handSection}>
          <div className={s.sectionTitle}>3翻役</div>
          <Hand
            name={{
              kana: "リャンペーコー",
              kanji: "二盃口",
              en: "2 Double Runs",
            }}
            hanValue={hanValues.han3}
            description={
              <>
                同色同数の2順子
                を2組作ることで成立。一盃口(イーペーコー)が2つできている状態。
              </>
            }
            shortDesc="『同じ順子を2組』×2を揃える"
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="blank*2" />
            </TileGroup>
            <TileGroup description="同じ順子を2組" lineColor="red">
              <Tiles names="pin1^3,pin1^3" />
            </TileGroup>
            <TileGroup description="同じ順子を2組" lineColor="red">
              <Tiles names="sou6^3,sou6^3" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ジュンチャン",
              kanji: "純全帯么九",
              en: "Pure outside hand",
            }}
            hanValue={hanValues.han3}
            description={
              <>
                4面子1雀頭の全てに老頭牌（一九牌）が関わっている形。正式名称は『ジュンチャンタイヤオチュウ』。
              </>
            }
            shortDesc="それぞれに一九牌を含めて揃える"
            gradeDownByClaim={2}
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="man1*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="red">
              <Tiles names="man7^3,pin9*3,sou1^3,sou9*3" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ホンイツ",
              kanji: "混一色",
              en: "Half Flush",
            }}
            hanValue={hanValues.han3}
            description={
              <>
                萬子・索子・筒子のどれか一種と、字牌だけを使って4面子1雀頭を作る。
              </>
            }
            shortDesc="数牌1種と字牌だけで揃える"
            gradeDownByClaim={2}
          >
            <TileGroup description="雀頭" lineColor="red">
              <Tiles names="sou1*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="red">
              <Tiles names="sou2^3,sou5^3,sou8*3,pei*3" />
            </TileGroup>
          </Hand>
        </div>
        <div className={s.handSection}>
          <div className={s.sectionTitle}>6翻役</div>
          <Hand
            name={{
              kana: "チンイツ",
              kanji: "清一色",
              en: "Full Flush",
            }}
            hanValue={hanValues.han6}
            description={
              <>萬子・索子・筒子のどれか一種だけを使って4面子1雀頭を作る。</>
            }
            shortDesc="数牌1種だけで揃える"
            gradeDownByClaim={5}
          >
            <TileGroup description="雀頭" lineColor="red">
              <Tiles names="pin1*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="red">
              <Tiles names="pin2^3,pin4^3,pin7*3,pin9*3" />
            </TileGroup>
          </Hand>
        </div>
        <div className={s.handSection}>
          <div className={s.sectionTitle}>役満 全12種</div>
          <Hand
            name={{
              kana: "スーアンコウ",
              kanji: "四暗刻",
              en: "Four concealed Triples",
            }}
            hanValue={hanValues.yakuman}
            description={<>4つの面子を全て暗刻で揃えます。</>}
            shortDesc="鳴かずに４つの刻子"
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="man2*2" />
            </TileGroup>
            <TileGroup description="４暗刻" lineColor="red">
              <Tiles names="sou1*3,sou8*3,pin4*3,ton*3" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ダイサンゲン",
              kanji: "大三元",
              en: "Big Dragons",
            }}
            hanValue={hanValues.yakuman}
            description={
              <>三元牌(白・發・中)の全てを刻子もしくは槓子で揃えます。</>
            }
            shortDesc="白・發・中を全て揃える"
            claim
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="pin3*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="blue">
              <Tiles names="man5,man6,man7" />
            </TileGroup>
            <TileGroup description="白・發・中の刻子" lineColor="red">
              <Tiles names="haku*3,hatsu*3" />
            </TileGroup>
            <TileGroup marginLeft description="鳴きOK" lineColor="red">
              <Tiles names="(chun),chun*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "コクシムソウ",
              kanji: "国士無双",
              en: "Thirteen Orphans",
            }}
            hanValue={hanValues.yakuman}
            description={
              <>
                1・9・字牌を1枚ずつ全て揃えて、更にその中のどれか1種類だけ2枚揃えて
                雀頭を作ります。
              </>
            }
            shortDesc="1・9・字牌を１枚ずつ揃える、その内１種で雀頭"
          >
            <TileGroup description="一九字牌を1枚ずつ" lineColor="red">
              <Tiles names="pin1,pin9,sou1,sou9,man1,man9,ton,nan,shaa,pei,haku,hatsu,chun" />
            </TileGroup>
            <TileGroup description="+1枚" lineColor="red">
              <Tiles names="chun" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "リューイーソー",
              kanji: "緑一色",
              en: "All Green",
            }}
            hanValue={hanValues.yakuman}
            description={
              <>
                手牌全てを緑色の牌で揃えます。
                <Deco hl>緑色の牌は、索子の2、3、4、6、8と發のことです</Deco>
                。發を使わない緑一色をダブル役満とする場合があります。また、逆に發が無いと緑一色が成立しないというルールもあるので注意。
              </>
            }
            shortDesc="緑色の牌だけで揃える"
            claim
          >
            <TileGroup description="雀頭" lineColor="red">
              <Tiles names="sou6*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="red">
              <Tiles names="sou2,sou3,sou4,sou8*3,hatsu*3" />
            </TileGroup>
            <TileGroup marginLeft description={<>鳴きOK</>} lineColor="red">
              <Tiles names="(sou4),sou4*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ツーイーソー",
              kanji: "字一色",
              en: "All Honors",
            }}
            hanValue={hanValues.yakuman}
            description={<>字牌のみで全ての面子と雀頭を揃えます。</>}
            shortDesc="字牌だけで揃える"
            claim
          >
            <TileGroup description="雀頭" lineColor="red">
              <Tiles names="hatsu*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="red">
              <Tiles names="ton*3,nan*3,chun*3" />
            </TileGroup>
            <TileGroup marginLeft description={<>鳴きOK</>} lineColor="red">
              <Tiles names="(pei),pei*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "チンロウトウ",
              kanji: "清老頭",
              en: "All terminals",
            }}
            hanValue={hanValues.yakuman}
            description={<>1・9牌のみで全ての面子と雀頭を揃えます。</>}
            shortDesc="1・9牌だけで揃える"
            claim
          >
            <TileGroup description="雀頭" lineColor="red">
              <Tiles names="pin1*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="red">
              <Tiles names="pin9*3,sou1*3,man1*3" />
            </TileGroup>
            <TileGroup marginLeft description={<>鳴きOK</>} lineColor="red">
              <Tiles names="(man9),man9*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "スーカンツ",
              kanji: "四槓子",
              en: "Four Quads",
            }}
            hanValue={hanValues.yakuman}
            description={
              <>
                4つの面子を槓子(暗槓でも明槓でもOK)で揃えます。
                ※難易度の高さからダブル役満とする場合あり(ローカルルール)
              </>
            }
            shortDesc="槓(カン)を4回する"
            claim
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="sou4*2" />
            </TileGroup>
            <TileGroup marginLeft description="槓(カン)を4回" lineColor="red">
              <Tiles names="back,sou2*2,back,man4,(man4+man4),man4,back,man7*2,back,(pin8+pin8),pin8*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ショウスーシー",
              kanji: "小四喜",
              en: "Little Four Winds",
            }}
            hanValue={hanValues.yakuman}
            description={
              <>
                風牌(東・南・西・北)のいずれかを雀頭とし、残り3つの面子を刻子や
                槓子で揃えます。
              </>
            }
            shortDesc="東・南・西・北で雀頭と3面子を揃える"
            claim
          >
            <TileGroup description="面子" lineColor="blue">
              <Tiles names="pin2,pin3,pin4" />
            </TileGroup>
            <TileGroup description="雀頭" lineColor="red">
              <Tiles names="ton*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="red">
              <Tiles names="nan*3,shaa*3" />
            </TileGroup>
            <TileGroup marginLeft description="鳴きOK" lineColor="red">
              <Tiles names="(pei),pei*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "ダイスーシー",
              kanji: "大四喜",
              en: "Big Four Winds",
            }}
            hanValue={hanValues.yakuman}
            description={
              <>
                風牌の全てを刻子や槓子で揃えます。又は、風牌のいずれかを雀頭とし、残り3つの面子を刻子で揃えます。
                ※難易度の高さからダブル役満として採用されるケースも多い。
              </>
            }
            shortDesc="東・南・西・北で4面子を揃える"
            claim
          >
            <TileGroup description="雀頭" lineColor="blue">
              <Tiles names="man2*2" />
            </TileGroup>
            <TileGroup description="面子" lineColor="red">
              <Tiles names="ton*3,nan*3,shaa*3" />
            </TileGroup>
            <TileGroup marginLeft description="鳴きOK" lineColor="red">
              <Tiles names="(pei),pei*2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "チュウレンポウトウ",
              kanji: "九蓮宝燈",
              en: "Nine Gates",
            }}
            hanValue={hanValues.yakuman}
            description={
              <>
                萬子・筒子・索子 のどれか1種類で【 111 2345678 999 + X
                】の形を揃えます。Xは同種の任意の数字です。九面待ちで上がった場合は、「純正九蓮宝燈」と言い、ダブル役満とするケースが多い。
              </>
            }
            shortDesc="数牌1種で【 111 2345678 999 + X 】の形を揃える"
          >
            <TileGroup
              description="同種の数牌で 111 2345678 999 の形"
              lineColor="red"
            >
              <Tiles names="man1*3,man2,man3,man4,man5,man6,man7,man8,man9*3" />
            </TileGroup>
            <TileGroup description="+ X" lineColor="red">
              <Tiles names="man2" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "チーホウ",
              kanji: "地和",
              en: "Blessing of Earth",
            }}
            hanValue={hanValues.yakuman}
            description={
              <>
                自分が子の時、配牌の13枚で既にテンパイし、第一ツモで和了形(アガりの形)が完成している場合に成立します。※4メンツ1ジャントウの形のみでOK
              </>
            }
            shortDesc="子のとき、1回目のツモで上がる"
          >
            <TileGroup
              description="4面子1雀頭 or その他の上がりの形"
              lineColor="blue"
            >
              <Tiles names="blank*14" />
            </TileGroup>
          </Hand>
          <Hand
            name={{
              kana: "テンホウ",
              kanji: "天和",
              en: "Blessing of Heaven",
            }}
            hanValue={hanValues.yakuman}
            description={
              <>
                自分が親の時、配牌時の14枚で既に和了形(アガりの形)が完成している場合に成立します。※4メンツ1ジャントウの形のみでOK
              </>
            }
            shortDesc="親のとき、配牌の時点で上がる"
          >
            <TileGroup
              description="4面子1雀頭 or その他の上がりの形"
              lineColor="blue"
            >
              <Tiles names="blank*14" />
            </TileGroup>
          </Hand>
        </div>
      </main>
    </>
  );
}

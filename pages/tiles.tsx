import Header from "@/components/Header";
import Tile from "@/components/Tile/Tile";
import styles from "@/styles/TilesPage.module.css";

export default function Tiles() {
  return (
    <>
      <Header />
      <div className="main">
        <div className={`${styles.section}`}>
          <div className={styles.sectionTitle}>
            字牌<span className={styles.subTitle}>じはい</span>
          </div>
          <div className={styles.tileLine}>
            <Tile name="ton" />
            <Tile name="nan" />
            <Tile name="shaa" />
            <Tile name="pei" />
            <Tile name="haku" />
            <Tile name="hatsu" />
            <Tile name="chun" />
          </div>
        </div>
        <div className={`${styles.section}`}>
          <div className={styles.sectionTitle}>
            筒子<span className={styles.subTitle}>ピンズ</span>
          </div>
          <div className={styles.tileLine}>
            <Tile name="pin1" />
            <Tile name="pin2" />
            <Tile name="pin3" />
            <Tile name="pin4" />
            <Tile name="pin5" />
            <Tile name="pin6" />
            <Tile name="pin7" />
            <Tile name="pin8" />
            <Tile name="pin9" />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            索子<span className={styles.subTitle}>ソウズ</span>
          </div>
          <div className={styles.tileLine}>
            <Tile name="sou1" />
            <Tile name="sou2" />
            <Tile name="sou3" />
            <Tile name="sou4" />
            <Tile name="sou5" />
            <Tile name="sou6" />
            <Tile name="sou7" />
            <Tile name="sou8" />
            <Tile name="sou9" />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            萬子<span className={styles.subTitle}>マンズ（ワンズ）</span>
          </div>
          <div className={styles.tileLine}>
            <Tile name="man1" />
            <Tile name="man2" />
            <Tile name="man3" />
            <Tile name="man4" />
            <Tile name="man5" />
            <Tile name="man6" />
            <Tile name="man7" />
            <Tile name="man8" />
            <Tile name="man9" />
          </div>
        </div>
      </div>
    </>
  );
}

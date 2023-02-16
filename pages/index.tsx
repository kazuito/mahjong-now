import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Tile from "@/components/Tile/Tile";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Link href={"./hands"} className={styles.linkPanel}>
          <div className={styles.panelHead}>
            <Tile name="pin9" height={52} />
            <div className={styles.panelTitle}>
              <span>役</span>（やく）一覧
            </div>
          </div>
        </Link>
        <Link href={"./tiles"} className={styles.linkPanel}>
          <div className={styles.panelHead}>
            <Tile name="sou1" height={52} />
            <div className={styles.panelTitle}>
              <span>牌</span>（ハイ）一覧
            </div>
          </div>
        </Link>
      </main>
    </>
  );
}

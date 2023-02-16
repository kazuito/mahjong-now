import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useRecoilState } from "recoil";
import { handSearchQueryState } from "./states";

export default function Header() {
  const [headerPos, setHeaderPos] = useState(0);
  const [winScrollY, setWinScrollY] = useState(0);
  const [handSearchQuery, setHandSearchQuery] =
    useRecoilState(handSearchQueryState);

  let prevScrollY = 0;
  function onScrollHandler(e: Event) {
    setWinScrollY(window.scrollY);

    if (window.scrollY < 0) return;

    let diff = prevScrollY - window.scrollY;
    prevScrollY = window.scrollY;

    setHeaderPos((cur) => {
      let move = cur + diff;

      if (move < -60) return -60;
      if (move > 0) return 0;

      return move;
    });
  }

  useEffect(() => {
    document.addEventListener("scroll", onScrollHandler);
  }, []);

  return (
    <>
      <header
        className={styles.header}
        style={{
          transform: `translateY(${headerPos}px)`,
        }}
      >
        <Link href={"/"} className={styles.logo}>
          麻雀NOW
        </Link>
        {/* <div className={styles.navLinks}>
        <Link className={styles.navLink} href={"./tiles"}>
          牌リスト
        </Link>
      </div> */}{" "}
        {winScrollY > 100 && handSearchQuery != "" && (
          <div
            className={styles.resetSearch}
            onClick={async () => {
              setHandSearchQuery("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            検索をリセット
            <GrClose />
          </div>
        )}
      </header>
    </>
  );
}

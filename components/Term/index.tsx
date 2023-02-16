import s from "@/styles/Term.module.css";
import { CSSProperties, useEffect, useRef, useState } from "react";
import terms, { TermType } from "./terms";

export default function Term(props: { term: TermType; kana?: boolean }) {
  const [drawTooltip, setDrawTooltip] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({
    display: "none",
  });
  const termRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let left = tooltipRef.current?.getBoundingClientRect().left;
    let right = tooltipRef.current?.getBoundingClientRect().right;
    let width = tooltipRef.current?.getBoundingClientRect().width;
    let screenWidth = document.body.clientWidth;

    setTooltipStyle((cur: any) => {
      if (left && right && width) {
        if (left < 0) {
          return {
            ...cur,
            left: `calc(50% + ${-left + 8}px)`,
          };
        }
        if (left + width > screenWidth) {
          return {
            ...cur,
            left: `calc(50% - ${left + width - screenWidth + 8}px)`,
          };
        }
      }
    });
    setShowTooltip(drawTooltip);
  }, [drawTooltip]);

  return (
    <span
      className={s.tooltipBox}
      onMouseEnter={() => {
        setDrawTooltip(true);
      }}
      onMouseLeave={() => {
        setShowTooltip(false);
        setTimeout(() => {
          setDrawTooltip(false);
        }, 200);
      }}
    >
      <div
        className={`${s.tooltipBody} ${drawTooltip ? s.draw : ""} ${
          showTooltip ? s.show : ""
        }`}
        ref={tooltipRef}
        style={tooltipStyle}
      >
        <div className={s.termHeading}>
          {props.term.word}
          {props.term.kana && <>({props.term.kana})</>}
        </div>
        <div className={s.termContent}>{props.term.description}</div>
      </div>
      <div
        className={`${s.tooltipTri} ${drawTooltip ? s.draw : ""} ${
          showTooltip ? s.show : ""
        }`}
      ></div>
      <span className={s.word} ref={termRef}>
        {props.term.word}
        {props.term.kana && props.kana && <>({props.term.kana})</>}
      </span>
    </span>
  );
}

import React, { Children, ReactNode } from "react";
import reactStringReplace from "react-string-replace";
import { isArray } from "util";
import Term from ".";
import terms from "./terms";

const words = terms.map((term) => {
  return term.word;
});
const termRegex = RegExp(`(${words.join("|")})`);
console.log(termRegex);

function replaceTerms(children: ReactNode, kana?: boolean): ReactNode[] {
  const childArray = Children.toArray(children);

  const newChildren = childArray.map((child) => {
    if (typeof child === "string") {
      return (
        <>
          {reactStringReplace(child, termRegex, (match, i) => {
            let termIndex = terms.findIndex((term) => {
              return term.word === match;
            });
            return <Term key={i} term={terms[termIndex]} kana={kana} />;
          })}
        </>
      );
    } else if (React.isValidElement(child)) {
      const newChild = replaceTerms(child.props.children, kana);
      return React.cloneElement(child, {}, newChild);
    } else {
      return child;
    }
  });

  return newChildren;
}

function TermReplacer(props: {
  children: string | React.ReactNode[] | undefined;
  kana?: boolean;
}) {
  return <>{replaceTerms(props.children, props.kana)}</>;
}

export default TermReplacer;

import Tile from "./Tile";
import s from "@/styles/Tiles.module.css";
import { v4 as uuidv4 } from "uuid";

export default function Tiles(props: { names: string; height?: number }) {
  let tmp = props.names.replace(/\s/g, "").split(",");

  let names: string[] = [];
  for (let name of tmp) {
    let seriesMatch = name.match(/(.+?)\*([0-9]+)/);
    let increaseMatch = name.match(/(.+?)\^([0-9]+)/);

    //  Shorthand for ko-tsu 刻子
    // "pin3*3" => [pin3, pin3, pin3 ]
    if (seriesMatch) {
      for (let j = 0; j < Number(seriesMatch[2]); j++) {
        names.push(seriesMatch[1]);
      }
    }
    //  Shorthand for shun-tsu 順子
    //  "pin3^3" => [ pin3, pin4, pin5 ]
    else if (increaseMatch) {
      let tileName = name.match(/.+?(?=[0-9])/); // [0]:tileName
      let num = name.match(/([0-9]+)\^/); // [1]:num

      if (tileName && num)
        for (let j = 0; j < Number(increaseMatch[2]); j++) {
          names.push(`${tileName[0]}${Number(num[1]) + j}`);
        }
    }
    // Mono tile specification
    // "pin3" => [ pin3 ]
    else names.push(name);
  }

  return (
    <div className={s.tiles}>
      {names.map((name, i) => {
        let bracketsMatch = name.match(/\((.*?)\)/);
        if (bracketsMatch) {
          let tmp2 = bracketsMatch[1].split("+");
          if (tmp2.length == 1)
            return (
              <Tile
                key={uuidv4()}
                height={props.height}
                horizontal
                name={tmp2[0]}
              />
            );
          return (
            <div key={uuidv4()} className={s.horizontalTiles}>
              {tmp2.map((name) => {
                return (
                  <Tile
                    key={uuidv4()}
                    height={props.height}
                    horizontal
                    name={name}
                  />
                );
              })}
            </div>
          );
        }
        return <Tile key={uuidv4()} height={props.height} name={name} />;
      })}
    </div>
  );
}

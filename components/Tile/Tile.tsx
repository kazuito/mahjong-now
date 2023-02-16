import * as tiles from "./import";
import Image from "next/image";
import styles from "@/styles/Tile.module.css";

export default function Tile(props: {
  name: string;
  height?: number;
  horizontal?: boolean;
}) {
  let boxStyle = props.height
    ? {
        height: props.horizontal ? props.height * (3 / 4) : props.height,
        width: props.horizontal ? props.height : props.height * (3 / 4),
      }
    : {};

  let tileNameSuffix = props.horizontal ? "_h" : "";
  let srcPath =
    tiles[(props.name + tileNameSuffix) as keyof typeof import("./import")];
  return (
    <div className={styles.tile} style={boxStyle}>
      <Image
        className={styles.tileFront}
        alt=""
        src={
          tiles[
            ((props.name == "back" ? "back" : "front") +
              tileNameSuffix) as keyof typeof import("./import")
          ]
        }
      />
      {props.name != "back" && (
        <Image className={styles.tileFg} alt="Tile" src={srcPath} />
      )}
    </div>
  );
}

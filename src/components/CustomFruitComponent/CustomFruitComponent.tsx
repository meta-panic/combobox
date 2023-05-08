import { Fruit } from "../../pages/demo/types.ts";
import styles from "./CustomFruitComponent.module.scss";
import React, { CSSProperties } from "react";

export const CustomFruitComponent = ({ name, emoji }: Fruit) => {
  return (
    <div className={styles.custom}>
      <div className={styles.emojiWrapper}>{emoji}</div>
      {[...Array(4)].map((_, idx) => (
        <div className={styles.text} style={{ "--idx": idx } as CSSProperties}>
          {name}
        </div>
      ))}
    </div>
  );
};

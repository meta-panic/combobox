import styles from "./FruitComponent.module.scss";
import React from "react";
import { Fruit } from "../../pages/demo/types.ts";

export const FruitComponent = ({ name, emoji }: Fruit) => {
  return (
    <div className={styles.fruit}>
      {emoji && (
        <span className={styles.emojiWrapper} role={"presentation"}>
          {emoji}
        </span>
      )}
      {name}
    </div>
  );
};

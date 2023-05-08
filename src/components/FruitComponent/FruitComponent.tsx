import styles from "./FruitComponent.module.scss";
import React from "react";
import {Fruit} from "../../pages/demo/types.ts";

export const FruitComponent = ({ name, emoji }: Fruit) => {
    return (
        <div className={styles.fruit}>
            {emoji && <div className={styles.emojiWrapper}>{emoji}</div>}
            {name}
        </div>
    );
};

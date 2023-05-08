import {Fruit} from "./types.ts";
import styles from "../../components/ItemList/ItemList.module.scss";
import React from "react";

export const FruitComponent = ({ name, emoji }: Fruit) => {
    return (
        <>
            {emoji && <div className={styles.emojiWrapper}>{emoji}</div>}
            {name}
        </>
    );
};

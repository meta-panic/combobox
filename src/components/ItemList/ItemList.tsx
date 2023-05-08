import React, {
    ChangeEventHandler,
    FC,
    HTMLAttributes,
    InputHTMLAttributes,
    memo,
} from "react";
import {ListItem} from "./types.ts";

import styles from "./ItemList.module.scss";

interface ItemListProps extends HTMLAttributes<HTMLUListElement> {
    items: ListItem[],
    handleItemClick?: any,
    handleKeyDown?: any,
    controlsId: string,
    entityType: string,
}

const ItemList: FC<ItemListProps> = memo(
    ({
         items,
         handleItemClick,
         handleKeyDown,
         controlsId,
         entityType,
     }) => {
        return (
            <ul
                className={styles.list}
                id={controlsId}
                aria-label={entityType}
            >
                {items?.map((item) => (
                    <li
                        tabIndex={0}
                        key={item.name}
                        onClick={handleItemClick(item.name)}
                        onKeyDown={handleKeyDown}
                        role="option"
                        className={styles.item}
                    >
                        {item?.emoji && (
                            <div className={styles.emojiWrapper}>{item.emoji}</div>
                        )}
                        {item.name}
                    </li>
                ))}
            </ul>
        );
    }
);

export default ItemList;

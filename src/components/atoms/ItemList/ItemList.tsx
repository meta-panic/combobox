import React, {
  ChangeEventHandler,
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  memo,
} from "react";
import { ListItem } from "./types";

import styles from "./ItemList.module.scss";

interface ItemListProps extends HTMLAttributes<HTMLUListElement> {
  items: ListItem[];
  handleItemClick?: any;
  handleKeyDown?: any;
}

const ItemList: FC<ItemListProps> = memo(
  ({ items, handleItemClick, handleKeyDown }) => {
    // eslint-disable-next-line no-console
    console.log("ItemList render");
    return (
      <ul className={styles.list}>
        {items?.map((item) => (
          <div
            tabIndex={0}
            key={item.name}
            onClick={handleItemClick(item.name)}
            onKeyDown={handleKeyDown}
            role="button"
            className={styles.item}
          >
            {item?.emoji && (
              <div className={styles.emojiWrapper}>{item.emoji}</div>
            )}
            {item.name}
          </div>
        ))}
      </ul>
    );
  }
);

export default ItemList;

import React, {
    FC,
    HTMLAttributes,
    memo, useCallback,
} from "react";
import {ListItem} from "./types.ts";

import styles from "./ItemList.module.scss";

interface ItemListProps extends HTMLAttributes<HTMLUListElement> {
    items: ListItem[],
    fakeFocusedItem: ListItem | undefined,
    selectedItem: ListItem | undefined,
    handleItemClick: (item: ListItem["name"]) => void,
    controlsId: string,
    entityType: string,
}

const ItemList: FC<ItemListProps> = memo(
    ({
         items,
         handleItemClick,
         controlsId,
         entityType,
         fakeFocusedItem,
         selectedItem,
     }) => {
        return (
            <ul
                className={styles.list}
                id={controlsId}
                aria-label={entityType}
                role="listbox"
            >
                {items?.map((item) => (
                    <Item
                        id={controlsId + ":" + item.name}
                        key={item.name}
                        item={item}
                        handleItemClick={handleItemClick}
                        isSelected={selectedItem === item}
                    />
                ))}
            </ul>
        );
    }
);


interface ItemProps {
    id: string,
    isSelected: boolean,
    item: ListItem,
    handleItemClick: (item: ListItem["name"]) => void,
}

const Item: FC<ItemProps> = ({
                                 item,
                                 handleItemClick,
                                 id,
                                 isSelected,
                             }) => {
    const name = item.name;
    const onClick = useCallback(() => {
        handleItemClick(name)
    }, [name, handleItemClick]);
    return <li
        tabIndex={0}
        onClick={onClick}
        role="option"
        className={styles.item}
        aria-selected={isSelected}
        id={id}
    >
        {item?.emoji && (
            <div className={styles.emojiWrapper}>{item.emoji}</div>
        )}
        {item.name}
    </li>
}

export default ItemList;

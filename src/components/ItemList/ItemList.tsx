import React, {
    FC,
    HTMLAttributes,
    memo, useCallback,
} from "react";
import {ListItem} from "./types.ts";

import styles from "./ItemList.module.scss";
import cx from "classnames";

interface ItemListProps extends HTMLAttributes<HTMLUListElement> {
    items: ListItem[],
    focusedItem: ListItem | undefined,
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
         focusedItem,
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
                        isFocused={item === focusedItem}
                    />
                ))}
            </ul>
        );
    }
);


interface ItemProps {
    id: string,
    isSelected: boolean,
    isFocused: boolean,
    item: ListItem,
    handleItemClick: (item: ListItem["name"]) => void,
}

const Item: FC<ItemProps> = ({
                                 item,
                                 handleItemClick,
                                 id,
                                 isSelected,
                                 isFocused,
                             }) => {
    const name = item.name;
    const onClick = useCallback(() => {
        handleItemClick(name)
    }, [name, handleItemClick]);
    return <li
        onClick={onClick}
        role="option"
        className={
            cx(
                styles.item,
                isFocused && styles.focused
            )}
        aria-selected={isSelected}
        id={id}
    >
        {item?.emoji && (
            <div
                className={styles.emojiWrapper}
            >{item.emoji}</div>
        )}
        {item.name}
    </li>
}

export default ItemList;

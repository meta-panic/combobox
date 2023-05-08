import React, { useCallback } from "react";

import styles from "./ItemList.module.scss";
import cx from "classnames";
import { genericMemo } from "../../utils/genericMemo.ts";

interface ItemListProps<T> {
  items: T[];
  focusedItem: T | undefined;
  selectedItem: T | undefined;
  handleItemClick: (item: T) => void;
  controlsId: string;
  entityType: string;
  getItemId: (value: T) => string;
  ItemComponent: React.FC<T>;
}

const ItemListComponent = <T extends object>({
  items,
  handleItemClick,
  controlsId,
  entityType,
  focusedItem,
  selectedItem,
  getItemId,
  ItemComponent,
}: ItemListProps<T>) => {
  return (
    <ul
      className={styles.list}
      id={controlsId}
      aria-label={entityType}
      role="listbox"
    >
      {items?.map((item) => (
        <Item
          id={controlsId + ":" + getItemId(item)}
          key={getItemId(item)}
          item={item}
          handleItemClick={handleItemClick}
          isSelected={selectedItem === item}
          isFocused={item === focusedItem}
          ItemComponent={ItemComponent}
        />
      ))}
    </ul>
  );
};

interface ItemProps<T> {
  id: string;
  isSelected: boolean;
  isFocused: boolean;
  item: T;
  handleItemClick: (item: T) => void;
  ItemComponent: React.FC<T>;
}

const Item = <T extends object>({
  item,
  handleItemClick,
  id,
  isSelected,
  isFocused,
  ItemComponent,
}: ItemProps<T>) => {
  const onClick = useCallback(() => {
    handleItemClick(item);
  }, [item, handleItemClick]);
  return (
    <li
      role="option"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cx(styles.item, isFocused && styles.focused)}
      aria-selected={isSelected}
      id={id}
    >
      <ItemComponent {...item} />
    </li>
  );
};

export const ItemList = genericMemo(ItemListComponent);

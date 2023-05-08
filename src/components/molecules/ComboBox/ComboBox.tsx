import { ChangeEvent, HTMLAttributes, useState, useCallback } from "react";
import { default as SearchField } from "../../atoms/Input/Input";
import { ListItem } from "../../atoms/ItemList/types";
import ItemList from "../../atoms/ItemList/ItemList";

import cx from "classnames";
import styles from "./ComboBox.module.scss";

interface ComboBoxProps extends HTMLAttributes<HTMLDataListElement> {
  searchPlaceholder?: string;
  items: ListItem[];
}

const ComboBox = ({
  searchPlaceholder = "Start typing",
  items,
}: ComboBoxProps) => {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const closePopup = useCallback(
    () => setPopupVisibility(false),
    [setPopupVisibility]
  );
  const openPopup = useCallback(
    () => setPopupVisibility(true),
    [setPopupVisibility]
  );

  const [selectedItem, setItem] = useState<ListItem["name"]>();
  // eslint-disable-next-line no-console
  console.log("isPopupVisible - ", isPopupVisible);
  const handleItemClick = useCallback(
    (item: ListItem["name"]) => (e: React.SyntheticEvent) => {
      setItem(item);
      setPopupVisibility(false);
    },
    []
  );

  const handleKeyDown = useCallback((e: React.SyntheticEvent) => {}, []);

  return (
    <div
      className={cx(styles.comboBoxWrapper, {
        [styles.active]: isPopupVisible,
      })}
    >
      <SearchField
        placeholder={searchPlaceholder}
        onFocus={openPopup}
        text={selectedItem}
      />
      {isPopupVisible && (
        <ItemList
          items={items}
          handleItemClick={handleItemClick}
          handleKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default ComboBox;

import React, { useState, useCallback, useMemo, useRef } from "react";

import cx from "classnames";
import styles from "./ComboBox.module.scss";
import { generateId } from "../../utils/generateId.ts";
import { SearchField } from "../SearchField/SearchField.tsx";
import { ItemList } from "../ItemList/ItemList.tsx";

export interface ComboBoxProps<T> {
  searchPlaceholder: string;
  items: T[];
  selectedItem: T | undefined;
  onChange: (value: T | undefined) => void;
  getItemTitle: (value: T) => string;
  getItemId: (value: T) => string;
  entityType: string;
  ItemComponent: React.FC<T>;
}

const ComboBox = <T extends object>({
  searchPlaceholder = "Start typing",
  items,
  entityType,
  selectedItem,
  getItemTitle,
  getItemId,
  onChange,
  ItemComponent,
}: ComboBoxProps<T>) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const closePopup = useCallback(
    () => setIsPopupVisible(false),
    [setIsPopupVisible]
  );
  const openPopup = useCallback(
    () => setIsPopupVisible(true),
    [setIsPopupVisible]
  );
  const onFocus = useCallback(() => {
    openPopup();
  }, [openPopup]);

  const controlsId = useMemo(() => {
    return generateId();
  }, []);

  const [value, setValue] = useState("");

  const handleItemClick = useCallback(
    (item: T) => {
      setValue(getItemTitle(item));
      setIsPopupVisible(false);
      setTimeout(() => {
        inputRef.current?.focus();
        closePopup();
      });
    },
    [isPopupVisible, closePopup, getItemTitle]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const [focusedItemIndex, setFocusedItemIndex] = useState(0);

  const filteredItems = useMemo(() => {
    if (value === "") {
      return items;
    }
    return items.filter((item) => getItemTitle(item).includes(value));
  }, [items, value]);

  const focusPrevious = useCallback(() => {
    openPopup();
    setFocusedItemIndex(
      (prev) =>
        (filteredItems.length + (prev || 0) - 1) % filteredItems.length || 0
    );
  }, [filteredItems, openPopup]);
  const focusNext = useCallback(() => {
    openPopup();
    setFocusedItemIndex(
      (prev) =>
        (filteredItems.length + (prev || 0) + 1) % filteredItems.length || 0
    );
  }, [filteredItems, openPopup]);

  const onSelectOption = useCallback(() => {
    if (!isPopupVisible) {
      return;
    }
    if (focusedItemIndex === undefined) {
      return;
    }
    const item = filteredItems[focusedItemIndex];
    onChange(item);
    setValue(item ? getItemTitle(item) : "");
    closePopup();
  }, [isPopupVisible, onChange, filteredItems, focusedItemIndex, closePopup]);

  const onClear = useCallback(() => {
    onChange(undefined);
    setValue("");
    closePopup();
  }, [onChange, closePopup]);

  const onBlur = useCallback(() => {
    closePopup();
  }, [closePopup]);

  const changeValue = useCallback(
    (v: string) => {
      setFocusedItemIndex(0);
      setValue(v);
      openPopup();
    },
    [openPopup]
  );

  const focusedItem =
    focusedItemIndex !== undefined
      ? filteredItems[focusedItemIndex]
      : undefined;

  return (
    <div
      className={cx(styles.comboBoxWrapper, isPopupVisible && styles.active)}
    >
      <div
        className={cx(
          styles.comboBoxContent,
          !isPopupVisible && styles.collapsed,
          isPopupVisible && styles.expanded
        )}
      >
        <SearchField
          placeholder={searchPlaceholder}
          onFocus={onFocus}
          text={value}
          onSelectPreviousOption={focusPrevious}
          onSelectNextOption={focusNext}
          onSelectOption={onSelectOption}
          onClear={onClear}
          onBlur={onBlur}
          focusedItem={focusedItem}
          onChange={changeValue}
          isExpanded={isPopupVisible}
          controlsId={controlsId}
          inputRef={inputRef}
          getItemId={getItemId}
        />
        <ItemList
          items={filteredItems}
          handleItemClick={handleItemClick}
          controlsId={controlsId}
          entityType={entityType}
          selectedItem={selectedItem}
          focusedItem={focusedItem}
          getItemId={getItemId}
          ItemComponent={ItemComponent}
        />
      </div>
    </div>
  );
};

export default ComboBox;

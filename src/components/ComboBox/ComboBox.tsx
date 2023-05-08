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
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const closePopup = useCallback(
    () => setPopupVisibility(false),
    [setPopupVisibility]
  );
  const openPopup = useCallback(
    () => setPopupVisibility(true),
    [setPopupVisibility]
  );

  const controlsId = generateId();

  const [value, setValue] = useState("");

  const handleItemClick = useCallback(
    (item: T) => {
      setValue(getItemTitle(item));
      setPopupVisibility(false);
      setTimeout(() => {
        inputRef.current?.focus();
        closePopup();
      });
    },
    [closePopup, getItemTitle]
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
      (prev) => (filteredItems.length + prev - 1) % filteredItems.length || 0
    );
  }, [filteredItems, openPopup]);
  const focusNext = useCallback(() => {
    openPopup();
    setFocusedItemIndex(
      (prev) => (filteredItems.length + prev + 1) % filteredItems.length || 0
    );
  }, [filteredItems, openPopup]);
  const onSelectOption = useCallback(() => {
    const item = filteredItems[focusedItemIndex];
    onChange(item);
    setValue(item ? getItemTitle(item) : "");
    closePopup();
  }, [onChange, filteredItems, focusedItemIndex, closePopup]);

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

  return (
    <div
      className={cx(styles.comboBoxWrapper, isPopupVisible && styles.active)}
    >
      <div className={cx(styles.comboBoxContent, isPopupVisible && styles.contentActive)}>
        <SearchField
          placeholder={searchPlaceholder}
          onFocus={openPopup}
          text={value}
          onSelectPreviousOption={focusPrevious}
          onSelectNextOption={focusNext}
          onSelectOption={onSelectOption}
          onClear={onClear}
          onBlur={onBlur}
          selectedItem={selectedItem}
          onChange={changeValue}
          isExpanded={isPopupVisible}
          controlsId={controlsId}
          inputRef={inputRef}
          getItemId={getItemId}
        />
        {isPopupVisible && (
          <ItemList
            items={filteredItems}
            handleItemClick={handleItemClick}
            controlsId={controlsId}
            entityType={entityType}
            selectedItem={selectedItem}
            focusedItem={filteredItems[focusedItemIndex]}
            getItemId={getItemId}
            ItemComponent={ItemComponent}
          />
        )}
      </div>
    </div>
  );
};

export default ComboBox;

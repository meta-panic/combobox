import React, { Ref, useCallback } from "react";

import ChevronIcon from "../../assets/icons/Chevron.tsx";

import styles from "./SearchField.module.scss";
import cx from "classnames";
import { genericMemo } from "../../utils/genericMemo.ts";

interface SearchFieldProps<T> {
  placeholder: string;
  text: string;
  isExpanded: boolean;
  controlsId: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onSelectPreviousOption: () => void;
  onSelectNextOption: () => void;
  onSelectOption: () => void;
  onClear: () => void;
  onBlur: () => void;
  selectedItem: T | undefined;
  getItemId: (item: T) => string;
  inputRef: Ref<HTMLInputElement>;
}

const SearchFieldComponent = <T extends object>({
  placeholder,
  text,
  onChange,
  onSelectPreviousOption,
  onSelectNextOption,
  onSelectOption,
  onFocus,
  onClear,
  onBlur,
  isExpanded,
  controlsId,
  selectedItem,
  getItemId,
  inputRef,
}: SearchFieldProps<T>) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        onSelectPreviousOption();
      } else if (e.key === "ArrowDown") {
        onSelectNextOption();
      } else if (e.key === "Enter") {
        onSelectOption();
      } else if (e.key === "Escape") {
        onClear();
      }
    },
    [onSelectPreviousOption, onSelectNextOption, onSelectOption, onClear]
  );
  return (
    <div className={styles.inputFieldWrapper}>
      <input
        ref={inputRef}
        className={cx(
          styles.inputField,
          isExpanded && styles.inputFieldOpened,
          !isExpanded && styles.inputFieldClosed
        )}
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        role="combobox"
        aria-expanded={isExpanded}
        aria-controls={controlsId}
        aria-autocomplete={"list"}
        aria-activedescendant={
          selectedItem ? controlsId + ":" + getItemId(selectedItem) : ""
        }
      />
      <ChevronIcon className={styles.chevronIcon} />
    </div>
  );
};

export const SearchField = genericMemo(SearchFieldComponent);

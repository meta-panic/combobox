import React, {
    FC,
    useEffect,
    useState,
    memo, useCallback,
} from "react";

import ChevronIcon from "../../assets/icons/Chevron.tsx";

import styles from "./SearchField.module.scss";
import {ListItem} from "../ItemList/types.ts";

interface SearchFieldProps {
    placeholder: string,
    text: string,
    isExpanded: boolean,
    controlsId: string,
    onChange: (value: string) => void,
    onFocus: () => void,
    onSelectPreviousOption: () => void,
    onSelectNextOption: () => void,
    onSelectOption: () => void,
    selectedItem: ListItem | undefined,
}

const SearchField: FC<SearchFieldProps> = memo(
    ({
         placeholder,
         text,
         onChange,
         onSelectPreviousOption,
         onSelectNextOption,
         onSelectOption,
         onFocus,
         isExpanded,
         controlsId,
         selectedItem,
     }) => {

        const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        }, [onChange]);
        const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "ArrowUp") {
                onSelectPreviousOption();
            } else if (e.key === "ArrowDown") {
                onSelectNextOption();
            } else if (e.key === "Enter") {
                onSelectOption();
            }
        }, [
            onSelectPreviousOption,
            onSelectNextOption,
            onSelectOption,
        ]);
        return (
            <div className={styles.inputFieldWrapper}>
                <input
                    className={styles.inputField}
                    type="text"
                    value={text}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={onFocus}
                    role="combobox"
                    aria-expanded={isExpanded}
                    aria-controls={controlsId}
                    aria-autocomplete={"list"}
                    aria-activedescendant={selectedItem ? (controlsId + ":" + selectedItem.name) : ""}
                />
                <ChevronIcon className={styles.chevronIcon}/>
            </div>
        );
    }
);

export default SearchField;

import React, {
    FC,
    useEffect,
    useState,
    memo, useCallback,
} from "react";

import ChevronIcon from "../../assets/icons/Chevron.tsx";

import styles from "./SearchField.module.scss";

interface SearchFieldProps {
    placeholder: string,
    text: string,
    isExpanded: boolean,
    controlsId: string,
    onChange: (value: string) => void,
    onFocus: () => void,
    onBlur: () => void,
}

const SearchField: FC<SearchFieldProps> = memo(
    ({
         placeholder,
         text,
         onChange,
         onBlur,
         onFocus,
         isExpanded,
         controlsId,
     }) => {

        const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        }, [onChange]);
        const focusedLiElementId = "option-1"; //FOCUSED element id not selected one use empty string if nothing in list is focused
        return (
            <div className={styles.inputFieldWrapper}>
                <input
                    className={styles.inputField}
                    type="text"
                    value={text}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    role="combobox"
                    aria-expanded={isExpanded}
                    aria-controls={controlsId}
                    aria-autocomplete={"list"}
                    aria-activedescendant={focusedLiElementId}
                />
                <ChevronIcon className={styles.chevronIcon}/>
            </div>
        );
    }
);

export default SearchField;

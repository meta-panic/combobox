import React, {
    ChangeEventHandler,
    FC,
    FocusEventHandler,
    InputHTMLAttributes,
    useEffect,
    useState,
    memo,
} from "react";

import ChevronIcon from "../../assets/icons/Chevron.tsx";

import styles from "./Input.module.scss";

interface SearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    text?: string;
    isExpanded: boolean,
    controlsId: string,
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
}

const SearchField: FC<SearchFieldProps> = memo(
    ({
         placeholder = undefined,
         text = undefined,
         onChange,
         onBlur,
         onFocus,
         isExpanded,
         controlsId,
     }) => {
        const [value, setValue] = useState<string | undefined>();

        useEffect(() => {
            if (text) {
                setValue(text);
            }
        }, [text]);
        return (
            <div className={styles.inputFieldWrapper}>
                <input
                    className={styles.inputField}
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    role="combobox"
                    aria-expanded={isExpanded}
                    aria-controls={controlsId}
                />
                <ChevronIcon className={styles.chevronIcon}/>
            </div>
        );
    }
);

export default SearchField;

import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  InputHTMLAttributes,
  useEffect,
  useState,
  memo,
} from "react";

import ChevronIcon from "../../../assets/icons/Chevron";

import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  text?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = memo(
  ({
    placeholder = undefined,
    text = undefined,
    onChange,
    onBlur,
    onFocus,
  }) => {
    const [value, setValue] = useState<string | undefined>();

    // eslint-disable-next-line no-console
    console.log("selectedItem - ", text);
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
        />
        <ChevronIcon className={styles.chevronIcon} />
      </div>
    );
  }
);

export default Input;

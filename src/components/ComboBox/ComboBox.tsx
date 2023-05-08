import {HTMLAttributes, useState, useCallback, useId} from "react";
import SearchField from "../SearchField/SearchField.tsx";
import {ListItem} from "../ItemList/types.ts";
import ItemList from "../ItemList/ItemList.tsx";

import cx from "classnames";
import styles from "./ComboBox.module.scss";

interface ComboBoxProps extends HTMLAttributes<HTMLDataListElement> {
    searchPlaceholder?: string,
    items: ListItem[],
    entityType: string,
}

const ComboBox = ({
                      searchPlaceholder = "Start typing",
                      items,
                      entityType,
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


    const handleItemClick = useCallback(
        (item: ListItem["name"]) => (e: React.SyntheticEvent) => {
            setItem(item);
            setPopupVisibility(false);
        },
        []
    );

    const handleKeyDown = useCallback((e: React.SyntheticEvent) => {
    }, []);

    const controlsId = useId();

    const [value, setValue] = useState("");

    return (
        <div
            className={cx(styles.comboBoxWrapper, {
                [styles.active]: isPopupVisible,
            })}
        >
            <SearchField
                placeholder={searchPlaceholder}
                onFocus={openPopup}
                text={value}
                onBlur={() => {
                }}
                onChange={setValue}
                isExpanded={isPopupVisible}
                controlsId={controlsId}
            />
            {isPopupVisible && (
                <ItemList
                    items={items}
                    handleItemClick={handleItemClick}
                    handleKeyDown={handleKeyDown}
                    controlsId={controlsId}
                    entityType={entityType}
                />
            )}
        </div>
    );
};

export default ComboBox;

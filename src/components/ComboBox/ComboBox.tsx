import {HTMLAttributes, useState, useCallback, useId, useMemo} from "react";
import SearchField from "../SearchField/SearchField.tsx";
import {ListItem} from "../ItemList/types.ts";
import ItemList from "../ItemList/ItemList.tsx";

import cx from "classnames";
import styles from "./ComboBox.module.scss";

interface ComboBoxProps {
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

    const handleItemClick = useCallback(
        (item: ListItem["name"]) => {
            closePopup();
            setPopupVisibility(false);
        },
        [closePopup]
    );

    const controlsId = useId();

    const [selectedItem, setSelectedItem] = useState<
        ListItem | undefined
    >(undefined);
    const [value, setValue] = useState("");

    const filteredItems = useMemo(() => {
        if (value === "") {
            return items;
        }
        return items.filter(item => item.name.includes(value));
    }, [items, value]);

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
                    items={filteredItems}
                    handleItemClick={handleItemClick}
                    controlsId={controlsId}
                    entityType={entityType}
                    selectedItem={selectedItem}
                    fakeFocusedItem={undefined}
                />
            )}
        </div>
    );
};

export default ComboBox;

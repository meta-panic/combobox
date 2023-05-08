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
    const [
        focusedItemIndex,
        setFocusedItemIndex
    ] = useState(0);

    const [value, setValue] = useState("");

    const filteredItems = useMemo(() => {
        if (value === "") {
            return items;
        }
        return items.filter(item => item.name.includes(value));
    }, [items, value]);

    const focusPrevious = useCallback(() => {
        openPopup();
        setFocusedItemIndex(prev =>
            (filteredItems.length + prev - 1) % filteredItems.length || 0
        )
    }, [filteredItems, openPopup]);
    const focusNext = useCallback(() => {
        openPopup();
        setFocusedItemIndex(prev =>
            (filteredItems.length + prev + 1) % filteredItems.length || 0
        )
    }, [filteredItems, openPopup]);
    const onSelectOption = useCallback(() => {
        const item = filteredItems[focusedItemIndex];
        setSelectedItem(item);
        setValue(item?.name || "");
        closePopup();
    }, [filteredItems, focusedItemIndex, closePopup]);

    const onClear = useCallback(() => {
        setSelectedItem(undefined);
        setValue("");
        closePopup();
    }, []);

    const changeValue = useCallback((v: string) => {
        setFocusedItemIndex(0);
        setValue(v);
        openPopup();
    }, [openPopup]);

    return (
        <div
            className={cx(
                styles.comboBoxWrapper,
                isPopupVisible && styles.active
            )}
        >
            <SearchField
                placeholder={searchPlaceholder}
                onFocus={openPopup}
                text={value}
                onSelectPreviousOption={focusPrevious}
                onSelectNextOption={focusNext}
                onSelectOption={onSelectOption}
                onClear={onClear}
                selectedItem={selectedItem}
                onChange={changeValue}
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
                    focusedItem={filteredItems[focusedItemIndex]}
                />
            )}
        </div>
    );
};

export default ComboBox;

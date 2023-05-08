import {HTMLAttributes, useState, useCallback, useId, useMemo, useEffect} from "react";
import SearchField from "../SearchField/SearchField.tsx";
import {ListItem} from "../ItemList/types.ts";
import ItemList from "../ItemList/ItemList.tsx";

import cx from "classnames";
import styles from "./ComboBox.module.scss";
import {generateId} from "../../utils/generateId.ts";

interface ComboBoxProps {
    searchPlaceholder: string,
    items: ListItem[],
    selectedItem: ListItem | undefined,
    onChange: (value: ListItem | undefined) => void,
    entityType: string,
}

const ComboBox = ({
                      searchPlaceholder = "Start typing",
                      items,
                      entityType,
                      selectedItem,
                      onChange,
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

    const controlsId = generateId();
    console.log("controlsId: " + controlsId);
    const [value, setValue] = useState("");

    const handleItemClick = useCallback(
        (item: ListItem["name"]) => {
            closePopup();
            setValue(item);
            setPopupVisibility(false);
        },
        [closePopup]
    );

    const [
        focusedItemIndex,
        setFocusedItemIndex
    ] = useState(0);

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
        onChange(item);
        setValue(item?.name || "");
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
                onBlur={onBlur}
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

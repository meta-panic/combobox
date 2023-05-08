import ComboBox from "../../components/ComboBox/ComboBox.tsx";
import {FRUIT_LIST} from "./consts.ts";
import React, {useState} from "react";
import {Fruit} from "./types.ts";
import styles from "../../components/ItemList/ItemList.module.scss";

const FruitComponent = ({name, emoji}: Fruit) => {
    return <>
        {emoji && (
            <div
                className={styles.emojiWrapper}
            >{emoji}</div>
        )}
        {name}
    </>
}

const DemoPage = () => {
    const [selectedItem, setSelectedItem] = useState<Fruit | undefined>(undefined);
    return <ComboBox
        searchPlaceholder="Choose a Fruit:"
        items={FRUIT_LIST}
        selectedItem={selectedItem}
        onChange={setSelectedItem}
        entityType={"Fruits"}
        getItemId={f => f.name}
        getItemTitle={f => f.name}
        ItemComponent={FruitComponent}
    />
};

export default DemoPage;

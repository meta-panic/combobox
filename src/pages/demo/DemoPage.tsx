import ComboBox from "../../components/ComboBox/ComboBox.tsx";
import {FRUIT_LIST} from "./consts.ts";
import {useState} from "react";
import {ListItem} from "../../components/ItemList/types.ts";

const DemoPage = () => {
    const [selectedItem, setSelectedItem] = useState<ListItem | undefined>(undefined);
    return <ComboBox
        searchPlaceholder="Choose a Fruit:"
        items={FRUIT_LIST}
        selectedItem={selectedItem}
        onChange={setSelectedItem}
        entityType={"Fruits"}
    />
};

export default DemoPage;

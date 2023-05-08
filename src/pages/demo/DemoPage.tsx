import ComboBox from "../../components/ComboBox/ComboBox.tsx";
import {FRUIT_LIST} from "./consts.ts";

const DemoPage = () => {
    return (
        <>
            <ComboBox
                searchPlaceholder="Choose a Fruit:"
                items={FRUIT_LIST}
                entityType={"Fruits"}
            />
        </>
    );
};

export default DemoPage;

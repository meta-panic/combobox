import ComboBox from "../../components/ComboBox/ComboBox.tsx";
import { FRUIT_LIST } from "./consts.ts";
import React, { useState } from "react";
import { Fruit } from "./types.ts";
import { FruitComponent } from "../../components/FruitComponent/FruitComponent.tsx";

const DemoPage = () => {
  const [selectedFruit, setSelectedFruit] = useState<Fruit | undefined>(
    undefined
  );
  return (
    <>
      <ComboBox
        searchPlaceholder="Choose a Fruit:"
        items={FRUIT_LIST}
        selectedItem={selectedFruit}
        onChange={setSelectedFruit}
        entityType={"Fruits"}
        getItemId={(f) => f.name}
        getItemTitle={(f) => f.name}
        ItemComponent={FruitComponent}
      />
    </>
  );
};

export default DemoPage;

import ComboBox from "../../components/ComboBox/ComboBox.tsx";
import { FRUIT_LIST } from "./consts.ts";
import React, { useState } from "react";
import { Fruit } from "./types.ts";
import styles from "../../components/ItemList/ItemList.module.scss";
import { FruitComponent } from "./FruitComponent.tsx";
import { N, NumberComponent } from "./NumberComponent.tsx";

const MultipleDemoPage = () => {
  const [selectedFruit, setSelectedFruit] = useState<Fruit | undefined>(
    undefined
  );

  const [selectedNumber, setSelectedNumber] = useState<N | undefined>(undefined);

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
      <ComboBox
        searchPlaceholder="Choose a number:"
        items={[...Array(128)].map((_, idx) => ({ value: idx }))}
        selectedItem={selectedNumber}
        onChange={setSelectedNumber}
        entityType={"Numbers"}
        getItemId={(f) => `${f.value}`}
        getItemTitle={(f) => `${f.value}`}
        ItemComponent={NumberComponent}
      />
    </>
  );
};

export default MultipleDemoPage;

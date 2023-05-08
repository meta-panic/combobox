import ComboBox from "../../components/ComboBox/ComboBox.tsx";
import { FRUIT_LIST } from "./consts.ts";
import React, { useState } from "react";
import { Fruit } from "./types.ts";
import { CustomFruitComponent } from "../../components/CustomFruitComponent/CustomFruitComponent.tsx";
import { N, NumberComponent } from "./NumberComponent.tsx";
import Demo from "../../components/Demo/Demo.tsx";
import { FruitComponent } from "../../components/FruitComponent/FruitComponent.tsx";

const MultipleDemoPage = () => {
  const [selectedFruit1, setSelectedFruit1] = useState<Fruit | undefined>(
    undefined
  );

  const [selectedNumber, setSelectedNumber] = useState<N | undefined>(
    undefined
  );

  const [selectedFruit2, setSelectedFruit2] = useState<Fruit | undefined>(
    undefined
  );

  return (
    <>
      <Demo title={"Basic case from task"}>
        <ComboBox
          searchPlaceholder="Choose a Fruit:"
          items={FRUIT_LIST}
          selectedItem={selectedFruit1}
          onChange={setSelectedFruit1}
          entityType={"Fruits"}
          getItemId={(f) => f.name}
          getItemTitle={(f) => f.name}
          ItemComponent={FruitComponent}
        />
      </Demo>

      <Demo title={"Dropdown has scrollbar if there are too many items"}>
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
      </Demo>

      <Demo title={"ComboBox can render content using custom component"}>
        <ComboBox
          searchPlaceholder="Choose a custom fruit:"
          items={FRUIT_LIST}
          selectedItem={selectedFruit2}
          onChange={setSelectedFruit2}
          entityType={"Fruits"}
          getItemId={(f) => f.name}
          getItemTitle={(f) => f.name}
          ItemComponent={CustomFruitComponent}
        />
      </Demo>
    </>
  );
};

export default MultipleDemoPage;

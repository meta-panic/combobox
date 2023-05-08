import ComboBox from "../../molecules/ComboBox/ComboBox";
import { FRUIT_LIST } from "./consts";

const DemoPage = () => {
  return (
    <>
      <ComboBox searchPlaceholder="Choose a Fruit:" items={FRUIT_LIST} />
    </>
  );
};

export default DemoPage;

import MiniBtn from "../Button/MiniBtn";
import FlexView from "../FlexView";

const PickupRadio = () => {
  return (
    <FlexView direction="row" gapHorizental={8}>
      <MiniBtn isSelected={true} content={"직접 수거"} />
      <MiniBtn isSelected={false} content={"수거 요청"} />
    </FlexView>
  );
};

export default PickupRadio;

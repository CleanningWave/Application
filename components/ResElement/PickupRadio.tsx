import MiniBtn from "../Button/MiniBtn";
import FlexView from "../FlexView";
import { CategoriesType, ReportType } from "@/types/ReportDto";

interface PickupRadioProps {
  reportType: ReportType;
  setResultOption: (
    type: "categories" | "reportType",
    target: CategoriesType | ReportType
  ) => void;
}

const PickupRadio = ({ reportType, setResultOption }: PickupRadioProps) => {
  return (
    <FlexView direction="row" gapHorizental={8}>
      <MiniBtn<ReportType>
        isSelected={reportType === "SELF_COLLECTION"}
        content={"직접 수거"}
        handler={() => setResultOption("reportType", "SELF_COLLECTION")}
      />
      <MiniBtn<ReportType>
        isSelected={reportType === "REQUEST_COLLECTION"}
        content={"수거 요청"}
        handler={() => setResultOption("reportType", "REQUEST_COLLECTION")}
      />
    </FlexView>
  );
};

export default PickupRadio;

import styled from "styled-components/native";
import { SUBMIT_ORDER } from "@/constants/Result";
import FlexView from "../FlexView";
import DefaultBtn from "../Button/DefaultBtn";
import { Colors } from "@/constants/Colors";

// type

interface SubmitDefaultTypes {
  handler: () => void;
}

interface SubmitAlertProps extends SubmitDefaultTypes {
  step: (typeof SUBMIT_ORDER)[number];
}

// 제출 관련 Alert 전체 틀

const SubmitAlert = ({ step, handler }: SubmitAlertProps) => {
  switch (step) {
    case "SUBMIT":
      return <SubmitChildren handler={handler} />;
    case "ADDED":
      return <AddReportChildren handler={handler} />;
    default:
      return null;
  }
};

export default SubmitAlert;

// 보고 제출 확인 모달

interface SubmitChildrenProps extends SubmitDefaultTypes {}

const SubmitChildren = ({ handler }: SubmitChildrenProps) => {
  return (
    <FlexView direction="column" gapVertical={30}>
      <Guide>보고가 정상적으로 제출되었습니다.</Guide>
      <DefaultBtn width={268} fontSize={24} contents="확인" handler={handler} />
    </FlexView>
  );
};

// 추가 보고 모달

interface AddReportChildrenProps extends SubmitDefaultTypes {}

const AddReportChildren = ({ handler }: AddReportChildrenProps) => {
  return (
    <FlexView direction="column" gapVertical={30}>
      <FlexView direction="column" gapVertical={8}>
        <Guide>추가로 보고할 내용이 있습니까?</Guide>
        <Explain>추가 제출 선택 시 카메라 화면으로 이동합니다.</Explain>
      </FlexView>
      <DefaultBtn width={268} fontSize={24} contents="확인" handler={handler} />
    </FlexView>
  );
};

// styled

const Guide = styled.Text`
  font-size: 36px;
  font-family: "Inter-ExtraBold";
  text-align: center;
`;

const Explain = styled.Text`
  font-size: 24px;
  text-align: center;
  color: ${Colors.neutral.dark.dark_3};
`;

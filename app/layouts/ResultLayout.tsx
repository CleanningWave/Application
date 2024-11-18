import BottomSheet, { buttonHandlerObj } from "@/components/BottomSheet";
import DefaultBtn from "@/components/Button/DefaultBtn";
import FlexView from "@/components/FlexView";
import Header from "@/components/Header";
import { Container } from "@/components/LayoutContainer";
import ResElement from "@/components/ResElement";
import CollectInput from "@/components/ResElement/CollectInput";
import OnlyText from "@/components/ResElement/OnlyText";
import PickupRadio from "@/components/ResElement/PickupRadio";
import TrashSelectButton from "@/components/ResElement/TrashSelect/TrashSelect";
import TrashSelectChildren from "@/components/ResElement/TrashSelect/TrashSelectChildren";
import AlertFrame from "@/components/ResModal/AlertFrame";
import SubmitAlert from "@/components/ResModal/SubmitAlert";
import { SUBMIT_ORDER } from "@/constants/Result";
import { useState } from "react";
import { ScrollView, Dimensions } from "react-native";
import styled from "styled-components/native";

const ResultLayout = () => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [submitStep, setSubmitStep] = useState<number>(0);

  const openSelect = () => setIsSelectOpen(true);

  const closeSelect = () => setIsSelectOpen(false);

  const nextSubmitStep = () =>
    setSubmitStep((prev) => (prev + 1) % SUBMIT_ORDER.length);

  const buttonHandler: Array<buttonHandlerObj> = [
    {
      title: "재선택 닫기",
      isPrimary: false,
      handler: closeSelect,
    },
    {
      title: "재선택 하기",
      isPrimary: true,
      handler: () => {
        closeSelect();
      },
    },
  ];

  return (
    <Container>
      <Header title={"AI 분석 결과"} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ResImage src="https://www.humanesociety.org/sites/default/files/styles/768x326/public/2023-05/cat-grass-116668.jpg?h=464bc339&itok=U6H-jUuu" />
        <ResElementContainer>
          <FlexView gapVertical={36}>
            <ResElement title={"쓰레기 분류"}>
              <TrashSelectButton handler={openSelect} />
            </ResElement>
            <ResElement title={"직접 수거 여부"}>
              <PickupRadio />
            </ResElement>
            <ResElement title={"수거 자루 개수"}>
              <CollectInput />
            </ResElement>
            <ResElement title={"담당 지자체"}>
              <OnlyText content={`제주시 해양수산과\n(Tel. 000-000-0000)`} />
            </ResElement>
            <DefaultBtn contents="보고하기" handler={nextSubmitStep} />
          </FlexView>
        </ResElementContainer>
      </ScrollView>

      {/* 부가 요소 - 바텀 시트 */}
      <BottomSheet isVisible={isSelectOpen} buttonHandler={buttonHandler}>
        <TrashSelectChildren selected={["GLASS"]} />
      </BottomSheet>

      {/* 부가 요소 - 모달 */}
      <AlertFrame
        isVisible={
          SUBMIT_ORDER[submitStep] === "SUBMIT" ||
          SUBMIT_ORDER[submitStep] === "ADDED"
        }
        closeModalHandler={nextSubmitStep}
      >
        <SubmitAlert step={SUBMIT_ORDER[submitStep]} handler={nextSubmitStep} />
      </AlertFrame>
    </Container>
  );
};

export default ResultLayout;

const ResImage = styled.Image`
  width: 100%;
  height: 340px;
`;

const ResElementContainer = styled.View`
  padding: 24px;
`;

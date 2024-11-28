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
import { SUBMIT_ORDER, TRASH_TYPES } from "@/constants/Result";
import {
  CategoriesType,
  CreateReportDto,
  WasteQuantityDto,
} from "@/types/ReportDto";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import styled from "styled-components/native";

export interface ReportReq
  extends Pick<CreateReportDto, "categories" | "quantities" | "reportType"> {}

const ResultLayout = () => {
  const { uri } = useLocalSearchParams();
  const decoded = decodeURIComponent(uri as string);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [submitStep, setSubmitStep] = useState<number>(0);
  const [selected, setSelected] = useState<CategoriesType>([]);
  const [result, setResult] = useState<ReportReq>({
    categories: [],
    quantities: [],
    reportType: "",
  });

  const openSelect = () => setIsSelectOpen(true);

  const closeSelect = () => setIsSelectOpen(false);

  const setResultOption = (
    target: CategoriesType | string | Array<WasteQuantityDto>
  ) => {
    if (!Array.isArray(target)) {
      setResult((prev) => {
        return { ...prev, reportType: target };
      });
    } else if (
      target.every(
        (item) =>
          typeof item === "object" && "quantity" in item && "volume" in item
      )
    ) {
      setResult((prev) => {
        return { ...prev, quantities: target };
      });
    } else {
      setResult((prev) => {
        return { ...prev, categories: target };
      });
    }
  };

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
        setResultOption(selected);
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
        <ResImage source={{ uri: decoded }} />
        <ResElementContainer>
          <FlexView gapVertical={36}>
            <ResElement title={"쓰레기 분류"}>
              <TrashSelectButton result={result} handler={openSelect} />
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
        <TrashSelectChildren selected={selected} setSelected={setSelected} />
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
  width: ${Dimensions.get("window").width}px;
  height: 340px;

  background-color: aliceblue;
`;

const ResElementContainer = styled.View`
  flex: 1;

  width: 100%;
  padding: 24px;
`;

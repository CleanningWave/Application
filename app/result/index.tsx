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
import { MunicipalityDto } from "@/types/AreaDto";
import {
  CategoriesType,
  CreateReportDto,
  WasteQuantityDto,
} from "@/types/ReportDto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import styled from "styled-components/native";

export interface ReportReq
  extends Pick<CreateReportDto, "categories" | "quantities" | "reportType"> {}

const initialQuantites: WasteQuantityDto = { quantity: 0, volume: 0 };

const ResultLayout = () => {
  const { uri } = useLocalSearchParams();
  const decoded = decodeURIComponent(uri as string);

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [submitStep, setSubmitStep] = useState<number>(0);

  const [selected, setSelected] = useState<CategoriesType>([]);
  const [result, setResult] = useState<ReportReq>({
    categories: [],
    quantities: [initialQuantites],
    reportType: "",
  });

  const [area, setArea] = useState<Omit<MunicipalityDto, "id">>({
    name: "",
    tel: "",
  });

  const setAreaInfo = async () => {
    const areaInfo = (await AsyncStorage.getItem("area"))?.toString();
    if (areaInfo) {
      const [name, tel] = areaInfo.split(",");
      setArea({ name: name, tel: tel });
    }
  };

  const openSelect = () => setIsSelectOpen(true);

  const closeSelect = () => setIsSelectOpen(false);

  const setResultOption = (target: CategoriesType | string) =>
    setResult((prev) => {
      return Array.isArray(target)
        ? { ...prev, categories: target as CategoriesType }
        : { ...prev, reportType: target };
    });

  const modifyResultQuantites = (
    idx: number,
    type: keyof WasteQuantityDto,
    changed: string
  ) =>
    setResult((prev) => {
      const newQuantities = prev.quantities.map((quantity, index) =>
        index === idx ? { ...quantity, [type]: Number(changed) } : quantity
      );
      return { ...prev, quantities: newQuantities };
    });

  const addResultQuantities = () =>
    setResult((prev) => {
      return {
        ...prev,
        quantities: [...prev.quantities, { ...initialQuantites }],
      };
    });

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

  useEffect(() => {
    setAreaInfo();
  }, []);

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
              <TrashSelectButton
                categories={result.categories}
                handler={openSelect}
              />
            </ResElement>
            <ResElement title={"직접 수거 여부"}>
              <PickupRadio />
            </ResElement>
            <ResElement title={"수거 자루 개수"}>
              <CollectInput
                quantities={result.quantities}
                modifyResultQuantites={modifyResultQuantites}
                addResultQuantities={addResultQuantities}
              />
            </ResElement>
            <ResElement title={"담당 지자체"}>
              <OnlyText content={`${area?.name}\n(Tel. ${area?.tel})`} />
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

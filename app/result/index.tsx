import BottomSheet, { buttonHandlerObj } from "@/components/BottomSheet";
import DefaultBtn from "@/components/Button/DefaultBtn";
import FlexView from "@/components/FlexView";
import Header from "@/components/Header";
import { Container } from "@/components/LayoutContainer";
import * as ResElement from "@/components/ResElement";
import AlertFrame from "@/components/ResModal/AlertFrame";
import SubmitAlert from "@/components/ResModal/SubmitAlert";
import { API, API_PATH } from "@/constants/Path";
import { SUBMIT_ORDER } from "@/constants/Result";
import { MunicipalityDto } from "@/types/AreaDto";
import {
  CategoriesType,
  CreateReportDto,
  ReportType,
  WasteQuantityDto,
} from "@/types/ReportDto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import styled from "styled-components/native";
import baseInstance from "@/scripts/api/axios";

export interface ReportReq
  extends Pick<CreateReportDto, "categories" | "quantities" | "reportType"> {
  areaId: string;
  images: Array<{ id: string; path: string }>;
}

const initialQuantites: WasteQuantityDto = { quantity: 0, volume: 0 };

const ResultLayout = () => {
  const { imgId, imgUrl } = useLocalSearchParams();

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [submitStep, setSubmitStep] = useState<number>(0);

  const [selected, setSelected] = useState<CategoriesType>([]);
  const [result, setResult] = useState<ReportReq>({
    categories: [],
    quantities: [initialQuantites],
    reportType: "SELF_COLLECTION",
    areaId: "",
    images: [],
  });

  const [area, setArea] = useState<Omit<MunicipalityDto, "id">>({
    name: "",
    tel: "",
  });

  const nextSubmitStep = () =>
    setSubmitStep((prev) => (prev + 1) % SUBMIT_ORDER.length);

  const mutation = useMutation({
    mutationKey: ["reseultSend"],
    mutationFn: async () =>
      await baseInstance.post(API_PATH.POST_REPORTS, {
        ...result,
        collectedAt: new Date().toString(),
      }),
    onSuccess: nextSubmitStep,
    onError: (err) => {
      console.error(err);
    },
  });

  const setAreaInfo = async () => {
    const areaInfo = (await AsyncStorage.getItem("area"))?.toString();
    if (areaInfo) {
      const [name, tel, id] = areaInfo.split(",");
      setArea({ name: name, tel: tel });
      setResult((prev) => {
        return { ...prev, areaId: id };
      });
    }
  };

  const openSelect = () => setIsSelectOpen(true);

  const closeSelect = () => setIsSelectOpen(false);

  const setResultOption = (
    type: "categories" | "reportType",
    target: CategoriesType | ReportType
  ) =>
    setResult((prev) => {
      return { ...prev, [type]: target };
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
        setResultOption("categories", selected);
        closeSelect();
      },
    },
  ];

  useEffect(() => {
    if (typeof imgId === "string" && typeof imgUrl === "string") {
      setResult((prev) => {
        return { ...prev, images: [{ id: imgId, path: `${API}${imgUrl}` }] };
      });
      setAreaInfo();
    }
  }, [imgId, imgUrl]);

  return (
    <Container>
      <Header title={"AI 분석 결과"} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ResImage source={{ uri: `${API}${imgUrl}` }} />
        <ResElementContainer>
          <FlexView gapVertical={36}>
            <ResElement.Frame title={"쓰레기 분류"}>
              <ResElement.TrashSelectButton
                categories={result.categories}
                handler={openSelect}
              />
            </ResElement.Frame>
            <ResElement.Frame title={"직접 수거 여부"}>
              <ResElement.PickupRadio
                reportType={result.reportType}
                setResultOption={setResultOption}
              />
            </ResElement.Frame>
            <ResElement.Frame title={"수거 자루 개수"}>
              <ResElement.CollectInput
                quantities={result.quantities}
                modifyResultQuantites={modifyResultQuantites}
                addResultQuantities={addResultQuantities}
              />
            </ResElement.Frame>
            <ResElement.Frame title={"담당 지자체"}>
              <ResElement.OnlyText
                content={`${area?.name}\n(Tel. ${area?.tel})`}
              />
            </ResElement.Frame>
            <DefaultBtn contents="보고하기" handler={mutation.mutate} />
          </FlexView>
        </ResElementContainer>
      </ScrollView>

      {/* 부가 요소 - 바텀 시트 */}
      <BottomSheet isVisible={isSelectOpen} buttonHandler={buttonHandler}>
        <ResElement.TrashSelectChildren
          selected={selected}
          setSelected={setSelected}
        />
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

import BottomSheet, { buttonHandlerObj } from "@/components/BottomSheet";
import DefaultBtn from "@/components/Button/DefaultBtn";
import FlexView from "@/components/FlexView";
import Header from "@/components/Header";
import ResElement from "@/components/ResElement";
import CollectInput from "@/components/ResElement/CollectInput";
import OnlyText from "@/components/ResElement/OnlyText";
import PickupRadio from "@/components/ResElement/PickupRadio";
import TrashSelect from "@/components/ResElement/TrashSelect";
import {
  ScrollView,
  Text,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";

const ResultLayout = () => {
  const buttonHandler: Array<buttonHandlerObj> = [
    { title: "재선택 닫기", isPrimary: false, handler: () => {} },
    { title: "재선택 하기", isPrimary: true, handler: () => {} },
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
              <TrashSelect />
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
            <DefaultBtn contents="보고하기" handler={() => {}} />
          </FlexView>
        </ResElementContainer>
      </ScrollView>

      <BottomSheet buttonHandler={buttonHandler}>
        <Text>BottomSheet</Text>
      </BottomSheet>
    </Container>
  );
};

export default ResultLayout;

const Container = styled.View`
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  background-color: #ffffff;
  height: ${Dimensions.get("window").height}px;
`;

const ResImage = styled.Image`
  width: 100%;
  height: 340px;
`;

const ResElementContainer = styled.View`
  padding: 24px;
`;

import DefaultBtn from "@/components/Button/DefaultBtn";
import FlexView from "@/components/FlexView";
import Header from "@/components/Header";
import ResElement from "@/components/ResElement";
import CollectInput from "@/components/ResElement/CollectInput";
import OnlyText from "@/components/ResElement/OnlyText";
import SelectRadio from "@/components/ResElement/SelectRadio";
import {
  Text,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";

const ResultLayout = () => {
  return (
    <Container>
      <Header title={"AI 분석 결과"} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ResImage src="https://static01.nyt.com/images/2024/03/05/autossell/00TB-MEOWS/00TB-MEOWS-square640.jpg" />
        <ResElementContainer>
          <FlexView gapVertical={36}>
            <ResElement title={"쓰레기 분류"}>
              <Text>Component A</Text>
            </ResElement>
            <ResElement title={"직접 수거 여부"}>
              <SelectRadio />
            </ResElement>
            <ResElement title={"수거 자루 개수"}>
              <CollectInput />
            </ResElement>
            <ResElement title={"담당 지자체"}>
              <OnlyText content={`제주시 해양수산과\n(Tel. 000-000-0000)`} />
            </ResElement>
            <DefaultBtn>보고하기</DefaultBtn>
          </FlexView>
        </ResElementContainer>
      </ScrollView>
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

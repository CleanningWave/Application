import DefaultBtn from "@/components/Button/DefaultBtn";
import FlexView from "@/components/FlexView";
import Header from "@/components/Header";
import ResElement from "@/components/ResElement";
import OnlyText from "@/components/ResElement/OnlyText";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const ResultLayout = () => {
  return (
    <View>
      <Header title={"AI 분석 결과"} />
      <ResElementContainer>
        <FlexView gapVertical={36}>
          <ResElement title={"쓰레기 분류"}>
            <Text>Component A</Text>
          </ResElement>
          <ResElement title={"직접 수거 여부"}>
            <Text>Component B</Text>
          </ResElement>
          <ResElement title={"수거 자류 개수"}>
            <Text>Component C</Text>
          </ResElement>
          <ResElement title={"담당 지자체"}>
            <OnlyText content={`제주시 해양수산과\n(Tel. 000-000-0000)`} />
          </ResElement>
          <DefaultBtn>보고하기</DefaultBtn>
        </FlexView>
      </ResElementContainer>
    </View>
  );
};

export default ResultLayout;

const ResElementContainer = styled.View`
  padding: 24px;
`;

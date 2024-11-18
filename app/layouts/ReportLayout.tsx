import FlexView from "@/components/FlexView";
import Header from "@/components/Header";
import Progress from "@/components/Progress";
import ResElement from "@/components/ResElement";
import OnlyText from "@/components/ResElement/OnlyText";
import { ScrollView, Platform, StatusBar, Dimensions } from "react-native";
import styled from "styled-components/native";

const ReportLayout = () => {
  return (
    <Container>
      <Header title={"보고 내역 상세"} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ResImage src="https://www.humanesociety.org/sites/default/files/styles/768x326/public/2023-05/cat-grass-116668.jpg?h=464bc339&itok=U6H-jUuu" />
        <ResElementContainer>
          <FlexView gapVertical={36}>
            <ResElement title={"쓰레기 분류"}>
              <OnlyText content={`유리`} />
            </ResElement>
            <ResElement title={"직접 수거 여부"}>
              <OnlyText content={`수거 요청`} />
            </ResElement>
            <ResElement title={"수거 자루 개수"}>
              <OnlyText content={`40L 들이 3개`} />
            </ResElement>
            <ResElement title={"담당 지자체"}>
              <OnlyText content={`제주시 해양수산과\n(Tel. 000-000-0000)`} />
            </ResElement>
          </FlexView>
        </ResElementContainer>
        <Progress step={"ONGOING"} />
      </ScrollView>
    </Container>
  );
};

export default ReportLayout;

const Container = styled.View`
  /* padding-top: ${Platform.OS === "android"
    ? StatusBar.currentHeight
    : 0}px; */
  height: ${Dimensions.get("window").height}px;
`;

const ResImage = styled.Image`
  width: 100%;
  height: 340px;
`;

const ResElementContainer = styled.View`
  padding: 24px;
`;

import Header from "@/components/Header";
import { styled } from "styled-components/native";
import { Platform, StatusBar, Dimensions } from "react-native";
import DefaultBtn from "@/components/Button/DefaultBtn";
import HistoryElement from "@/components/HistoryElement";

const HistoryLayout = () => {
  return (
    <Container>
      <Header title={"보고 내역 확인"} />
      <CalendarButtonContainer>
        <DefaultBtn
          contents="날짜 선택하기"
          width={200}
          fontSize={32}
          handler={() => {}}
        />
      </CalendarButtonContainer>
      <ScrollViewContainer
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <HistoryElement isFirst={true} />
        <HistoryElement />
        <HistoryElement />
        <HistoryElement isEnd={true} />
      </ScrollViewContainer>
    </Container>
  );
};

export default HistoryLayout;

const ScrollViewContainer = styled.ScrollView`
  width: 90%;
`;

const CalendarButtonContainer = styled.View`
  align-items: flex-end;

  width: 100%;
  padding: 20px 16px;
`;

const Container = styled.View`
  align-items: center;

  width: 100%;
  height: ${Dimensions.get("window").height}px;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  padding-bottom: 40px;
`;

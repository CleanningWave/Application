import ImageBtn from "@/components/Button/ImageBtn";
import FlexView from "@/components/FlexView";
import { Container } from "@/components/LayoutContainer";
import Logo from "@/components/Logo";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { View } from "react-native";
import styled from "styled-components/native";

const reportImg = require("@/assets/images/report.png");
const historyImg = require("@/assets/images/history.png");

const MainLayout = () => {
  return (
    <Container>
      <FlexView gapVertical={60}>
        <View>
          <Logo isSubTitle={true} />
          <Explain>{`우리 동네 바닷가,\n내 손으로 깨끗하게 만들어요!`}</Explain>
        </View>

        <FlexView gapVertical={20}>
          <ImageBtn
            src={reportImg}
            handler={() => {}}
            text="해양 쓰레기 처리 보고"
          />
          <ImageBtn
            src={historyImg}
            handler={() => router.push("/history")}
            text="보고 내역 확인"
          />
        </FlexView>
      </FlexView>
    </Container>
  );
};

export default MainLayout;

const Explain = styled.Text`
  width: 100%;
  text-align: center;
  margin: 20px 0 0 0;

  font-family: "Inter-Regular";
  font-size: 24px;
  color: ${Colors.neutral.dark.dark_3};
`;

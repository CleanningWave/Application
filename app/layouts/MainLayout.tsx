import Logo from "@/components/Logo";
import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

const mainIcon = require("@/assets/images/icon.png");

const MainLayout = () => {
  return (
    <MainContainer>
      <Logo isSubTitle={true} />
      <Explain>{`우리 동네 바닷가 쓰레기,\n사진으로 쉽게 신고하세요!`}</Explain>
      <IconContainer source={mainIcon} />
      <ReportButton>
        <ReportButtonContents>신고하기</ReportButtonContents>
      </ReportButton>
    </MainContainer>
  );
};

export default MainLayout;

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Explain = styled.Text`
  width: 100%;
  text-align: center;
  margin: 10px 0 0 0;

  font-family: "Regular";
  font-size: 20px;
  color: ${Colors.neutral.dark.dark_3};
`;

const IconContainer = styled.Image`
  width: 119px;
  height: 119px;
  margin: 78px 0 68px 0;
`;

const ReportButtonContents = styled.Text`
  color: ${Colors.neutral.light.light_4};
  font-family: "SemiBold";
  font-size: 24px;
`;

const ReportButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 312px;
  height: 60px;

  background-color: ${Colors.highlight.highlight_0};

  border-radius: 12px;
`;

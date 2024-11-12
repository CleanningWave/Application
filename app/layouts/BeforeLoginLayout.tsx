import DefaultBtn from "@/components/Button/DefaultBtn";
import { Container } from "@/components/LayoutContainer";
import Logo from "@/components/Logo";
import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

const mainIcon = require("@/assets/images/icon.png");

const BeforeLoginLayout = () => {
  return (
    <Container>
      <Logo isSubTitle={true} />
      <Explain>{`우리 동네 바닷가,\n내 손으로 깨끗하게 만들어요!`}</Explain>
      <IconContainer source={mainIcon} />
      <ButtonContainer>
        <DefaultBtn isPrimary={true} margin={'0 0 20px 0'}>로그인하기</DefaultBtn>
        <DefaultBtn isColored={false} fontSize={24}>
          회원가입하기
        </DefaultBtn>
      </ButtonContainer>
    </Container>
  );
};

export default BeforeLoginLayout;

const Explain = styled.Text`
  width: 100%;
  text-align: center;
  margin: 20px 0 0 0;

  font-family: "Regular";
  font-size: 24px;
  color: ${Colors.neutral.dark.dark_3};
`;

const IconContainer = styled.Image`
  width: 119px;
  height: 119px;
  margin: 78px 0 68px 0;
`;

const ButtonContainer = styled.View``;

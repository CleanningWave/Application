import DefaultBtn from "@/components/Button/DefaultBtn";
import FlexView from "@/components/FlexView";
import { Container } from "@/components/LayoutContainer";
import Logo from "@/components/Logo";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import styled from "styled-components/native";

const LoginLayout = () => {
  return (
    <Container>
      <Logo isSubTitle={true} />
      <Title>로그인</Title>

      <InputContainer $marginBottom={22}>
        <InputLabel>아이디</InputLabel>
        <Input placeholder="아이디 입력하기" />
      </InputContainer>
      <InputContainer $marginBottom={84}>
        <InputLabel>비밀번호</InputLabel>
        <Input placeholder="비밀번호 입력하기" />
      </InputContainer>

      <DefaultBtn
        contents="로그인 하기"
        handler={() => {
          router.push("/main");
        }}
      />
    </Container>
  );
};

export default LoginLayout;

const Title = styled.Text`
  margin: 22px 0 36px 0;

  font-family: "Inter-Black";
  font-size: 40px;
  color: ${Colors.highlight.highlight_1};
`;

const Input = styled.TextInput`
  width: 295px;
  padding: 12px 16px;

  font-size: 24px;

  border: solid 1px ${Colors.neutral.light.light_0};
  border-radius: 12px;
`;

const InputLabel = styled.Text`
  margin-bottom: 16px;

  font-family: "Inter-Bold";
  font-size: 32px;
`;

const InputContainer = styled.View<{ $marginBottom: number }>`
  align-items: flex-start;
  justify-content: center;

  margin-bottom: ${({ $marginBottom }) => $marginBottom}px;
`;

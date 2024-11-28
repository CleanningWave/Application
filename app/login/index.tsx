import DefaultBtn from "@/components/Button/DefaultBtn";
import { Container } from "@/components/LayoutContainer";
import Logo from "@/components/Logo";
import { Colors } from "@/constants/Colors";
import { LoginReq } from "@/scripts/api/types/UserDto";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import styled from "styled-components/native";

const LoginLayout = () => {
  const [isFocus, setIsFocus] = useState<false | "id" | "password">(false);
  const [info, setInfo] = useState<LoginReq>({
    loginId: "",
    password: "",
  });

  const setLoginId = (loginId: string) =>
    setInfo((prev) => {
      return { ...prev, loginId: loginId };
    });

  const setPassword = (password: string) =>
    setInfo((prev) => {
      return { ...prev, password: password };
    });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Logo isSubTitle={true} />
          <Title>로그인</Title>

          <InputContainer $marginBottom={22}>
            <InputLabel>아이디</InputLabel>
            <Input
              $isFocus={isFocus === "id"}
              placeholder="아이디 입력하기"
              onFocus={() => setIsFocus("id")}
              onBlur={() => setIsFocus(false)}
              onChangeText={setLoginId}
            />
          </InputContainer>
          <InputContainer $marginBottom={84}>
            <InputLabel>비밀번호</InputLabel>
            <Input
              $isFocus={isFocus === "password"}
              placeholder="비밀번호 입력하기"
              onFocus={() => setIsFocus("password")}
              onBlur={() => setIsFocus(false)}
              onChangeText={setPassword}
            />
          </InputContainer>

          <DefaultBtn
            contents="로그인 하기"
            handler={() => {
              router.push("/main");
            }}
          />
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginLayout;

const Title = styled.Text`
  margin: 22px 0 36px 0;

  font-family: "Inter-Black";
  font-size: 40px;
  color: ${Colors.highlight.highlight_1};
`;

const Input = styled.TextInput<{ $isFocus: boolean }>`
  width: 295px;
  padding: 12px 16px;

  font-size: 24px;

  border: solid
    ${({ $isFocus }) =>
      $isFocus
        ? `2px ${Colors.highlight.highlight_0}`
        : `1px ${Colors.neutral.light.light_0}`};
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

import DefaultBtn from "@/components/Button/DefaultBtn";
import FlexView from "@/components/FlexView";
import { Container } from "@/components/LayoutContainer";
import Logo from "@/components/Logo";
import AlertFrame from "@/components/ResModal/AlertFrame";
import { Colors } from "@/constants/Colors";
import { API_PATH } from "@/constants/Path";
import baseInstance from "@/scripts/api/axios";
import { LoginReq, LoginRes } from "@/types/UserDto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import styled from "styled-components/native";

const LoginLayout = () => {
  const [isFocus, setIsFocus] = useState<false | "id" | "password">(false);
  const [isLoginErr, setIsLoginErr] = useState<boolean>(false);
  const [info, setInfo] = useState<LoginReq>({
    loginId: "",
    password: "",
  });

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async () =>
      await baseInstance.post<LoginRes>(API_PATH.POST_LOGIN, info),
    onSuccess: async ({ data }) => {
      const {
        user: {
          municipality: { name, tel },
          assignedAreas,
        },
        accessToken,
        refreshToken,
        tokenExpires,
      } = data;

      const { id } = assignedAreas[0];

      await AsyncStorage.clear();
      await AsyncStorage.multiSet([
        ["accessToken", accessToken],
        ["refreshToken", refreshToken],
        ["tokenExpires", tokenExpires.toString()],
        ["lastLogin", Date.now().toString()],
      ]);
      await AsyncStorage.setItem("area", `${name},${tel},${id}`);

      router.push("/main");
    },
    onError: (err) => {
      console.error(err);
      setIsLoginErr(true);
    },
  });

  const setLoginId = (loginId: string) =>
    setInfo((prev) => {
      return { ...prev, loginId: loginId };
    });

  const setPassword = (password: string) =>
    setInfo((prev) => {
      return { ...prev, password: password };
    });

  const resetInfo = () => setIsLoginErr(false);

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
            disabled={info.loginId.length === 0 && info.password.length === 0}
            handler={mutation.mutate}
          />
        </Container>
      </ScrollView>

      {/* 부가 요소 - 모달 */}
      <AlertFrame isVisible={isLoginErr} closeModalHandler={resetInfo}>
        <FlexView direction="column" gapVertical={30}>
          <Guide>등록되지 않은 계정입니다.</Guide>
          <DefaultBtn
            width={268}
            fontSize={24}
            contents="다시 입력하기"
            handler={resetInfo}
          />
        </FlexView>
      </AlertFrame>
    </KeyboardAvoidingView>
  );
};

export default LoginLayout;

const Guide = styled.Text`
  font-size: 36px;
  font-family: "Inter-ExtraBold";
  text-align: center;
`;

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

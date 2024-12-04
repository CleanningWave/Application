import { Colors } from "@/constants/Colors";
import { GestureResponderEvent, ImageSourcePropType } from "react-native";
import styled from "styled-components/native";

interface ImageBtnProps {
  src: ImageSourcePropType;
  text: string;
  handler: ((event: GestureResponderEvent) => void) | undefined;
}

const ImageBtn = ({ src, text, handler }: ImageBtnProps) => {
  return (
    <ImgBtnContainer onPress={handler}>
      <ImgContainer source={src} />
      <ImgBtnText>{text}</ImgBtnText>
    </ImgBtnContainer>
  );
};

export default ImageBtn;

const ImgContainer = styled.Image`
  width: 100%;
  height: 120px;
`;

const ImgBtnText = styled.Text`
  width: 100%;
  height: 56px;

  text-align: center;
  font-size: 32px;
`;

const ImgBtnContainer = styled.TouchableOpacity`
  width: 343px;
  height: 176px;

  overflow: hidden;
  border: solid 2px ${Colors.neutral.light.light_1};
  border-radius: 16px;
`;

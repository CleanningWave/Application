import { Colors } from "@/constants/Colors";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";

interface ImageBtnProps {
  src: ImageSourcePropType;
  text: string;
}

const ImageBtn = ({ src, text }: ImageBtnProps) => {
  return (
    <ImgBtnContainer>
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

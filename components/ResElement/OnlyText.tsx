import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

interface OnlyTextProps {
  content: string;
}

const OnlyText = ({ content }: OnlyTextProps) => {
  return <TextWrapper>{content}</TextWrapper>;
};

export default OnlyText;

const TextWrapper = styled.Text`
  font-size: 32px;
  color: ${Colors.neutral.dark.dark_3};
`;

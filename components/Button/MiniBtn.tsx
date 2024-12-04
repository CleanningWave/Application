import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

interface MiniBtnProps<T> {
  content: string;
  isSelected: boolean;
  handler: (value: T) => void;
}

const getStyles = (isSelected: boolean) => {
  return {
    bg: isSelected
      ? Colors.highlight.highlight_0
      : Colors.highlight.highlight_4,
    ft: isSelected
      ? Colors.neutral.light.light_4
      : Colors.highlight.highlight_0,
  };
};

const MiniBtn = <T,>({ content, isSelected, handler }: MiniBtnProps<T>) => {
  const { bg, ft } = getStyles(isSelected);

  return (
    <BtnContainer $bg={bg} onPress={() => handler(content as T)}>
      <BtnContents $ft={ft}>{content}</BtnContents>
    </BtnContainer>
  );
};

export default MiniBtn;

const BtnContents = styled.Text<{ $ft: string }>`
  color: ${({ $ft }) => $ft};
  font-family: "Inter-SemiBold";
  font-size: 24px;
`;

const BtnContainer = styled.TouchableOpacity<{
  $bg: string;
}>`
  align-self: flex-start;
  padding: 1px 8px;

  background-color: ${({ $bg }) => $bg};
  border-radius: 12px;
`;

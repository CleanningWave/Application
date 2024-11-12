import { Colors } from "@/constants/Colors";
import { PropsWithChildren } from "react";
import styled from "styled-components/native";

interface DefaultBtnProps extends PropsWithChildren {
  margin?: string;
  isColored?: boolean;
  isPrimary?: boolean;
  fontSize?: number;
}

const getStyles = (isColored: boolean, isPrimary: boolean) => {
  return {
    line:
      isColored || isPrimary
        ? Colors.highlight.highlight_0
        : Colors.neutral.light.light_1,
    bg: isPrimary ? Colors.highlight.highlight_0 : Colors.neutral.light.light_4,
    ft: isColored
      ? isPrimary
        ? Colors.neutral.light.light_4
        : Colors.highlight.highlight_0
      : Colors.neutral.dark.dark_0,
  };
};

const DefaultBtn = ({
  children,
  margin = "0",
  isColored = true,
  isPrimary = isColored,
  fontSize = 36,
}: DefaultBtnProps) => {
  const { line, bg, ft } = getStyles(isColored, isPrimary);

  return (
    <BtnContainer $margin={margin} $line={line} $bg={bg}>
      <BtnContents $ft={ft} $size={fontSize}>
        {children}
      </BtnContents>
    </BtnContainer>
  );
};

export default DefaultBtn;

const BtnContents = styled.Text<{ $ft: string; $size: number }>`
  color: ${({ $ft }) => $ft};
  font-family: "SemiBold";
  font-size: ${({ $size }) => $size}px;
`;

const BtnContainer = styled.TouchableOpacity<{
  $line: string;
  $bg: string;
  $margin: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 312px;
  height: 60px;
  margin: ${({ $margin }) => $margin};

  background-color: ${({ $bg }) => $bg};
  border: solid 1px ${({ $line }) => $line};

  border-radius: 12px;
`;

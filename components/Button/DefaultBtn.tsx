import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

interface DefaultBtnProps {
  contents: string;
  handler: () => void;
  margin?: string;
  isColored?: boolean;
  isPrimary?: boolean;
  fontSize?: number;
  width?: number;
  height?: number;
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
  contents,
  handler,
  margin = "0",
  isColored = true,
  isPrimary = isColored,
  fontSize = 36,
  width = 312,
  height = 60,
}: DefaultBtnProps) => {
  const { line, bg, ft } = getStyles(isColored, isPrimary);

  return (
    <BtnContainer
      onPress={handler}
      $width={width}
      $height={height}
      $margin={margin}
      $line={line}
      $bg={bg}
    >
      <BtnContents $ft={ft} $size={fontSize}>
        {contents}
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
  $width: number;
  $height: number;
  $line: string;
  $bg: string;
  $margin: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  margin: ${({ $margin }) => $margin};

  background-color: ${({ $bg }) => $bg};
  border: solid 1px ${({ $line }) => $line};

  border-radius: 12px;
`;

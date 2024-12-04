import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const STATUS = {
  COMPLETED: { text: `처리\n완료`, color: Colors.highlight.highlight_2 },
  PROCESSING: { text: `처리중`, color: Colors.support.green.green_0 },
  PENDING: { text: `접수중`, color: Colors.support.orange.orange_0 },
  REJECTED: { text: `처리\n거부`, color: Colors.support.red.red_0 },
};

interface ProgressProps {
  step: keyof typeof STATUS;
}

const Progress = ({ step }: ProgressProps) => {
  const { text, color } = STATUS[step];

  return (
    <ProgressWrapper>
      <ProgressContainer>
        <LineContainer $color={color}>
          <ProgressText $color={color}>{text}</ProgressText>
        </LineContainer>
      </ProgressContainer>
    </ProgressWrapper>
  );
};

export default Progress;

const ProgressText = styled.Text<{ $color: string }>`
  font-family: "Inter-ExtraBold";
  font-size: 36px;
  color: ${({ $color }) => $color};
`;

const LineContainer = styled.View<{ $color: string }>`
  align-items: center;
  justify-content: center;

  width: 135px;
  height: 135px;

  border-radius: 100px;
  border: solid 6px ${({ $color }) => $color};
`;

const ProgressContainer = styled.View`
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 278px;
  right: 12px;

  width: 144px;
  height: 144px;

  border-radius: 100px;
  background-color: ${Colors.neutral.light.light_4};
`;

const ProgressWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;
`;

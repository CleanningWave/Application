import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

const Progress = () => {
  return (
    <ProgressWrapper>
      <ProgressContainer>
        <LineContainer>
          <ProgressText>처리중</ProgressText>
        </LineContainer>
      </ProgressContainer>
    </ProgressWrapper>
  );
};

export default Progress;

const ProgressText = styled.Text`
  font-family: "Inter-ExtraBold";
  font-size: 36px;
`;

const LineContainer = styled.View`
  align-items: center;
  justify-content: center;

  width: 135px;
  height: 135px;

  border-radius: 100px;
  border: solid 6px ${Colors.neutral.dark.dark_0};
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

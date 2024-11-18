import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";
import FlexView from "./FlexView";
import { GestureResponderEvent } from "react-native";

interface HistoryElementProps {
  handler: ((event: GestureResponderEvent) => void) | undefined;

  isFirst?: boolean;
  isEnd?: boolean;
}

const HistoryElement = ({
  handler,
  isFirst = false,
  isEnd = false,
}: HistoryElementProps) => {
  return (
    <ElementContainer onPress={handler} $isFirst={isFirst} $isEnd={isEnd}>
      <FlexView gapHorizental={16}>
        <Title>2024년 12월 25일 보고 (1)</Title>
        <SubTitle>제주시 함덕 해수욕장</SubTitle>
      </FlexView>
    </ElementContainer>
  );
};

export default HistoryElement;

const SubTitle = styled.Text`
  font-size: 32px;
`;

const Title = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 36px;
`;

const ElementContainer = styled.TouchableOpacity<{
  $isFirst: boolean;
  $isEnd: boolean;
}>`
  padding: 20px 0;

  border-color: ${Colors.neutral.light.light_0};
  border-top-width: ${({ $isFirst }) => ($isFirst ? 2 : 1)}px;
  border-bottom-width: ${({ $isEnd }) => ($isEnd ? 2 : 1)}px;
`;

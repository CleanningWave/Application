import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";
import FlexView from "./FlexView";
import { GestureResponderEvent } from "react-native";
import moment from "moment";
import { CategoriesType } from "@/types/ReportDto";

interface HistoryElementProps {
  title: string;
  area: string;
  categories: CategoriesType;
  handler: ((event: GestureResponderEvent) => void) | undefined;

  isFirst?: boolean;
  isEnd?: boolean;
}

const HistoryElement = ({
  title,
  area,
  categories,
  handler,
  isFirst = false,
  isEnd = false,
}: HistoryElementProps) => {
  return (
    <ElementContainer onPress={handler} $isFirst={isFirst} $isEnd={isEnd}>
      <FlexView gapVertical={16}>
        <Title>{moment(title).utc().format("YYYY년 MM월 DD일")}</Title>
        <SubTitle>{area}</SubTitle>
        <SubTitle>{categories.join(", ")}</SubTitle>
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

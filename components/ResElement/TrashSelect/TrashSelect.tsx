import { ReportReq } from "@/app/result";
import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import styled from "styled-components/native";

interface TrashSelectButton {
  result: ReportReq;
  handler: () => void;
}

const TrashSelectButton = ({ result, handler }: TrashSelectButton) => {
  return (
    <SelectContainer onPress={handler}>
      <SelectContents>{result.categories.join(", ")}</SelectContents>
      <SelectArrow>
        <Entypo
          name="chevron-small-down"
          size={24}
          color={Colors.neutral.dark.dark_3}
        />
      </SelectArrow>
    </SelectContainer>
  );
};

export default TrashSelectButton;

const SelectArrow = styled.View`
  align-items: center;
  justify-content: center;

  width: 30px;
`;

const SelectContents = styled.Text`
  flex: 1;
  flex-wrap: wrap;
  font-size: 24px;
`;

const SelectContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;

  width: 100%;
  min-height: 28px;
  max-height: 176px;
  padding: 8px 16px;

  border-radius: 16px;
  border: solid 1px ${Colors.neutral.light.light_0};
`;

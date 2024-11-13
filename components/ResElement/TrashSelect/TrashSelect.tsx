import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { View } from "react-native";
import styled from "styled-components/native";

interface TrashSelectButton {
  handler: () => void;
}

const TrashSelectButton = ({ handler }: TrashSelectButton) => {
  return (
    <View>
      <SelectContainer onPress={handler}>
        <SelectContents>유리</SelectContents>
        <SelectArrow>
          <Entypo
            name="chevron-small-down"
            size={24}
            color={Colors.neutral.dark.dark_3}
          />
        </SelectArrow>
      </SelectContainer>
    </View>
  );
};

export default TrashSelectButton;

const SelectArrow = styled.View`
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 100%;
`;

const SelectContents = styled.Text`
  font-size: 24px;
`;

const SelectContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: 48px;
  padding: 8px 16px;

  border-radius: 16px;
  border: solid 1px ${Colors.neutral.light.light_0};
`;

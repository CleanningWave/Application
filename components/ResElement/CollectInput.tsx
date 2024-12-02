import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";
import { WasteQuantityDto } from "@/types/ReportDto";

interface CollectInputProps {
  quantities: Array<WasteQuantityDto>;
  modifyResultQuantites: (
    idx: number,
    type: keyof WasteQuantityDto,
    changed: string
  ) => void;
  addResultQuantities: () => void;
}

const CollectInput = ({
  quantities,
  modifyResultQuantites,
  addResultQuantities,
}: CollectInputProps) => {
  return (
    <CollectElementWrapper>
      {quantities.map(({ quantity, volume }, idx) => (
        <CollectElementContainer key={`collect_quantites_${idx}`}>
          <PairElementContainer>
            <CollectTextInput
              onChangeText={(e) => modifyResultQuantites(idx, "quantity", e)}
              value={quantity.toString()}
            />
            <CollectText>L</CollectText>
          </PairElementContainer>
          <PairElementContainer>
            <CollectTextInput
              onChangeText={(e) => modifyResultQuantites(idx, "volume", e)}
              value={volume.toString()}
            />
            <CollectText>개</CollectText>
          </PairElementContainer>
        </CollectElementContainer>
      ))}
      <AddCollectBtnContainer onPress={addResultQuantities}>
        <AddCollectBtnContents>수거 내역 추가하기</AddCollectBtnContents>
      </AddCollectBtnContainer>
    </CollectElementWrapper>
  );
};

export default CollectInput;

const AddCollectBtnContents = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 24px;
  color: ${Colors.highlight.highlight_0};
`;

const AddCollectBtnContainer = styled.TouchableOpacity`
  align-items: center;

  width: 100%;

  background-color: ${Colors.highlight.highlight_4};

  border-radius: 10px;
`;

const CollectText = styled.Text`
  margin-left: 12px;

  font-size: 24px;
`;

const CollectTextInput = styled.TextInput`
  width: 93px;
  height: 48px;
  padding: 8px;

  border: solid 1px ${Colors.neutral.light.light_0};
  border-radius: 12px;
  font-size: 24px;

  text-align: right;
`;

const PairElementContainer = styled.View`
  flex-direction: row;
  align-items: center;

  margin-right: 20px;
`;

const CollectElementContainer = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: 16px;
`;

const CollectElementWrapper = styled.View`
  width: 100%;
`;

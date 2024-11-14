import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";
import DefaultBtn from "../Button/DefaultBtn";

const CollectInput = () => {
  return (
    <CollectElementWrapper>
      <CollectElementContainer>
        <PairElementContainer>
          <CollectTextInput />
          <CollectText>L</CollectText>
        </PairElementContainer>
        <PairElementContainer>
          <CollectTextInput />
          <CollectText>개</CollectText>
        </PairElementContainer>
      </CollectElementContainer>
      <AddCollectBtnContainer>
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

  border: solid 1px ${Colors.neutral.light.light_0};
  border-radius: 12px;
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

const CollectElementWrapper = styled.View``;

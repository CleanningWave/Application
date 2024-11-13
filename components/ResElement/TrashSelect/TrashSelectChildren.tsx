import MiniBtn from "@/components/Button/MiniBtn";
import FlexView from "@/components/FlexView";
import { TRASH_TYPES } from "@/constants/TrashType";
import styled from "styled-components/native";

interface TrashSelectChildrenProps {
  selected: Array<keyof typeof TRASH_TYPES>;
}

const TrashSelectChildren = ({ selected }: TrashSelectChildrenProps) => {
  return (
    <SelectContainer>
      <SelectTitle>쓰레기 분류 재선택하기</SelectTitle>
      <FlexView direction="row" wrap="wrap" gapHorizental={8} gapVertical={8}>
        {(Object.keys(TRASH_TYPES) as Array<keyof typeof TRASH_TYPES>).map(
          (t) => (
            <MiniBtn
              key={t}
              content={TRASH_TYPES[t]}
              isSelected={selected.includes(t)}
            />
          )
        )}
      </FlexView>
    </SelectContainer>
  );
};

export default TrashSelectChildren;

const SelectTitle = styled.Text`
  margin-bottom: 20px;

  font-family: "Black";
  font-size: 24px;
`;

const SelectContainer = styled.View``;

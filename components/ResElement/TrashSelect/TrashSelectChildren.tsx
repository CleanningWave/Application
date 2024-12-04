import MiniBtn from "@/components/Button/MiniBtn";
import FlexView from "@/components/FlexView";
import { TRASH_TYPES } from "@/constants/Result";
import { CategoriesType, CategorieType } from "@/types/ReportDto";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";

interface TrashSelectChildrenProps {
  selected: CategoriesType;
  setSelected: Dispatch<SetStateAction<CategoriesType>>;
}

const TrashSelectChildren = ({
  selected,
  setSelected,
}: TrashSelectChildrenProps) => {
  const selectedHandler = (target: CategorieType) => {
    let tmp: CategoriesType = [...selected];
    if (tmp.includes(target)) {
      tmp = tmp.filter((t) => t !== target);
    } else {
      tmp = [...tmp, target];
    }

    setSelected(() => tmp);
  };

  return (
    <SelectContainer>
      <SelectTitle>쓰레기 분류 재선택하기</SelectTitle>
      <FlexView direction="row" wrap="wrap" gapHorizental={8} gapVertical={8}>
        {(Object.keys(TRASH_TYPES) as Array<keyof typeof TRASH_TYPES>).map(
          (t) => (
            <MiniBtn<CategorieType>
              key={t}
              content={TRASH_TYPES[t]}
              isSelected={selected.includes(TRASH_TYPES[t])}
              handler={selectedHandler}
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

  font-family: "Inter-Black";
  font-size: 24px;
`;

const SelectContainer = styled.View``;

import { Colors } from "@/constants/Colors";
import { PropsWithChildren } from "react";
import styled from "styled-components/native";
import FlexView from "../FlexView";
import DefaultBtn from "../Button/DefaultBtn";

export type buttonHandlerObj = {
  title: string;
  isPrimary: boolean;
  handler: () => void;
};

interface BottomSheetProps extends PropsWithChildren {
  buttonHandler: Array<buttonHandlerObj>;
  isVisible: boolean;
}

const BottomSheet = ({
  isVisible,
  buttonHandler,
  children,
}: BottomSheetProps) => {
  return (
    isVisible && (
      <Wrapper>
        <Dim />
        <BottomSheetContainer>
          <ChildrenCotainer>{children}</ChildrenCotainer>
          <ButtonCotainer>
            <FlexView direction={"row"} gapHorizental={8}>
              {buttonHandler.map((el) => (
                <DefaultBtn
                  contents={el.title}
                  isPrimary={el.isPrimary}
                  fontSize={24}
                  width={168}
                  height={50}
                  handler={el.handler}
                />
              ))}
            </FlexView>
          </ButtonCotainer>
        </BottomSheetContainer>
      </Wrapper>
    )
  );
};

export default BottomSheet;

const ButtonCotainer = styled.View`
  align-items: center;

  margin-top: 30px;
`;

const ChildrenCotainer = styled.View``;

const BottomSheetContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  padding: 32px 12px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${Colors.neutral.light.light_4};
`;

const Dim = styled.View`
  width: 100%;
  height: 100%;

  background-color: ${Colors.neutral.dark.dark_0};
  opacity: 0.85;
`;

const Wrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;
`;

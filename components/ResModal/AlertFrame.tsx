import { Colors } from "@/constants/Colors";
import { PropsWithChildren } from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

interface AlertFrameProps extends PropsWithChildren {
  isVisible: boolean;
  closeModalHandler: () => void;
}

const AlertFrame = ({
  isVisible,
  closeModalHandler,
  children,
}: AlertFrameProps) => {
  return (
    <Wrapper>
      {isVisible && <Dim />}
      <Modal
        animationType="slide"
        visible={isVisible}
        transparent={true}
        onRequestClose={closeModalHandler}
      >
        <AlertWrapper>
          <AlertContainer>{children}</AlertContainer>
        </AlertWrapper>
      </Modal>
    </Wrapper>
  );
};

export default AlertFrame;

export const AlertContainer = styled.View`
  width: 300px;
  padding: 20px;

  background-color: ${Colors.neutral.light.light_4};
  border-radius: 16px;
`;

export const AlertWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

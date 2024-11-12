import { ReactNode } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

export interface FlexViewProps {
  children: ReactNode;
  direction?: "column" | "row";
  wrap?: "wrap" | "nowrap";
  gapHorizental?: number;
  gapVertical?: number;
}

const FlexView = (props: FlexViewProps) => {
  return (
    <FlexViewStyled {...props}>
      {Object.values(props.children || {})?.map((item, idx) => (
        <View
          key={idx}
          style={{
            marginTop: (props.gapVertical || 0) / 2,
            marginBottom: (props.gapVertical || 0) / 2,
            marginRight: (props.gapHorizental || 0) / 2,
            marginLeft: (props.gapHorizental || 0) / 2,
          }}
        >
          {item}
        </View>
      ))}
    </FlexViewStyled>
  );
};

export default FlexView;

export const FlexViewStyled = styled.View<FlexViewProps>`
  flex-direction: ${({ direction }) => direction || "column"};
  flex-wrap: ${({ wrap }) => wrap || "nowrap"};
  margin: ${(props) =>
    `-${(props.gapVertical || 0) / 2}px -${(props.gapHorizental || 0) / 2}px`};
`;

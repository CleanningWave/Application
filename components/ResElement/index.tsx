import styled from "styled-components/native";
import { PropsWithChildren } from "react";

interface ResElementProps extends PropsWithChildren {
  title: string;
}

const ResElement = ({ title, children }: ResElementProps) => {
  return (
    <ElementContainer>
      <ElementTitle>{title}</ElementTitle>
      <ElementWrapper>{children}</ElementWrapper>
    </ElementContainer>
  );
};

export default ResElement;

const ElementWrapper = styled.View``;

const ElementTitle = styled.Text`
  margin: 0 0 16px 0;

  font-family: "Inter-ExtraBold";
  font-size: 32px;
`;

const ElementContainer = styled.View``;

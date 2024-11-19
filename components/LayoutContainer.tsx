import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${Dimensions.get("window").width}px;
  height: ${Dimensions.get("window").height}px;
`;

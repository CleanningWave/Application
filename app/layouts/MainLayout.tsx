import { Text, View } from "react-native";
import styled from "styled-components/native";

const MainLayout = () => {
  return (
    <MainContainer>
      <Text>MainLayout</Text>
    </MainContainer>
  );
};

export default MainLayout;

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: aliceblue;
`;

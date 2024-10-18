import Logo from "@/components/Logo";
import styled from "styled-components/native";

const MainLayout = () => {
  return (
    <MainContainer>
      <Logo />
    </MainContainer>
  );
};

export default MainLayout;

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

interface LogoProps {
  isSubTitle?: boolean;
}

const Logo = ({ isSubTitle = false }: LogoProps) => {
  return (
    <LogoContainer>
      <MainLogoContainer>
        <LogoText>Cleaning&nbsp;</LogoText>
        <LogoPointText>W</LogoPointText>
        <LogoText>ave</LogoText>
      </MainLogoContainer>
      {isSubTitle && <SubLogoText>클리닝 웨이브</SubLogoText>}
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainLogoContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LogoPointText = styled.Text`
  font-family: "ExtraBold";
  font-size: 36px;
  color: ${Colors.highlight.highlight_0};
`;

const LogoText = styled.Text`
  font-family: "ExtraBold";
  font-size: 36px;
  color: ${Colors.text};
`;

const SubLogoText = styled.Text`
  margin-top: 4px;

  font-family: "Thin";
  font-size: 26px;
  color: ${Colors.text};
`;

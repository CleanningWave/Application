import { Colors } from "@/constants/Colors";
import { Text } from "react-native";
import styled from "styled-components/native";

const Logo = () => {
  return (
    <LogoContainer>
      <LogoText>Cleaning&nbsp;</LogoText>
      <LogoPointText>W</LogoPointText>
      <LogoText>ave</LogoText>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LogoPointText = styled.Text`
  font-family: "ExtraBold";
  font-size: 36;
  color: ${Colors.highlight.highlight_0};
`;

const LogoText = styled.Text`
  font-family: "ExtraBold";
  font-size: 36;
  color: ${Colors.text};
`;

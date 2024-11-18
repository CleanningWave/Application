import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";

interface HeaderProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const Header = ({ title, containerStyle, titleStyle }: HeaderProps) => {
  // const navigation = useNavigation();

  return (
    <Container style={containerStyle}>
      <LeftSection>
        {/* <BackButton onPress={() => navigation.goBack()}> */}
        <BackButton onPress={() => {}}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={Colors.highlight.highlight_0}
          />
        </BackButton>
      </LeftSection>

      <CenterSection>
        <Title style={titleStyle}>{title}</Title>
      </CenterSection>
    </Container>
  );
};

export default Header;

const Container = styled.View`
  height: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const LeftSection = styled.View`
  width: 50px;
  align-items: flex-start;
`;

const CenterSection = styled.View`
  flex: 1;
  align-items: left;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 600;
`;

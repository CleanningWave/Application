import { Container } from "@/components/LayoutContainer";
import Logo from "@/components/Logo";
import { Text } from "react-native";
import styled from "styled-components/native";

const LoginLayout = () => {
  return (
    <Container>
      <Logo isSubTitle={true} />
      <Text>HEY</Text>
    </Container>
  );
};

export default LoginLayout;


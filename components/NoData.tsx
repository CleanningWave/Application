import { Dimensions } from "react-native";
import styled from "styled-components/native";

const icon = require("@/assets/images/NoDataIcon.png");

const NoData = () => {
  return (
    <Container>
      <ImgContainer source={icon} />
      <Explain>{`보고 내역이\n존재하지 않습니다.`}</Explain>
    </Container>
  );
};

export default NoData;

const ImgContainer = styled.Image`
  width: 20px;
  height: 100px;
  margin: 30% 0 16px 0;
`;

const Explain = styled.Text`
  font-size: 40px;
  text-align: center;
`;

const Container = styled.View`
  align-items: center;

  width: ${Dimensions.get("window").width}px;
  height: ${Dimensions.get("window").height - 180}px;
`;

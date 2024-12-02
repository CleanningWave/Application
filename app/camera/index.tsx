import DefaultBtn from "@/components/Button/DefaultBtn";
import FlexView from "@/components/FlexView";
import { postFile } from "@/scripts/api/fileApi";
import { useMutation } from "@tanstack/react-query";
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Linking } from "react-native";
import styled from "styled-components/native";

const CameraLayout = () => {
  const [picture, setPicture] = useState<CameraCapturedPicture | undefined>();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  const mutation = useMutation({
    mutationKey: ["fileUpload"],
    mutationFn: async () => await postFile(picture?.uri as string),
    onSuccess: async (res) => {
      if (res?.data) {
        router.push({
          pathname: "/result",
          params: {
            imgId: res.data.file.id,
            imgUrl: res.data.file.path,
          },
        });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const checkPermission = async () => {
    if (!permission) return;

    if (permission.status !== "granted") {
      if (!permission.canAskAgain) {
        Alert.alert(
          "권한 필요",
          "앱 설정에서 카메라 권한을 변경해주세요.",
          [
            { text: "취소", style: "cancel" },
            {
              text: "설정 열기",
              onPress: () => {
                Linking.openSettings(); // 설정을 여는 기능
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        requestPermission();
      }
    }
  };

  const takePictureHandler = async () => {
    if (!cameraRef.current) return;

    await cameraRef.current
      .takePictureAsync({
        base64: true,
      })
      .then((data) => {
        setPicture(data);
      });
  };

  useEffect(() => {
    checkPermission();
  }, [permission]);

  if (picture?.uri) {
    return (
      <PictureContainer>
        <PicturePreview source={{ uri: picture.uri }} />
        <CameraButtonContainer>
          <FlexView direction="row" gapHorizental={8}>
            <DefaultBtn
              isPrimary={false}
              contents="다시 찍기"
              width={162}
              handler={() => setPicture(undefined)}
            />
            <DefaultBtn
              contents="보고하기"
              width={162}
              handler={mutation.mutate}
              // handler={() => {
              //   router.push("/result");
              // }}
            />
          </FlexView>
        </CameraButtonContainer>
      </PictureContainer>
    );
  } else {
    return (
      <CameraContainer>
        <CameraViewStyled facing="back" ref={cameraRef} zoom={1}>
          <CameraButtonContainer>
            <DefaultBtn contents="사진 찍기" handler={takePictureHandler} />
          </CameraButtonContainer>
        </CameraViewStyled>
      </CameraContainer>
    );
  }
};

export default CameraLayout;

const PicturePreview = styled.Image`
  width: 100%;
  height: 100%;
`;

const PictureContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const CameraButtonContainer = styled.View`
  align-items: center;

  position: absolute;
  bottom: 40px;

  width: 100%;
`;

const CameraViewStyled = styled(CameraView)`
  flex: 1;
`;

const CameraContainer = styled.View`
  justify-content: center;
  height: 100%;
`;

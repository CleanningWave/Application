import FlexView from "@/components/FlexView";
import Header from "@/components/Header";
import { Container } from "@/components/LayoutContainer";
import Progress from "@/components/Progress";
import * as ResElement from "@/components/ResElement";
import { API, API_PATH } from "@/constants/Path";
import { COLLECT_TYPE } from "@/constants/Result";
import baseInstance from "@/scripts/api/axios";
import { AreaDto, MunicipalityDto } from "@/types/AreaDto";
import { ReportDto } from "@/types/ReportDto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

interface GetHistoryByIdRes
  extends Omit<
    ReportDto,
    "createdAt" | "collectedAt" | "updatedAt" | "reporter" | "area"
  > {
  area: Omit<AreaDto, "id" | "civilServants" | "municipality"> & {
    areaId: string;
  };
  images: Array<{ id: string; path: string }>;
}

const ReportLayout = () => {
  const item = useLocalSearchParams();

  const [report, setReport] = useState<GetHistoryByIdRes>({
    id: "",
    status: "PENDING",
    categories: [],
    reportType: "SELF_COLLECTION",
    quantities: [],
    images: [],
    area: {
      areaId: "",
      name: "",
      detailAddress: "",
    },
  });
  const [area, setArea] = useState<Omit<MunicipalityDto, "id">>();

  const { data, isLoading } = useQuery({
    queryKey: ["getHistoryById"],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("accessToken");
      const areaInfo = (await AsyncStorage.getItem("area"))?.toString();
      if (areaInfo) {
        const [name, tel] = areaInfo.split(",");
        setArea({ name: name, tel: tel });
      }
      return await baseInstance.get<GetHistoryByIdRes>(
        API_PATH.GET_HISTORY_BY_ID(item.id as string),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    },
  });

  useEffect(() => {
    if (Object.keys(item).length > 0 && data?.data && !isLoading) {
      setReport(data?.data);
    }
  }, [item]);

  return (
    <Container>
      <Header title={"보고 내역 상세"} />
      <ScrollViewConatiner
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ResImage
          src={report.images.length > 0 ? `${API}${report.images[0].path}` : ""}
        />
        <ResElementContainer>
          <FlexView gapVertical={36}>
            <ResElement.Frame title={"쓰레기 분류"}>
              <ResElement.OnlyText content={report.categories.join(", ")} />
            </ResElement.Frame>
            <ResElement.Frame title={"직접 수거 여부"}>
              <ResElement.OnlyText content={COLLECT_TYPE[report.reportType]} />
            </ResElement.Frame>
            <ResElement.Frame title={"수거 자루 개수"}>
              <FlexView gapHorizental={16}>
                {report.quantities.map(({ quantity, volume }, idx) => (
                  <ResElement.OnlyText
                    key={`${quantity}_${volume}_${idx}`}
                    content={`${volume}L 들이 ${quantity}개`}
                  />
                ))}
              </FlexView>
            </ResElement.Frame>
            <ResElement.Frame title={"담당 지자체"}>
              <ResElement.OnlyText
                content={`${area?.name}\n(Tel. ${area?.tel})`}
              />
            </ResElement.Frame>
          </FlexView>
        </ResElementContainer>
        <Progress step={report.status} />
      </ScrollViewConatiner>
    </Container>
  );
};

export default ReportLayout;

const ResImage = styled.Image`
  width: 100%;
  height: 340px;

  background-color: aliceblue;
`;

const ResElementContainer = styled.View`
  padding: 24px;
`;

const ScrollViewConatiner = styled.ScrollView`
  width: ${Dimensions.get("window").width};
`;

import FlexView from "@/components/FlexView";
import Header from "@/components/Header";
import { Container } from "@/components/LayoutContainer";
import Progress from "@/components/Progress";
import ResElement from "@/components/ResElement";
import OnlyText from "@/components/ResElement/OnlyText";
import { API_PATH } from "@/constants/Path";
import baseInstance from "@/scripts/api/axios";
import { AreaDto } from "@/types/AreaDto";
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
    reportType: "",
    quantities: [],
    images: [],
    area: {
      areaId: "",
      name: "",
      detailAddress: "",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getHistoryById"],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("accessToken");
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
        {/* <ResImage src={`${API}${report?.images[0].path}`} /> */}
        <ResImage src="https://www.humanesociety.org/sites/default/files/styles/768x326/public/2023-05/cat-grass-116668.jpg?h=464bc339&itok=U6H-jUuu" />
        <ResElementContainer>
          <FlexView gapVertical={36}>
            <ResElement title={"쓰레기 분류"}>
              <OnlyText content={report.categories.join(", ")} />
            </ResElement>
            <ResElement title={"직접 수거 여부"}>
              <OnlyText content={report.reportType} />
            </ResElement>
            <ResElement title={"수거 자루 개수"}>
              <FlexView gapHorizental={16}>
                {report.quantities.map(({ quantity, volume }, idx) => (
                  <OnlyText
                    key={`${quantity}_${volume}_${idx}`}
                    content={`${volume}L 들이 ${quantity}개`}
                  />
                ))}
              </FlexView>
            </ResElement>
            <ResElement title={"담당 지자체"}>
              <OnlyText
                content={`로그인 이후 지자체 정보 이름 넣을 곳\n(Tel. 여기는 전화번호 넣을 곳)`}
              />
            </ResElement>
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
`;

const ResElementContainer = styled.View`
  padding: 24px;
`;

const ScrollViewConatiner = styled.ScrollView`
  width: ${Dimensions.get("window").width};
`;

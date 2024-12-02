import { API_PATH } from "@/constants/Path";
import { useInfiniteQuery } from "@tanstack/react-query";
import baseInstance from "@/scripts/api/axios";
import { FlatList } from "react-native";
import HistoryElement from "./HistoryElement";
import { router } from "expo-router";
import { ReportDto } from "@/types/ReportDto";
import NoData from "./NoData";
import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";

interface HistoryListProps {
  selectDay: string;
}

const HistoryList = ({ selectDay }: HistoryListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["getHistory"],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        const response = await baseInstance.get(
          API_PATH.GET_HISTORY_LIST(pageParam)
        );
        return response.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.total > allPages.length ? nextPage : undefined;
      },
    });

  const flattenedData = data?.pages.flatMap((page) => page.data) || [];

  const isSameDate = (target: string) => {
    const selected = new Date(selectDay);
    const targeted = new Date(target);

    return (
      selected.getFullYear() === targeted.getFullYear() &&
      selected.getMonth() === targeted.getMonth() &&
      selected.getDate() === targeted.getDate()
    );
  };

  const selectedData =
    selectDay.length > 0
      ? flattenedData.filter((d) => isSameDate(d.collectedAt))
      : flattenedData;

  const historyJSX = ({ item, index }: { item: ReportDto; index: number }) => (
    <HistoryElement
      key={item.id}
      title={item.collectedAt}
      area={item.area.municipality.name}
      categories={item.categories}
      handler={() =>
        router.push({ pathname: "/report", params: { id: item.id } })
      }
      isFirst={index === 0}
      isEnd={index === flattenedData.length - 1}
    />
  );

  const endRechedHandler = () =>
    hasNextPage && !isFetchingNextPage && fetchNextPage();

  return selectedData.length > 0 ? (
    <FlatList
      data={selectedData}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ width: "90%", paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      renderItem={historyJSX}
      onEndReached={endRechedHandler}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        isFetchingNextPage ? (
          <LoadingContainer>
            <LoadingExplain>{`보고 내역을\n가져오고 있습니다`}</LoadingExplain>
          </LoadingContainer>
        ) : null
      }
    />
  ) : (
    <NoData />
  );
};

export default HistoryList;

const LoadingExplain = styled.Text`
  color: ${Colors.highlight.highlight_0};
  text-align: center;
  font-size: 36px;
`;

const LoadingContainer = styled.View`
  align-items: center;
  width: 100%;
  padding: 20px;
`;

import { API_PATH } from "@/constants/Path";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useInfiniteQuery } from "@tanstack/react-query";
import baseInstance from "@/scripts/api/axios";
import { FlatList } from "react-native";
import HistoryElement from "./HistoryElement";
import { router } from "expo-router";
import { ReportDto } from "@/types/ReportDto";

const HistoryList = () => {
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

  return (
    <FlatList
      data={flattenedData}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ width: "90%", paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      renderItem={historyJSX}
      onEndReached={endRechedHandler}
      onEndReachedThreshold={0.1}
      // ListFooterComponent={
      //   isFetchingNextPage ? (
      //     <View style={{ alignItems: "center", padding: 20 }}>
      //       <Text>로딩 중...</Text>
      //     </View>
      //   ) : null
      // }
    />
  );
};

export default HistoryList;

import Header from "@/components/Header";
import { styled } from "styled-components/native";
import DefaultBtn from "@/components/Button/DefaultBtn";
import BottomSheet, { buttonHandlerObj } from "@/components/BottomSheet";
import CalendarCompo from "@/components/Calendar";
import { useState } from "react";
import { WEEK_ENUM } from "@/constants/Calendars";
import { Colors } from "@/constants/Colors";
import { Container } from "@/components/LayoutContainer";
import HistoryList from "@/components/HistoryList";

const HistoryLayout = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [selectDay, setSelectDay] = useState<string>("");

  const getSelectDay = (day: string) => setSelectDay(day);

  const showSelectDate = () => {
    const date = new Date(selectDay);

    return `${date.getFullYear()}년\n${
      date.getMonth() + 1
    }월 ${date.getDate()}일\t\t(${WEEK_ENUM[date.getDay()]})`;
  };

  const openCalendar = () => setIsCalendarOpen(true);

  const closeCalendar = () => setIsCalendarOpen(false);

  const buttonHandler: Array<buttonHandlerObj> = [
    {
      title: "달력 닫기",
      isPrimary: false,
      handler: () => {
        getSelectDay("");
        closeCalendar();
      },
    },
    {
      title: "날짜 선택하기",
      isPrimary: true,
      handler: () => {
        closeCalendar();
      },
    },
  ];

  return (
    <Container>
      <Header title={"보고 내역 확인"} />
      {selectDay.length > 0 && !isCalendarOpen && (
        <SelectDayTextContainer>{showSelectDate()}</SelectDayTextContainer>
      )}
      <CalendarButtonContainer>
        <DefaultBtn
          contents="날짜 선택하기"
          width={200}
          fontSize={32}
          handler={openCalendar}
        />
      </CalendarButtonContainer>

      <HistoryList selectDay={selectDay} />

      <BottomSheet isVisible={isCalendarOpen} buttonHandler={buttonHandler}>
        <CalendarCompo selectDay={selectDay} getSelectDay={getSelectDay} />
      </BottomSheet>
    </Container>
  );
};

export default HistoryLayout;

const CalendarButtonContainer = styled.View`
  align-items: flex-end;

  width: 100%;
  padding: 20px 16px;
`;

const SelectDayTextContainer = styled.Text`
  align-items: flex-start;

  width: 90%;

  font-size: 40px;
  font-family: "Inter-Bold";
  color: ${Colors.highlight.highlight_0};
`;

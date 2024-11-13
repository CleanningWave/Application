import { LOCALE_OBJ } from "@/constants/Calendars";
import { Colors } from "@/constants/Colors";
import { Calendar, LocaleConfig } from "react-native-calendars";
import styled from "styled-components/native";

type dateObjType = {
  dateString: string;
  day: number;
  month: number;
  timestemp: number;
  year: number;
};

interface CalendarCompo {
  selectDay: string;
  getSelectDay: (day: string) => void;
}

LocaleConfig.locales["kr"] = LOCALE_OBJ;

LocaleConfig.defaultLocale = "kr";

const CalendarCompo = ({ selectDay, getSelectDay }: CalendarCompo) => {
  return (
    <Calendar
      hideExtraDays={true}
      dayComponent={({
        date: { day, dateString },
        state,
      }: {
        date: dateObjType;
        state: "today" | "";
      }) => {
        return (
          <DayWrapper
            onPress={() => getSelectDay(dateString)}
            $isToday={state === "today"}
            $isSelected={dateString === selectDay}
          >
            <DayText $isSelected={dateString === selectDay}>{day}</DayText>
          </DayWrapper>
        );
      }}
      renderHeader={(date: Date) => (
        <HeaderText>
          {date.getFullYear()}년 {date.getMonth() + 1}월
        </HeaderText>
      )}
      theme={{
        textDayHeaderFontSize: 24,
        textDayHeaderFontFamily: "SemiBold",
        color: Colors.neutral.dark.dark_4,
        "stylesheet.calendar.header": {
          dayTextAtIndex0: {
            color: Colors.support.red.red_0,
          },
          dayTextAtIndex6: {
            color: Colors.highlight.highlight_0,
          },
        },
      }}
    />
  );
};

export default CalendarCompo;

const DayText = styled.Text<{ $isSelected: boolean }>`
  font-size: 24px;
  font-family: ${({ $isSelected }) => ($isSelected ? "SemiBold" : "Light")};
  color: ${({ $isSelected }) =>
    $isSelected ? Colors.neutral.light.light_4 : Colors.neutral.dark.dark_3};
`;

const DayWrapper = styled.TouchableOpacity<{
  $isToday: boolean;
  $isSelected: boolean;
}>`
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  padding: 2px;

  background-color: ${({ $isSelected, $isToday }) =>
    $isSelected
      ? Colors.highlight.highlight_0
      : $isToday
      ? Colors.support.green.green_2
      : Colors.neutral.light.light_4};

  border-radius: 4px;
`;

const HeaderText = styled.Text`
  margin-bottom: 16px;

  font-family: "Bold";
  font-size: 40px;
  color: ${Colors.text};
`;

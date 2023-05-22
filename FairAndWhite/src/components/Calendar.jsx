import {Box} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {useTheme} from 'native-base';
import moment from 'moment';
const water = {key: 'water', color: '#fff', selectedDotColor: 'blue'};
const lecture = {key: 'lecture', color: 'brown', selectedDotColor: '#FF0000'};
const stage = {key: 'stage', color: 'green'};
const GrowCalendar = ({handleFun, eventList, setTodayEvent}) => {
  const {colors} = useTheme();
  const [eventData, setEventData] = useState({});
  React.useEffect(() => {
    if (eventList !== undefined) {
      let temp = {};
      Object.keys(eventList).map(item => {
        temp[item] = {
          dots: [],
          selected: true,
          selectedColor: colors.primary[600],
        };
        if (moment(new Date()).format('YYYY-MM-DD') === item) {
          setTodayEvent(eventList[item].length);
        }
        eventList[item].map((event, index) => {
          if (index < 3) {
            if (event.type === 'water') {
              temp[item].dots.push(water);
            }
            if (event.type === 'lecture') {
              temp[item].dots.push(lecture);
            }
            if (event.type === 'stage') {
              temp[item].dots.push(stage);
            }
          }
        });
      });
      setEventData(st => {
        return {
          ...st,
          ...temp,
        };
      });

      console.log('================================eventData', eventData);
    }
  }, [eventList]);

  return (
    <Box borderRadius="20" overflow="hidden">
      <Calendar
        markingType={'multi-dot'}
        theme={{
          todayTextColor: colors.primary[600],
          // backgroundColor: '#000000',
          calendarBackground: colors.darkBg[400],
          textSectionTitleColor: colors.textGray[300],
          selectedDayTextColor: '#ffffff',
          selectedDayBackgroundColor: colors.primary[600],
          dayTextColor: colors.textGray[300],
          selectedDotColor: colors.secondary[400],
          arrowColor: colors.textGray[300],
          monthTextColor: colors.textGray[300],
          indicatorColor: 'red',

          textDayFontFamily: 'Urbanist',
          textMonthFontFamily: 'Urbanist',
          textDayHeaderFontFamily: 'Urbanist',
          textDayFontWeight: '300',
          textMonthFontWeight: '400',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
        onDayPress={day => {
          handleFun(day);
        }}
        // markedDates={{
        //   '2023-03-10': {
        //     dots: [
        //       {key: 'water', color: '#fff', selectedDotColor: '#fff'},
        //       {key: 'water', color: '#fff', selectedDotColor: '#fff'},
        //       {key: 'water', color: '#fff', selectedDotColor: '#fff'},
        //     ],
        //     selected: true,
        //     selectedColor: 'red',
        //   },
        //   '2023-01-26': {
        //     dots: [{key: 'water', color: '#02A4FF', selectedDotColor: 'blue'}],
        //     selected: true,
        //     selectedColor: 'red',
        //   },
        // }}
        markedDates={eventData}
        hideExtraDays={true}
        // style={{backgroundColor: 'black'}}
        // headerStyle={{backgroundColor: 'black'}}
      />
    </Box>
  );
};

export default GrowCalendar;

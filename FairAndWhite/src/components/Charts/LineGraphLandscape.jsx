import {HStack, Text, Box, Select, Center, Pressable} from 'native-base';
import React, {useState, useContext, useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import Orientation from 'react-native-orientation-locker';
import useSWR from 'swr';
import {useSelector} from 'react-redux';
import {ApiContext} from '../..';
import Loading from '../Loading';
import {dataFeatures} from '../../../config/config';
import {useWindowDimensions} from 'react-native';
import ArrowUp from '../../assets/svg/arrowUp.svg';
import ArrowDown from '../../assets/svg/arrowDown.svg';
import BackButton from '../BackButton';
import momentt from 'moment';

const LineGraphLandscape = ({route, navigation}) => {
  const {status} = useSelector(st => st.device);
  const api = useContext(ApiContext);
  const {title} = route.params;
  const {height, width} = useWindowDimensions();
  const [service, setService] = useState('7');

  React.useEffect(() => {
    Orientation.lockToLandscape();
    return () => Orientation.lockToPortrait();
  }, []);

  const {data, error, isLoading} = useSWR(
    {mac: status.MAC, range: service},
    api.getGraphRange,
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box flex="1" px="6" py="4" bg="darkBg.400">
      <HStack mb="2" alignItems="center" justifyContent="space-between">
        <BackButton onPress={() => navigation.goBack()} />
        <Text fontFamily="body" textAlign="left" fontWeight="500" fontSize="sm">
          {dataFeatures[title]}
        </Text>
        <Select
          placeholderTextColor="primary.600"
          color="primary.600"
          variant="unstyled"
          selectedValue={service}
          minWidth="70"
          dropdownCloseIcon={<ArrowDown />}
          dropdownOpenIcon={<ArrowUp />}
          accessibilityLabel="Select"
          placeholder="Select"
          _selectedItem={{
            bg: 'primary.600',
          }}
          mt={1}
          onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="Daily" value="daily" color="primary.400" />
          <Select.Item label="Weekly" value="weekly" />
          <Select.Item label="Monthly" value="monthly" />
        </Select>
      </HStack>

      <Center flexGrow="1" alignItems="center" justifyContent="center">
        <LineChart
          data={{
            labels: data.legends,
            datasets: [
              {
                data:
                  title === 'led_power'
                    ? data.lightIntensity
                    : title === 'temperature'
                    ? data.temperature
                    : title === 'humidity'
                    ? data.humidity
                    : data.waterLevel,
                color: (opacity = 1) => `rgba(194, 217, 58, 1)
              `,
                strokeWidth: 3, // optional
              },
            ],
            // legend: [`${dataFeatures[title]} Update`], // optional
          }}
          width={width > height ? width - 60 : height - 60}
          height={width < height ? width - 80 : height - 80}
          yAxisSuffix={
            title === 'led_power' ? '%' : title === 'temperature' ? 'F' : '%'
          }
          chartConfig={{
            decimalPlaces: 0,
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            backgroundColor: '#d9573a',
            strokeWidth: 3, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
            color: (opacity = 1) => `#C4C4C4`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForHorizontalLabels: {height: '2'},
            propsForDots: {
              r: '3',
              strokeWidth: '5',
              stroke: 'rgba(2, 160, 103, 1)',
            },
          }}
          withInnerLines={true}
          withOuterLines={false}
          fromZero={true}
          withVerticalLines={false}
          withShadow={false}
          segments={5}
          hideLegend={false}
          bezier
          //   withHorizontalLines
        />
      </Center>
    </Box>
  );
};

export default LineGraphLandscape;

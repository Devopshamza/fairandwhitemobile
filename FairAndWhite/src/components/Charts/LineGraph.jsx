import {HStack, Text, VStack, Box, Image, Center, Pressable} from 'native-base';
import React, {useEffect, useContext} from 'react';
import {LineChart} from 'react-native-chart-kit';
import useSWR from 'swr';
import {useSelector} from 'react-redux';
import {ApiContext} from '../..';
import Loading from '../Loading';
import {dataFeatures} from '../../../config/config';
import FilterSvg from '../../assets/svg/filter.svg';
import {Dimensions} from 'react-native';

const LineGraph = ({width, title, navigation}) => {
  const {status} = useSelector(st => st.device);
  const api = useContext(ApiContext);

  const {data, error, isLoading} = useSWR(
    {mac: status.MAC, range: 7},
    api.getGraphRange,
  );

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <VStack flex="1" px="6" py="2">
      <HStack alignItems="center" justifyContent="space-between">
        <Text
          fontFamily="body"
          textAlign="left"
          fontWeight="500"
          fontSize="sm"
          mb="2">
          {dataFeatures[title]}
        </Text>
        <Pressable
          p="2"
          onPress={() =>
            navigation.navigate('graphL', {
              title,
            })
          }>
          <FilterSvg width="15" height="15" fill="white" />
        </Pressable>
      </HStack>

      {/* <FormSelect
          placeholder="Select filter"
          options={filterOptions}
          color="white"
          variant="unstyled"
          key="name"
        /> */}
      <Box flex="1" alignItems="center" justifyContent="center">
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
          width={Dimensions.get('window').width - 40}
          height={250}
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
            color: (opacity = 1) => `#d9573a`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForHorizontalLabels: {height: '2'},
            propsForDots: {
              r: '3',
              strokeWidth: '5',
              stroke: 'rgba(2, 160, 103, 1)',
            },
          }}
          withInnerLines={false}
          withOuterLines={false}
          fromZero={true}
          withVerticalLines={true}
          withShadow={false}
          segments={5}
          hideLegend={false}
          bezier
          withHorizontalLines
        />
      </Box>
    </VStack>
  );
};

export default LineGraph;

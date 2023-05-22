import {Box, HStack, Heading, Image, Text} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, LayoutAnimation} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';

const ProgressGraph = ({width, title, value}) => {
  const [progressTime, setProgressTime] = useState(0);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // Define animation for chart
    Animated.timing(animationValue, {
      toValue: value / 100, // Value to graph
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Listen the animation variable and update chart variable
    animationValue.addListener(({value}) => {
      setProgressTime(value);
    });
  }, [value]);

  const progressConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(1, 159, 102, ${opacity})`,
    strokeWidth: 6, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <>
      <Box position="relative" width="50%">
        <ProgressChart
          data={{data: [progressTime]}}
          width={width - 20}
          height={210}
          strokeWidth={16}
          radius={90}
          chartConfig={progressConfig}
          hideLegend={true}
          style={{
            marginVertical: 8,
            borderRadius: 32,
          }}
        />

        <Box position="absolute" top="20%" left="90%">
          <Box h="16" w="16">
            <Image
              resizeMode="contain"
              height="full"
              alt="find device"
              source={require('../../assets/images/bulb.png')}
            />
          </Box>
          <Box>
            <HStack alignItems="flex-end" space="1">
              <Text color="white" fontSize="3xl" fontWeight="700">
                {value}
              </Text>
              <Text color="white" fontSize="lg" fontWeight="700" top="-5">
                {title === 'Temperature' ? 'F' : '%'}
              </Text>
            </HStack>
          </Box>
          <Text size="sm">{title} </Text>
        </Box>
      </Box>
    </>
  );
};

export default ProgressGraph;

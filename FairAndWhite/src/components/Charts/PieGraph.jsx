import React from 'react'
import { PieChart } from 'react-native-chart-kit';

const PieGraph = ({data, chartConfig, width}) => {
 
  return ( 
    <>
        <PieChart
          data={data}
          width={width}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"0"}
          center={[10, 10]}
          absolute
        />
    </> 
  )
}

export default PieGraph
import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const ChartScreen = ({ data, max, title }) => {
  const labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const toBarData = (data) => {
    const barData = [];
    data.forEach((element, index) => {
      barData.push({ value: element, label: labels[index], frontColor: '#177AD5' });
    });
    console.log(barData)
    return barData;
  };

  return (
    <React.Fragment>
      <Text style={{ color: "black" }}>{title}</Text>
      <BarChart
        data={toBarData(data)}
        barWidth={5} // Ajusté pour la largeur
        spacing={4.5} // Ajusté pour l'espacement entre les barres
        barBorderRadius={4}
        showGradient
        yAxisThickness={0}
        xAxisColor={'red'}
        yAxisTextStyle={{ color: 'white',fontSize : 14}}
        maxValue={max || 100} // Utiliser 'max' comme maxValue
        noOfSections={4}
        yAxisLabelTexts={['0', '25', '50', '75', '100']}
        labelWidth={31}
        
        xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center',fontSize : 7 }}
        backgroundColor={"#6bc5b5"}
        lineConfig={{
          color: '#F29C6E',
          thickness: 5,
          curved: true,
          hideDataPoints: true,
          shiftY: 5,
          initialSpacing: 0,
        }}
        isAnimated={true}
        isThreeD={true}
      />
    </React.Fragment>
  );
};

export default ChartScreen;

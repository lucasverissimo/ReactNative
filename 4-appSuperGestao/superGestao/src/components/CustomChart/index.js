import React, { useState } from 'react';
import { ContainerChart, ContainerGraficos } from './customChartStyle';

import { LineChart, Path, Grid, YAxis, XAxis } from 'react-native-svg-charts'

export default function CustomChart(props) {

    const Shadow = ({ line }) => (
        <Path
            key={'shadow'}
            y={0}
            d={line}
            fill={'none'}
            strokeWidth={4}
            stroke={'rgba(134, 65, 244, 0.2)'}
        />
      );

    return (
        <ContainerGraficos>            
            <ContainerChart>
            <YAxis
                data={props.yValue}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{
                    fill: 'grey',
                    fontSize: 12,
                }}
                numberOfTicks={5}
                formatLabel={(value) => `${value}`}
                style={{width: '5%', height: 200}}
            />
            <LineChart
                style={ { height: 200, width: '90%', marginLeft: 5, } }
                data={ props.yValue }                
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={ { top: 20, bottom: 20 } }
                yMax={30}
                yMin={0}
                xMax={props.xMax}
                xMin={0}                
            >
                <Grid />
                <Shadow/>
            </LineChart>            
            </ContainerChart>
            <XAxis
                data={props.yValue}
                contentInset={{ left: 15, right: 15 }}
                svg={{
                    fill: 'grey',
                    fontSize: 12,
                }}
                numberOfTicks={5}
                formatLabel={(value) => `${props.xValue[value]}`}
                style={{width: '95%', marginLeft: '5%', height: 60}}
            />
        </ContainerGraficos>
    );
}
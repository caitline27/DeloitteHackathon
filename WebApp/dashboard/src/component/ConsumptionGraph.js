import React, { Component } from 'react';
import CanvasJSReact from '../lib/canvasjs.react'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ConsumptionGraph extends Component {

    constructor(props) {
      super(props);
    }

    render() {
      const options = {
        title: {
          text: "Energy Consumption by Month (MW)"
        },
        height: 280,
        axisY: {
          gridThickness: 0,
        },
        axisX: {
          interval: 1,
        },
        data: [{				
          type: "column",
          indexLabel: "{y}",
          dataPoints: this.props.dataPoints
         }]
     }
          
     return (
        <div>
          <CanvasJSChart options = {options}/>
        </div>
      );
    }
  }

export default ConsumptionGraph;
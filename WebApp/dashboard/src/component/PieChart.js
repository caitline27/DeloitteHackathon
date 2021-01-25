import React, { Component } from 'react';
import CanvasJSReact from '../lib/canvasjs.react'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {

    constructor(props) {
      super(props);
    }

    render() {
      const options = {
        animationEnabled: true,
        backgroundColor: null,
        title: {
          text: "Test",
          fontColor: "white"
        },
        height: 380,
        axisY: {
          gridThickness: 0,
        },
        axisX: {
          interval: 1,
        },
        data: [{				
          type: "pie",
          indexLabel: "{label}: {y}%",
          indexLabelFontColor: "white",
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

export default PieChart;
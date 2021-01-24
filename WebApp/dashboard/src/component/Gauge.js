import { IgrRadialGaugeModule, IgrRadialGauge } from 'igniteui-react-gauges';
// import { IgrRadialGauge } from 'igniteui-react-gauges';
import React, { Component } from 'react';

IgrRadialGaugeModule.register();


class Gauge extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            gaugeValue: this.props.gaugeValue

        };
    }

    

    componentDidMount() {
         
    }

    // //whenever the component updates, this will be called --> maybe use this to get the gaugeValue
    // componentDidUpdate() {
    //     this.setState({
    //         "gaugeValue": document.getElementById("g").value()
    //     });
    //     console.log(this.state.gaugeValue);
    // }

    get value() {
        return this.state.gaugeValue;
    }

 

    render() {



        return (
       
            <IgrRadialGauge id="g"

                value={this.state.gaugeValue}
                isNeedleDraggingEnabled={true}
                isNeedleDraggingConstrained={true}
                needleBrush="DodgerBlue"
                needleOutline="DodgerBlue"
                needleEndExtent={0.475}
                needleStrokeThickness={1}
                needlePivotShape="CircleOverlay"
                needlePivotBrush="#9f9fa0"
                needlePivotOutline="#9f9fa0"
                needlePivotWidthRatio={0.2}
                needlePivotStrokeThickness={1}
                height="300px" width="300px"
                minimumValue={0}
                maximumValue={100} interval={10} />
               
            )
    }



    


}


export default Gauge;
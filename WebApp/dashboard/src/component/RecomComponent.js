import React, { Component } from 'react';
import Gauge from './Gauge.js';

const region = ["Alberta", "Montreal", "British Columbia", "New Brunswick", "Northwest Territories", "Nova Scotia", "Ontario", "Quebec"];
class RecomComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            gaugeValue: 50,
            BuySell: '',
            tradingAmount: 0,
            region: ''
        };
    }

    modifyRadioState = (event) => {
        console.log(event.target);

        this.setState({
            "BuySell": event.target.id
        });
    }

    modifyRegion = (event) => {
        this.setState({
            "region": event.target.value
        });
    }

    modifyAmount = (event) => {
        this.setState({
            "tradingAmount": event.target.value
        });
    }





    render() {

        return (
            <div className="col-12">

                <p className="instruction delimiter">Set your trade-off index between environmental and economic benefits, the amount of the electricity, and the city where you'd like to trade, and see our suggestion on how you should trade.</p>



                <div class="row align-items-center">
                    <div class="col-6">
                        <div class="row justify-content-center mb-4" >

                            <div className="box-label">
                                <input type="radio" id="buy" name="price" value="buy" onChange={this.modifyRadioState} />
                                <label htmlFor="buy" className="pr-2 pl-2">Buy</label>
                            </div>


                            <div className="box-label">
                                <input type="radio" id="sell" name="price" value="sell" onChange={this.modifyRadioState} />
                                <label htmlFor="sell" className="pl-2 pr-2">Sell</label>
                            </div>

                        </div>


                        <div class="row justify-content-center mb-4" onChange={this.modifyAmount}>
                            <input id="amount" type="text" className="form-control col-6 float-left" placeholder="the amount of electricity" />
                        </div>


                        <div class="row justify-content-center mb-4" onChange={this.modifyRegion}>
                            <select className="form-control col-6 float-left">
                                <option value="">Choose your region</option>
                                {region.map(ele => <option id="region" key={ele} value={ele}>{ele}</option>)}
                            </select>
                        </div>

                        <div class="justify-content-center">
                            <button class="btn btn-info btn-75" onClick={this.sendToAPI}>Check</button>

                        </div>
                    </div>

                    <div class="col-6">
                        <h3>trade-off index</h3>
                        <Gauge gaugeValue={this.state.gaugeValue} id="g" />
                        <p>someletter: {this.state.gaugeValue}</p>
                    </div>
                </div>





                <div class="row">
                    <div class="col-6">

                    </div>
                    <div class="col-6">
                        <div class="d-flex justify-content-start">
                            <p>Recommended Price :</p>
                            <p><strong>$20/MW</strong></p>
                        </div>
                        <div class="d-flex justify-content-start">
                            <p>Environmental Score : </p>
                            <p><strong> 80%</strong></p>
                        </div>
                    </div>
                </div>

            </div>



        )

    }
}


export default RecomComponent;
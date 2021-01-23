import React, { Component } from 'react';
import Gauge from './Gauge.js';

const region = ["Alberta", "Montreal", "British Columbia", "New Brunswick", "Northwest Territories", "Nova Scotia", "Ontario", "Quebec"];
class RecomComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            gaugeValue: 50
        };
    }

 
   
    render() {

        return (
            <>
                <div className="col-12 pb-5">

                    <h5 className="mb-4">What would you like to do?</h5>
                    <div className="pl-5">
                        <input type="radio" id="buy" name="price" value="buy"></input>
                        <label htmlFor="buy" className="pr-5 pl-2">Buy</label>
                        <input type="radio" id="sell" name="price" value="sell"></input>
                        <label htmlFor="sell" className="pl-2">Sell</label>
                    </div>
                    <div className="col-12 pt-4">
                        <select className="form-control col-3 float-left mr-5">
                            <option value="">Choose your region</option>
                            {region.map(ele => <option key={ele} value={ele}>{ele}</option>)}
                        </select>
                        <input type="text" className="form-control col-5 float-left" placeholder="Enter the amount you would like to trade" />
                    </div>
                </div>

                <div className="col-12 pl-2em mb-4">
                    <h6>What is your preference?</h6>

                    <Gauge gaugeValue={this.state.gaugeValue} />
                </div>
                <div className="pl-2em col-12 ">

                    <div className="d-flex justify-content-start">
                        <p>Recommended Price :</p>
                        <p><strong>$20/MW</strong></p>
                    </div>

                    <div className="d-flex justify-content-start">
                        <p>Environmental Score : </p>
                        <p><strong> 80%</strong></p>
                    </div>

                </div>
          
            </>

        )

    }
}


export default RecomComponent;
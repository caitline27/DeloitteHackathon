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
            region : ''
        };
    }


    


    modifyRadioState =(event) => {
        console.log(event.target);

        this.setState({
            "BuySell" : event.target.id
        });
    }

    modifyRegion = (event) => {
        this.setState({
            "region": event.target.value
        });
    }

    modifyAmount = (event) =>{
        this.setState({
            "tradingAmount": event.target.value
        });
    }


 

   
    render() {

        return (
            <div class="container border">


                <h5>What would you like to do?</h5>

                <div class="row align-items-center">
                    <div class="col-6 ">
                        <div class="row justify-content-center" >
                            <input type="radio" id="buy" name="price" value="buy" onChange={this.modifyRadioState} />
                            <label htmlFor="buy" className="pr-5 pl-2">Buy</label>
                            
                            <input type="radio" id="sell" name="price" value="sell" onChange={this.modifyRadioState} />
                            <label htmlFor="sell" className="pl-2">Sell</label>
                        </div>
                        <div class="row justify-content-center" onChange={this.modifyAmount}>
                            <input id="amount" type="text" className="form-control col-5 float-left" placeholder="Enter the amount you would like to trade" />
                        </div>
                        <div class="row justify-content-center" onChange={this.modifyRegion}>
                            <select className="form-control col-3 float-left mr-5">
                                <option value="">Choose your region</option>
                                {region.map(ele => <option id="region" key={ele} value={ele}>{ele}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div class="col-6">
                        <h6>What is your preference?</h6>    
                        <Gauge gaugeValue={this.state.gaugeValue}  />
                        <p>someletter</p>
                    </div>       
                </div>





                <div class="row">
                    <div class="col-6">
                        <button class="btn btn-info btn-75" onClick={this.sendToAPI}>Check</button>
                        
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
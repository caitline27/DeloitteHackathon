import React, { Component } from 'react';

const region = ["Alberta", "Montreal", "British Columbia", "New Brunswick", "Northwest Territories", "Nova Scotia", "Ontario", "Quebec"];
class RecomComponent extends Component {


    constructor(props) {
        super(props)
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
                    <div className="d-flex justify-content-between w-53">
                        <span>Cost</span>
                        <span>Environmental Score</span>

                    </div>
                    <div className="slidecontainer">
                        <input type="range" min="1" max="100" className="slider" id="myRange" />
                    </div>

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
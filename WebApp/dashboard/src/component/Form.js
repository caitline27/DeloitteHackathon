import React, { Component } from 'react';

import ConsumptionGraph from "./ConsumptionGraph"
import PieChart from "./PieChart"
import "./Form.css"
import axios from "axios"

const region_options = ["Bergen", "Kirstiansund", "Oslo", "Tromso", "Tronheim"];
// const testGraphData = [
//   { label: "Jan",  y: 10  },
//   { label: "Feb", y: 15  },
//   { label: "Mar", y: 25  },
//   { label: "Apr",  y: 30  },
//   { label: "May",  y: 28  },
//   { label: "Jun",  y: 10  },
//   { label: "Jul", y: 15  },
//   { label: "Aug", y: 25  },
//   { label: "Sep",  y: 30  },
//   { label: "Oct",  y: 28  },
//   { label: "Nov",  y: 56  },
//   { label: "Dec",  y: 28  }
// ]

function autoFitFontSize() {
  /* -------------------------------------------------------------------------- */
  // Auto stretch the font size of watt text display according to content
  var watt = document.getElementById("watt");
  if (watt != null) {
    watt.style.fontSize = "240px";
    var fSize = 300;
    do {
      watt.style.fontSize = fSize + "px";
      fSize -= 30;
    } while (watt.scrollWidth > watt.clientWidth);
    fSize -= 70
    watt.style.fontSize = fSize + "px";
  }
  /* -------------------------------------------------------------------------- */
}


class Form extends Component {

    constructor(props) {

    super(props)
    this.state = {
      region: '',
      date: '',
      isGraphVisible: false,
      factor_ratings: [],
      reserving_value: "0",
      loading: false
    }
  }

    handleChange = event => {

        if (event.target.tagName.toUpperCase() === "SELECT") {
            const region = event.target.value;
            this.setState({ region })
        } else {
            const { name, value } = event.target;
            this.setState({ [name]: value })
        }

    }


    formSubmit = (event) => {
        event.preventDefault();
        const { region, date } = this.state;
        this.setState({"loading" : true});

        const formData = {
            region: region,
            date: date
        }
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        if (region.length > 0 && date.length > 0) {

            axios.post("http://127.0.0.1:5000/reserve", formData, { headers: header }).then(res => {

                if (res) {
                    const { factor_ratings, reserving_value } = res["data"];
                    this.setState({ "factor_ratings": factor_ratings, reserving_value : (parseInt(reserving_value).toFixed(2)), isGraphVisible: true , loading : false })
                    autoFitFontSize();
                }
            }).catch(err => alert(err + ". Please enter proper date and city"));


        } else {
            alert("Please enter all the fields")
        }

    }


  render() {
    const { date, region, isGraphVisible } = this.state;
    window.onresize = function () { autoFitFontSize() };

    let styleSpinner = {
      width: '70px',
      height: '70px',
    };
        const aSpinner = (


            <div class="d-flex justify-content-center align-items-center m-3" >
                <div class="spinner-border" style={styleSpinner} role="status">

                </div>
            </div>
        );


    const wattValue = (
        <div className="watt-text">
          <p className="watt-value" id="watt">{this.state.reserving_value}</p>
        </div>
    )


    return (
      <>
        <div className="col-12">

          <p className="instruction delimiter">Use our ML model to predict of your electricity consumption</p>

          <div class="container">
            <div class="row">
              <div className="col-4">
                <form onSubmit={this.formSubmit} noValidate>

                                    <div className="mb-4">
                                        <select className="form-control col-10" value={region} onChange={this.handleChange}>

                                            <option value="">Choose your region</option>
                                            {region_options.map(ele => <option key={ele} value={ele}>{ele}</option>)}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <input type="date" className="form-control col-10" name="date" value={date} placeholder="date" onChange={this.handleChange} />
                                    </div>
                                    <div className="mb-4">
                                        <div className="col-10 d-flex justify-content-center">
                                            <button className="btn btn-info btn-75">Check</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-8 watt">
                                {this.state.loading ? aSpinner : wattValue}
                            </div>




                        </div>
                    </div>

                </div>

                {isGraphVisible &&
                    <div className="col-12 pb-5">
                        <div className="col-12 graph mx-auto graphContainer" >
                            <PieChart dataPoints={this.state.factor_ratings} />
                        </div>
                    </div>
                }
            </>
        )



    }



}


export default Form;
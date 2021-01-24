import React, { Component } from 'react';

import ConsumptionGraph from "./ConsumptionGraph"
import "./Form.css"
import axios from "axios"

const region = ["Alberta", "Montreal", "British Columbia", "New Brunswick", "Northwest Territories", "Nova Scotia", "Ontario", "Quebec"];
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
    fSize -= 30
    watt.style.fontSize = fSize + "px";
  }
  /* -------------------------------------------------------------------------- */
}


class Form extends Component {

  constructor(props) {

    super(props)
    this.state = {
      city: '',
      start_date: '',
      end_date: '',
      isGraphVisible: false,
      testGraphData: [],
      reserving_value: 0
    }
  }
  
  handleChange = event => {

    if (event.target.tagName.toUpperCase() === "SELECT") {
      const city = event.target.value;
      this.setState({ city })
    } else {
      const { name, value } = event.target;
      this.setState({ [name]: value })
    }

  }


  formSubmit = (event) => {
    event.preventDefault();
    const { city, start_date, end_date } = this.state;

    const formData = {
      city: city,
      start_date: start_date,
      end_date: end_date
    }
    const header = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    if (city.length > 0 && start_date.length > 0 && end_date.length > 0) {

      axios.post("http://127.0.0.1:5000/reserve", formData, { headers: header }).then(res => {

        if (res) {
          const { data, reserving_value } = res["data"];
          this.setState({ "testGraphData": data, reserving_value, isGraphVisible: true })
          autoFitFontSize();
        }
      });


    } else {
      alert("Please enter all the fields")
    }

  }

  render() {
    const { start_date, end_date, city, isGraphVisible } = this.state;
    window.onresize = function () { autoFitFontSize() };
    
    return (
      <>
        <div className="col-12">

          <p className="instruction mb-4">Select the date to see our ML prediction of how much electricity you should buy.</p>

          <div class="container">
            <div class="row">
              <div className="col-4">
                <form onSubmit={this.formSubmit} noValidate>

                  <div className="mb-4">
                    <select className="form-control col-10" value={city} onChange={this.handleChange}>

                      <option value="">Choose your region</option>
                      {region.map(ele => <option key={ele} value={ele}>{ele}</option>)}
                    </select>
                  </div>
                  <div className="mb-4">
                    <input type="date" className="form-control col-10" name="start_date" value={start_date} placeholder="start date" onChange={this.handleChange} />
                  </div>
                  <div className="mb-4">
                    <input type="date" className="form-control col-10" name="end_date" value={end_date} placeholder="start date" onChange={this.handleChange} />
                  </div>
                  <div className="mb-4">
                    <div className="col-10 d-flex justify-content-center">
                      <button className="btn btn-info btn-75">Check</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-8 watt">
                <div className="watt-text">
                  <p className="watt-value" id="watt">{this.state.reserving_value}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {isGraphVisible &&
          <div className="col-12 pb-5">
            <div className="col-12 graph mx-auto graphContainer" >
              <ConsumptionGraph dataPoints={this.state.testGraphData} />
            </div>
          </div>
        }
      </>
    )



  }



}


export default Form;
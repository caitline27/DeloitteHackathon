import React, { Component } from 'react';

import ConsumptionGraph from "./ConsumptionGraph"
import PieChart from "./PieChart"
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
        }
      });
    }else{
      alert("Please enter all the fields")
    }

  }

  render() {
    const { start_date, end_date, city, isGraphVisible } = this.state;
    return (
      <>
        <div className="col-12">

          <p className="instruction mb-4">Select the date to see our ML prediction of how much electricity you should buy.</p>

          <div className="col-4 float-left">
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
          <div className="col-8 float-left">

            <p className="watt-value">{this.state.reserving_value}</p>

          </div>
        </div>

        {isGraphVisible &&
          <div className="col-12 pb-5">
            <div className="col-12 graph mx-auto graphContainer" >
              <PieChart dataPoints={this.state.testGraphData} />
            </div>
          </div>
        }
      </>
    )



  }



}


export default Form;
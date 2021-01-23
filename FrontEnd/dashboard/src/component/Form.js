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

class Form extends Component {

  constructor(props) {

    super(props)
    this.state = {
      city: '',
      date: '',
      isGraphVisible: false,
      testGraphData:[],
      reserving_value:0
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

    axios.get("http://127.0.0.1:5000/reserve").then(res =>{

    if(res){
      const {data , reserving_value} = res["data"];
      this.setState({"testGraphData" : data , reserving_value,  isGraphVisible :true})
    }
    });
  }

  render() {
    const { date, city, isGraphVisible } = this.state;
    return (
      <>
        <div className="col-12">

        

          <h5 className="mb-4">How much electricity should you buy?</h5>

          <div className="col-4 float-left">
            <form onSubmit={this.formSubmit} noValidate>

              <div className="mb-4">
                <select className="form-control col-10" value={city} onChange={this.handleChange}>

                  <option value="">Choose your region</option>
                  {region.map(ele => <option key={ele} value={ele}>{ele}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <input type="date" className="form-control col-10" name="date" value={date} placeholder="start date" onChange={this.handleChange} />
              </div>
              <div className="mb-4">
                <div className="col-10 d-flex justify-content-center">
                  <button className="btn btn-info btn-75">Check</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-8 float-left">

            <p className="watt-value">{this.state.reserving_value} MW</p>

          </div>
        </div>

        {isGraphVisible &&
          <div className="col-12 pb-5">
            <div className="col-12 graph mx-auto graphContainer" >
              <ConsumptionGraph dataPoints={this.state.testGraphData}/>
            </div>
          </div>
        }
      </>
    )



  }



}


export default Form;
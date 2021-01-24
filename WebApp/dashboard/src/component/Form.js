import React, { Component } from 'react';

import ConsumptionGraph from "./ConsumptionGraph"
import "./Form.css"
import axios from "axios"


const region = ["Bergen","Kirstiansund","Oslo","Tromso","Tronheim"];
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
      testGraphData: [],
        reserving_watt_value: "---",
      loading : true
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
    const { city, date} = this.state;

    const formData = {
      city: city,
      date: date,
    }
    const header = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    if (city.length > 0 && date.length > 0 ) {

      
          axios.post("http://127.0.0.1:5000/reserve", formData, { headers: header }).then(res => {

            if (res) {
              const { data, reserving_watt_value } = res["data"];
              this.setState({ "testGraphData": data, reserving_watt_value, isGraphVisible: true })
            }
          });
    }else{
      alert("Please enter all the fields")
    }

  }

    render() {

        let styleSpinner = {
                        width: '70px',
                        height: '70px',
                    };


        const aSpinner = (

            
            <div class="d-flex justify-content-center align-items-center" >
                <div class="spinner-border" style={ styleSpinner} role="status">
                    
                </div>
            </div>
        );  




    const { date,  city, isGraphVisible } = this.state;
    return (
        <div className="container" >
            <div class="row">
                <p className="instruction mb-4">Select the date to see our ML prediction of how much electricity you should buy.</p>
            </div>

            <div class="row d-flex align-items-center">
                <div className="col-4">
                    <form onSubmit={this.formSubmit} noValidate>

                        <div className="mb-4">
                            <select className="form-control col-10" value={city} onChange={this.handleChange}>

                                <option value="">Choose your region</option>
                                {region.map(ele => <option key={ele} value={ele}>{ele}</option>)}
                            </select>
                        </div>
                        <div className="mb-4">
                            <input type="date" className="form-control col-10" name="date" value={date} placeholder="Date" onChange={this.handleChange} />
                        </div>
                        <div className="mb-4">
                            <div className="col-10 d-flex justify-content-center">
                                <button className="btn btn-info btn-75">Check</button>
                            </div>
                        </div>
                    </form>
                </div>


                <div className="col-8">
                    {this.state.loading ? aSpinner : <div> <p className="watt-value">{this.state.reserving_watt_value}</p></div>}
                </div>

            </div>

            {isGraphVisible &&
                <div className="col-12 pb-5">
                    <div className="col-12 graph mx-auto graphContainer" >
                        <ConsumptionGraph dataPoints={this.state.testGraphData} />
                    </div>
                </div>
            }

      </div>
    )



  }



}


export default Form;
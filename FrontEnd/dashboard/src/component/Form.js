import React, { Component } from 'react';

import "./Form.css"

const region = ["Alberta", "Montreal", "British Columbia", "New Brunswick", "Northwest Territories", "Nova Scotia", "Ontario", "Quebec"];
class Form extends Component {

  constructor(props) {

    super(props)
    this.state = {
      city: '',
      date: ''
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

    console.log(this.state);

  }

  render() {
    const { date, city } = this.state;
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

            <p className="watt-value">150 MW</p>

          </div>
        </div>

        <div className="col-12 pb-5">
          <div className="col-10 graph mx-auto" >
            <p className="text-center">TODO Consumption Graph</p>
            {/* TODO Graph */}
          </div>
        </div>
      </>
    )



  }



}


export default Form;
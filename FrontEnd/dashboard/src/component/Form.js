import React, {Component} from 'react';

import "./Form.css"


class Form extends Component{

constructor(props){

    super(props)
    this.state ={

    }
}

render(){
    return(
    // <div className="container">
    //   <div className="row dashboard-wrapper">
    //     <div className="col-12">
    //       <h3 className="pt-3 pb-5 text-center">Project Power</h3>
          <div className="">

            <div className="mb-4">
              <select className="form-control col-10">
                <option>Choose your region</option>
                <option>Alberta</option>
                <option>Toronto</option>
                <option>Montreal</option>
                <option>Manitoba</option>
                <option>Ottawa</option>
              </select>
            </div>
            <div className="mb-4">
              <input type="date" className="form-control col-10" placeholder="start date" />
            </div>
            <div className="mb-4">
              <input type="date" className="form-control col-10" placeholder="End date" />
            </div>
            <div className="mb-4">
              <div className="col-10 d-flex justify-content-center">
                <button className="btn btn-info btn-75">Check</button>
              </div>
            </div>
          </div>
    //     </div>
    //   </div>

    // </div>
    )


  
}

   

}


export default Form;
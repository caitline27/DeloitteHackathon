import './App.css';
import Form from './component/Form'

function App() {
  return (
    <div className="container">
      <div className="row dashboard-wrapper pl-5">
        <div className="col-12">
          <h3 className="pt-3 pb-5 text-center">Project Power</h3>
          <h5 className="mb-4">How much electricity should you buy?</h5>

          <div className="col-4 float-left">
            <Form />
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
              <option>Choose your region</option>
              <option>Alberta</option>
              <option>Toronto</option>
              <option>Montreal</option>
              <option>Manitoba</option>
              <option>Ottawa</option>
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
        <div className="pl-2em">

          <div className="d-flex justify-content-start">
            <p>Recommended Price :</p>
            <p><strong>$20/MW</strong></p>
          </div>

          <div className="d-flex justify-content-start">
            <p>Environmental Score : </p>
            <p><strong> 80%</strong></p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

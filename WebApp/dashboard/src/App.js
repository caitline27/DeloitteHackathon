import './App.css';
import Form from './component/Form';
import RecommendationComp from "./component/RecomComponent"

function App() {

  return (
    <div className="container">






      <div className="row dashboard-wrapper pl-5">
        <img src="logo.svg" width="60%" height="60%" class="center" />
        <br />


        {/* bootstrap tabs*/}
        <nav className="centered">

          <ul class="nav nav-tabs tabs-marker" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="predict" data-toggle="tab" href="#predict-tab" role="tab" aria-controls="predict" aria-selected="true">
                Predict
              <span class="marker"></span></a>

            </li>
            <li class="nav-item">
              <a class="nav-link" id="trade" data-toggle="tab" href="#trade-tab" role="tab" aria-controls="trade" aria-selected="false">
                Trade
              <span class="marker"></span></a>
            </li>
          </ul>


          <div className="row content-wrapper pl-5">
            <div class="tab-content" id="navTabs">
              <div class="tab-pane fade show active" id="predict-tab" role="tabpanel" aria-labelledby="predict-tab">
                <Form />
              </div>
              <div class="tab-pane fade" id="trade-tab" role="tabpanel" aria-labelledby="trade-tab">
                <RecommendationComp />
              </div>
            </div>
          </div>
        </nav>


      </div>
    </div>

  );
}


export default App;

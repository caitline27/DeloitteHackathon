import './App.css';
import Form from './component/Form';
import RecommendationComp from "./component/RecomComponent"

function App() {
  return (
    <div className="container">
      <div className="row dashboard-wrapper pl-5">
        <img src="logo.svg" width="60%" height="60%" class="center"/>
        <nav class="navline">
          <h3 className="pt-4 pb-5 text-center w-100">Project Power</h3>
        </nav>
        
        <Form />
        <RecommendationComp />
      </div>
    </div>

  );
}

export default App;

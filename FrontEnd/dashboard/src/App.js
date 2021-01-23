import './App.css';
import Form from './component/Form';
import RecommendationComp from "./component/RecomComponent"

function App() {
  return (
    <div className="container">
      <div className="row dashboard-wrapper pl-5">
        <h3 className="pt-4 pb-5 text-center w-100">Project Powergetic</h3>
        <Form />
        <RecommendationComp />
      </div>
    </div>

  );
}

export default App;

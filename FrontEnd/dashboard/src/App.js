import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App container">
        <div className="row dashboard-wrapper">
            <div className="col-12">
              <h3 className="pt-3">Heads in the Cloud</h3>
                <form>
                    <div className="form-group  col-3 float-left">
                      <input type="text" className="form-control" placeholder="Enter the city name"/> 
                    </div> 
                </form>
            </div>
        </div>
    
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Sign from './components/sign';
import Signup from './components/signup';


function App() {
  return (
    <div className="container mt-3">
      <div className="row">
        <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Sign} />
            <Route exact path='/signup' component={Signup} />
            {/* <Route exact path='/welcome' component={Welcome} /> */}
        </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

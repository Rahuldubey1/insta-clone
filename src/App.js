import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Sign from './components/sign';
import Signup from './components/signup';
import Home from './components/home';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid mt-3">
      <div >
      <ToastContainer autoClose={3000} closeButton={false} />
        <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Sign} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/home' component={Home} />
        </Switch>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

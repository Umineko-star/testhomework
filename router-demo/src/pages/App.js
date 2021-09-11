import { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route ,Switch } from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import NotFound from './NotFound';
import PrivateRoute from '../component/PrivateRoute';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
          <Route path='/' exact component={Login}></Route>
          <Route path='/Login' component={Login}></Route>        
          <Route path='/index'>
            <Home>
              <PrivateRoute />
            </Home>
          </Route>
          <Route component = {NotFound}/>
          </Switch>
        </div>       
      </Router>
    );
  }
}



export default App;

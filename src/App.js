import React, {Component} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Success from './components/Success';
import RegisterUser from './components/RegisterUser';

class App extends Component {
  state = {};

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    try {
      const username = localStorage.getItem("username");
      this.setState({username})
    }
    catch {}
  }

  render() {
    const { username } = this.state;
    console.log(username);
    return (
      <>
        <Header user={username}></Header>
  
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterUser} />
          <Route path="/success"
            render={props => {
              console.log(username);
              if (!localStorage.getItem("username")) {
                console.log(username);
                return <Redirect to="/login" />;
              }
              
                return <Success {...props} />;
              
            }} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Home} />
        </Switch>
      </>
    );
  }
  
}

export default App;

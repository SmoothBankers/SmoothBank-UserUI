import React, {Component} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import configureStore from './store/configureStore';
import {Provider } from 'react-redux';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Success from './components/Success';
import RegisterUser from './components/RegisterUser';
import CardTypeContainer from './components/CardTypeContainer';
import LoanTypeContainer from './components/LoanTypeContainer';
import LoanRegistration from './components/LoanRegistration';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CardRegistration from './components/CardRegistration';
import LoanConfirmationPage from './components/LoanConfirmationPage';
import CardConfirmationPage from './components/CardConfirmationPage';



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
    // console.log(username);
    return (
      <>
        <Provider store={configureStore()}>
        <Header user={username}></Header>
        <ToastContainer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterUser} />
          <Route path="/success"
            render={props => {
              // console.log(username);
              if (!localStorage.getItem("username")) {
                // console.log(username);
                toast.success("Please sign in first")
                return <Redirect to="/login" />;
              }
              
                return <Success {...props} />;
              
            }} />
          <Route path="/logout" component={Logout} />
          <Route path='/loans' component={LoanTypeContainer}/>
          <Route path='/cards' component={CardTypeContainer}/>
          <Route path='/registerForLoan' component = {LoanRegistration} />
          <Route path='/registerForCard' component = {CardRegistration} />
          <Route path='/confirmLoan' component = {LoanConfirmationPage} />
          <Route path='/confirmCard' component = {CardConfirmationPage} />
          <Route path="/" component={Home} />
          
        </Switch>
        </Provider>
      </>
    );
  }
  
}

export default App;

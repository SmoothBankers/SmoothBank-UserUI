import React from 'react';
import { connect } from 'react-redux';
import * as loanActions from '../actions/loanActions';
import LoanTypeContainer from './LoanTypeContainer';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {Provider } from 'react-redux';
import configureStore from '../store/configureStore'


class LoanContainer extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            loanType: 0,
            holderName: '',
            accountNumber: 0
        };

        this.loanDisplay = this.getLoanDisplay();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.afterSubmission = this.afterSubmission.bind(this);
        this.accountChange = this.accountChange.bind(this);
    }

    getLoanDisplay(){
        return (
        <Provider store={configureStore()}>
        <div>
            <LoanTypeContainer />
        </div>
        </Provider>)
    }

    handleChange(event){
        this.setState({
            loanType: event.target.value,            
            accountNumber: this.state.accountNumber,
            holderName: this.state.holderName
        });
    }

    handleSubmit(event) {
        return this.props.actions.createLoan(this.state.loanType, this.state.holderName, this.state.accountNumber);
    }

    afterSubmission(event){
        event.preventDefault();
    }

    nameChange(event){
        this.setState({
            holderName: event.target.value,
            loanType: this.state.loanType,
            accountNumber: this.state.accountNumber
        });
    }
    
    accountChange(event){
        this.setState({
            holderName: this.state.holderName,
            loanType: this.state.loanType,
            accountNumber: event.target.value
        });
    }

    render(){
        return(
            <div>
                {this.loanDisplay}
                <div style = {{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <form>
                        <label>
                            Loan  Type:
                            <input type="number" value={this.state.loanType} onChange={this.handleChange} />
                        </label>
                        <br />
                        <label>
                            Holder name:
                            <input type="text" value={this.state.holderName} onChange={this.nameChange}/>
                        </label>
                        <br />
                        <label>
                            Account num:
                            <input type="number" value={this.state.accountNumber} onChange={this.accountChange}/>
                        </label>
                        < br />
                        <input type="submit" value="Register" style = {{display:'flex', alignItems:'center', justifyContent:'center'}}></input>
                    </form>
                    </div>
            </div>
        );
    }

} 

function mapStateToProps(state){
    return {
      loanData: state.loanReducer.loanData
    }
}

function mapDispatchToProps(dispatch){
    return { 
        actions: bindActionCreators(loanActions, dispatch)
    }
}

LoanContainer.propTypes = {
    actions: PropTypes.object
};

export default connect( 
    mapStateToProps,
    mapDispatchToProps
    )(LoanContainer);

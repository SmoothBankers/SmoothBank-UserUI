import React from 'react';
import { connect } from 'react-redux';
import * as cardActions from '../actions/cardActions';
import CardTypeContainer from './CardTypeContainer';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {Provider } from 'react-redux';
import configureStore from '../store/configureStore'


class CardContainer extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            cardType: 0,
            holderName: '',
            accountNumber: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.afterSubmission = this.afterSubmission.bind(this);
        this.accountChange = this.accountChange.bind(this);
    }

    handleChange(event){
        this.setState({
            cardType: event.target.value,            
            accountNumber: this.state.accountNumber,
            holderName: this.state.holderName
        });
    }

    handleSubmit(event) {
        return this.props.actions.createCard(this.state.cardType, this.state.holderName, this.state.accountNumber);
    }

    afterSubmission(event){
        event.preventDefault();
    }

    nameChange(event){
        this.setState({
            holderName: event.target.value,
            cardType: this.state.cardType,
            accountNumber: this.state.accountNumber
        });
    }
    
    accountChange(event){
        this.setState({
            holderName: this.state.holderName,
            cardType: this.state.cardType,
            accountNumber: event.target.value
        });
    }

    render(){
        return(
            <div>
                <Provider store={configureStore()}>
                <div>
                    <CardTypeContainer />
                </div>
                <div style = {{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <form>
                        <label>
                            CardType:
                            <input type="number" value={this.state.cardType} onChange={this.handleChange} />
                        </label>
                        <br />
                        <label>
                            Holder name:
                            <input type="text" value={this.state.holderName} onChange={this.nameChange}/>
                        </label>
                        <br />
                        <label>
                            Account number:
                            <input type="number" value={this.state.accountNumber} onChange={this.accountChange}/>
                        </label>
                        < br />
                        <input type="submit" value="Register" style = {{display:'flex', alignItems:'center', justifyContent:'center'}}></input>
                    </form>
                    </div>
                    </Provider>
            </div>
        );
    }

} 

function mapStateToProps(state){
    return {
      cardData: state.cardReducer.cardData
    }
}

function mapDispatchToProps(dispatch){
    return { 
        actions: bindActionCreators(cardActions, dispatch)
    }
}

CardContainer.propTypes = {
    actions: PropTypes.object
};

export default connect( 
    mapStateToProps,
    mapDispatchToProps
    )(CardContainer);

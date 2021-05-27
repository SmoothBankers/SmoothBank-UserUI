import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as cardTypeActions from '../actions/cardTypeActions';
import CardTypeRender from './CardTypeRender';

const CardTypeContainer = (props) => {

    const { actions } = props; 

    useEffect(() => {
        actions.readCardTypes();
        // eslint-disable-next-line
    }, [actions.readCardTypes] );

   
    return(
        <div style = {{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <CardTypeRender {...props} />
        </div>
    );
}

function mapStateToProps(state){
    return {
        cardTypeData: state.cardTypeReducer.cardTypeData
    }
}

function mapDispatchToProps(dispatch){
    return { 
        actions: bindActionCreators(cardTypeActions, dispatch)
    }
}

CardTypeContainer.propTypes = {
    actions: PropTypes.object
};

export default connect( 
    mapStateToProps,
    mapDispatchToProps
    )(CardTypeContainer);

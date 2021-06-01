import React from 'react';
import PropTypes from 'prop-types';

const CardTypeRender = ({ cardTypeData }) => {

    function createCardTypeRow(cardType){
        return (
            <tr key={cardType.title}>
                <td> {cardType.title} </td>
                <td> {cardType.description} </td>
            </tr>
        );
    }

    let content = '';    
 
    if(!cardTypeData || cardTypeData.requestPending){
        content = (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div> 
            </div>
        );
    }
    

    if(cardTypeData && cardTypeData.requestSuccessful){
        //console.log(cardTypeData);
        const info = cardTypeData.types
        //console.log(info);
        content = 
            (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        { info.map(type => ( createCardTypeRow(type) ) ) }
                    </tbody>    
                </table>  
                <a href="/">Home</a> 
            </div>
            );
    }

    if(cardTypeData && cardTypeData.requestFailed){
        content = 
        (
            <div className="alert alert-danger" role="alert">
                Error while loading card types!
            </div>
        )
    }
        
    return(
        <div>
            <h1>Here are our different types of cards</h1>
            {content}
        </div>
    );
}

CardTypeRender.propTypes = {
    cardTypeData: PropTypes.object
};

export default CardTypeRender;

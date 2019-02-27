import React from 'react';
import './Tooltiptext.css';

const tooltiptext = (props) => {
    return (
        <div className="TooltiptextContainer">
            <span 
                className={"Tooltiptext" + (props.tooltiptext && props.active ?
                ' visible' : '')}>You have reached a ordering limit of 10 pieces per watch
            </span>
        </div>
    )
}

export default tooltiptext;
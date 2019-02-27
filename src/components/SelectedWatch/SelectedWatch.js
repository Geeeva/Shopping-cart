import React from 'react';
import Tooltiptext from '.././UI/Tooltiptext/Tooltiptext';
import './SelectedWatch.css';

const SelectedWatch = (props) => {
    return (
        
        <div className={"shopping-cart-product" + (props.selectedWatch.selectedWatchQuantity < 1 ? ' notDisplayed' : '')}>
            <Tooltiptext tooltiptext={props.tooltiptext} active={props.active} /> 
            <div className="product-info">
                <div>
                    <h3>{props.selectedWatch.selectedWatchName}</h3>
                    <p>${props.selectedWatch.selectedWatchPrice} &times; {props.selectedWatch.selectedWatchQuantity}</p>
                </div>
                <img src={props.selectedWatch.selectedWatchUrl} alt={props.numeration} />
            </div>
            <div className="product-count">
                <button onClick={props.onClickDecrement}>-</button>
                    <span>{props.selectedWatch.selectedWatchQuantity}</span>
                <button onClick={props.onClickIncrement}>+</button>
            </div>
        </div>
    );
}

export default SelectedWatch;

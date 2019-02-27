import React from 'react';

const enteredWatch = (props) =>  {
    return (
        <div className="product">
            <img alt='' src={props.enteredWatch.watchUrl}/>
        </div>
    );
}

export default enteredWatch;

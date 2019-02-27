import React, { Component } from 'react';
import Modal from '.././UI/Modal/ModalSelectedWatch';

class EnteredWatch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false
        }
    }

    /*Shows the modal*/

    detailsHandler = () => {
        this.setState({
            showModal: true
        })
    }

    /*Closes the modal*/

    closingHandler = () => {
        this.setState({
            showModal: false
        })
    }
    
    render() {
        return (
            <div className="product">
                <img src={this.props.enteredWatch.watchUrl} alt={this.props.enteredWatch.watchName}/>
                <p>{this.props.enteredWatch.watchName}</p>
                <p>${this.props.enteredWatch.watchPrice}</p>
                <button 
                    className="details-button"
                    onClick={this.detailsHandler}
                >
                Details
                </button>
                <Modal showModal={this.state.showModal} watch={this.props.enteredWatch} closing={this.closingHandler}/>
                <button className="buy-button" onClick={this.props.selected}>Buy</button>
            </div>
        );
    }
}

export default EnteredWatch;

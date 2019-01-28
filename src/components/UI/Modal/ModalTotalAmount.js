import React, {Component} from 'react';
import classes from './ModalTotalAmount.css';

class ModalTotalAmount extends React.Component {

	constructor(props) {
        super(props)

        this.state = {
            watch: [],
            showModal: false
        }
    }

	render() {
		return(
			<React.Fragment>
				<div className="Modal"
					style={{
						transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.showModal ? '1':'0'
					}}>
	                <p>Your purchase was successful!</p>
                    <button onClick={this.props.closing} className="btnClose">X</button>
				</div>
			</React.Fragment>
		);
	}
}                                                   
                                                               
export default ModalTotalAmount;
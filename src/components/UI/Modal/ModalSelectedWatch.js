import React, {Component} from 'react';
import classes from './ModalSelectedWatch.css';

class ModalSelectedWatch extends React.Component {

	constructor(props) {
        super(props)

        this.state = {
            showModal: false
        }
    }

	render() {

		return(
			<React.Fragment>
				<div className="ModalSelectedWatch"
					style={{
						transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.showModal ? '1':'0'
					}}>
	                <p>{this.props.watch.watchName}</p>
                    <img src={this.props.watch.watchUrl} />
                    <p>{this.props.watch.watchDescription}</p>

                    <button onClick={this.props.closing} className="btnClose">X</button>
				</div>
			</React.Fragment>
		);
	}
}                                                   
                                                               
export default ModalSelectedWatch;
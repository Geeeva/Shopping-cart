import React, { Component } from 'react';
import Survey from './Survey';
import Footer from '.././components/Footer/Footer';
import './App.css';
//import 'normalize.css';

class App extends Component {
    render() {
        return (
            <div className="App">
            	<div className="container-fluid">
                    <div className="container">
                    	<Survey />
                    </div>
                </div>
                <div className="container-fluid-second">
                    <div className="container">
                		<Footer />
                	</div>
                </div>
            </div>
        );
    }
}

export default App;

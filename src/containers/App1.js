import React, { Component } from 'react';
import EnteredWatch from '.././components/EnteredWatch/EnteredWatch1';
import './App.css';

class App1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: [],
            watchUrl: '',
            images: [], 
            watchUrlError: '', 
            enteredWatchList: [], 
            isError: false,            
            isButtonDisabled: false
        }
    }

    testImage = () => {
        return new Promise((resolve, reject) => {
            img.src = this.state.watchUrl;
            let img = new Image();
            img.onload = function() {
                resolve(img);
            };

            img.onerror = img.onabort = function() {
                reject()
            };
        });
    }

    async validate () {
        this.setState({
            errors: [],
            isError: false
        })

        let validated = this.testImage();

        await validated.then(() => {
            let watchUrl = this.state.watchUrl;
            console.log("ovo je watchUrl" + this.state.watchUrl);
            this.setState({
                enteredWatchList: this.state.enteredWatchList.concat({watchUrl}),
                watchUrl: '',
                watchUrlError: ''
            })
            console.log("This is from inner not an error");
        }).catch(() => {
                this.setState({
                    isError: true,
                    isButtonDisabled: true
                });
                if(this.state.watchUrl.length === 0) {
                    this.setState({
                        watchUrlError: 'Pls. enter an url',
                        watchUrl: ''
                    })

                console.log('This is watchUrl ' + this.state.watchUrl);
            }  else {
                    this.setState({
                    watchUrlError: 'Pls. enter a valid url',
                    watchUrl: ''
                })
            console.log("This is from inner an error!" + this.state.errors);
            }
        })
        console.log("Ovo je stanje za isError " + this.state.isError);
    }

    submitHandler (event) {
        event.preventDefault();
        this.validate();
    }

    render() {
        const enteredWatches = this.state.enteredWatchList.map((enteredWatch, index) => {          
            return <EnteredWatch
                key={index}
                enteredWatch={enteredWatch}
                />
        });

        return (
            <div className="App">
            	<div className="container-fluid">
                    <div className="container">
                        <div className="add-product">
                           <form>
                                 <div>
                                    <label>Product image:</label>
                                    <input 
                                        type="text" 
                                        placeholder="http://...jpg"
                                        value={this.state.watchUrl}
                                        onChange={event => this.setState({watchUrl: event.target.value})}
                                    />
                                </div>

                                {/* Notification WatchUrlError */}
                                <div className="WatchUrlError">
                                    <span 
                                        className={"tooltiptext" + 
                                        (this.state.watchUrlError === "Pls. enter an url" || this.state.watchUrlError === "Pls. enter a valid url" 
                                        ? ' visible' : '')}>{this.state.watchUrlError}</span>
                                </div>
                             
                                <button
                                    type="submit"
                                    onClick={event => this.submitHandler(event)}
                                >
                                    Add URL
                                </button>
                            </form>
                         </div>
                         
                         <div className="list-products">
                            {enteredWatches}
                        </div>
                         
                        <div className="shopping-cart">
                            <div className="shopping-cart-products">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App1;
import React, { Component } from 'react';
import EnteredWatch from '.././components/EnteredWatch/EnteredWatch1';
import './App.css';

class App1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: [], 
            watchUrl: '',
            watchUrlError: '', 
            enteredWatchList: [], 
            isError: false,           
            isButtonDisabled: false,            
            testImageResult: false
        }
    }

          testImage = (url/*, timeoutT*/) => {
            return new Promise((resolve, reject) => {
                  //let timeout = timeoutT || 1000;
                  //let timer, img = new Image();

                      let img = new Image();
                      img.onerror = img.onabort = function() {
                          //clearTimeout(timer);
                            reject(false);
                      };
                      img.onload = function() {
                           //clearTimeout(timer);
                           resolve(true);
                      };
                      /*timer = setTimeout(function() {
                          img.src = "//!!!!/noexist.jpg";
                          reject("error");
                      }, timeout); */

                      img.src = url;

                      console.log(img)

                });
        }

        validate = () =>  {

            let isError = false;
            let errors = {};

            this.testImage(this.state.watchUrl)
                .then(fromResolve => {
                    this.setState({
                        testImageResult: fromResolve,
                        isError: false
                    })
                })
                .catch(fromReject => {
                    this.setState({
                        testImageResult: fromReject,
                        isError: true
                    })
                });
            
            if(this.state.watchUrl.length === 0){
                isError = true;
                errors.watchUrlError = 'Pls. enter an url';
            } else if(!this.state.testImageResult){
                isError = this.state.isError;
                errors.watchUrlError = 'Pls. enter a valid url';       
            }
              else {
                errors.watchUrlError = '';
            }
     
            if(isError){
                this.setState({
                    ...errors
                })  
            } 

            console.log("This is testImageResult " + this.state.testImageResult);
            return isError;
        }

    /*Submit the form on button press and fills the array enteredWatchList with objects*/

    submitHandler = (event) => {

        event.preventDefault();
        let watchUrl = this.state.watchUrl;
        this.setState({
            isButtonDisabled: false
        })
 
        const err = this.validate();
        console.log("Err is " + err);

        if(err === false) {
            this.setState({
                enteredWatchList: this.state.enteredWatchList.concat({watchUrl}),
                watchUrl: ''
            })            
        } else {
            this.setState({
                isButtonDisabled: true
            })
            console.log("Button is " + this.state.isButtonDisabled);
        }
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
                                    disabled={this.state.isButtonDisabled}
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

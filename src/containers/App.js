import React, { Component } from 'react';
import EnteredWatch from '.././components/EnteredWatch/EnteredWatch';
import SelectedWatch from '.././components/SelectedWatch/SelectedWatch';
import Modal from '.././components/UI/Modal/ModalTotalAmount';
import './App.css';
import 'normalize.css';
const isImageUrl = require('is-image-url');

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isError : true, 
            errors: [], 
            watchName: '',
            watchNameError: '', 
            watchDescription: '',
            watchDescriptionError: '',
            watchUrl: '',
            watchUrlError: '',
            watchPrice: '',
            watchPriceError: '',
            isButtonDisabled: false, 
            watchId: '',
            watchAmount: '',
            watchQuantity: 1, 
            enteredWatchList: [],
            selectedWatchList: [],
            activeIndex: '',
            tooltiptext: false, 
            totalAmount: 0,
            showModal: false,
        }
    }

        validate = () => {
  
        let errors = [];    
        let isError = false;
        let watchUrl = this.state.watchUrl;

        if(this.state.watchName.length === 0) {
            errors.watchNameError = 'Pls. enter a product name';
            isError = true;
        } else {
            errors.watchNameError = '';
            this.setState({
                watchName: ''
            })
        }

        if(this.state.watchDescription.length === 0) {
            errors.watchDescriptionError = 'Pls. enter a watch description';
            isError = true;
        } else {
            errors.watchDescriptionError = '';
            this.setState({
                watchDescription: ''
            })
        }

        if(this.state.watchUrl.length === 0) {
            errors.watchUrlError = 'Pls. enter an url';
            isError = true;
        } else if(isImageUrl(this.state.watchUrl) === false){
            errors.watchUrlError = 'Pls. enter a valid url';
            isError = true;
        } else {
            this.setState({
                enteredWatchList: this.state.enteredWatchList.concat({watchUrl}),
                watchUrl: ''
            })
            errors.watchUrlError = '';
        }

        if(this.state.watchPrice.length === 0) {
            errors.watchPriceError = 'Pls. enter a watch price';
            isError = true;
        } else {
            errors.watchPriceError = '';
            this.setState({
                watchPrice: ''
            })
        }
            errors.concat(this.state.watchUrlError);
            this.setState({
                ...errors
            })  

        return isError;
    }

    /*Submit the form on button press and fills the array enteredWatchList with objects*/

    submitHandler = (event) => {

        event.preventDefault();
        const err = this.validate();

        if(err === false) {
            let watchName = this.state.watchName;
            let watchDescription = this.state.watchDescription;
            let watchUrl = this.state.watchUrl;
            let watchPrice = this.state.watchPrice;
            let watchQuantity = 1;
            let watchAmount = watchPrice * watchQuantity;
            let watchId = Math.floor((Math.random() * 100) + 1);

            this.setState({
                enteredWatchList: this.state.enteredWatchList.concat({watchName, watchUrl, watchDescription, watchPrice, watchQuantity, watchAmount, watchId})
            })          
        } 
    }

    /*Checks if selectedWatchName is already entered in selectedWatchList and compares with element from enteredWatchList, if not exists, adds it and other realted
    fileds to selectedWatchList*/
     
    add = (selectedWatchName, selectedWatchUrl, selectedWatchDescription, selectedWatchPrice, selectedWatchQuantity, selectedWatchAmount, selectedWatchId) => {
        
        let arr = this.state.selectedWatchList;

        let found = arr.some(el => {
            return el.selectedWatchName === selectedWatchName;
        });

        if (!found) { 
            let selectedWatchAmount = selectedWatchPrice * selectedWatchQuantity;
            return arr.concat({selectedWatchName, selectedWatchUrl, selectedWatchDescription, selectedWatchPrice, selectedWatchQuantity, selectedWatchAmount, selectedWatchId});
        } else {
            return this.state.selectedWatchList;
        }
    }

    /*Adds the entered data about watch in array of objects selectedWatchList, by previously calling add function*/

    buyWatchHandler = (selectedWatchName, selectedWatchUrl, selectedWatchDescription, selectedWatchPrice, selectedWatchQuantity, selectedWatchAmount, selectedWatchId) => {

        let arr = this.add(selectedWatchName, selectedWatchUrl, selectedWatchDescription, selectedWatchPrice, selectedWatchQuantity, selectedWatchAmount, selectedWatchId);
        
        this.setState({
            selectedWatchList: arr
        });
    }

    /*Incerases the quantity per watch wim max.of 10, with the activation of tooltiptext above 10*/

    increaseAmountHandler = (watchId, indexOfObject, watchQuantity, watchAmount) => {

        if(watchQuantity < 1) {
            let updatedWatchListObject = this.state.selectedWatchList[indexOfObject];
            updatedWatchListObject.selectedWatchQuantity = 0;
            updatedWatchListObject.selectedWatchAmount = 0;
            let updatedWatchList = this.state.selectedWatchList;
            updatedWatchList.splice(indexOfObject, 1, updatedWatchListObject);
            
            this.setState({
                activeIndex: indexOfObject,
                tooltiptext: false, 
                selectedWatchList: updatedWatchList
            });
            return;

        } else if (watchQuantity >= 10){
            let updatedWatchListObject = this.state.selectedWatchList[indexOfObject];
            updatedWatchListObject.selectedWatchQuantity = 10;
            updatedWatchListObject.selectedWatchAmount = this.state.selectedWatchList[indexOfObject].selectedWatchPrice * this.state.selectedWatchList[indexOfObject].selectedWatchQuantity;
            let updatedWatchList = this.state.selectedWatchList;
            updatedWatchList.splice(indexOfObject, 1, updatedWatchListObject);

            this.setState({
                activeIndex: indexOfObject,
                tooltiptext: true,
                selectedWatchList: updatedWatchList
            });
            return;
        }

        let updatedWatchListObject = this.state.selectedWatchList[indexOfObject];
        updatedWatchListObject.selectedWatchQuantity = this.state.selectedWatchList[indexOfObject].selectedWatchQuantity + 1;
        updatedWatchListObject.selectedWatchAmount = this.state.selectedWatchList[indexOfObject].selectedWatchPrice * this.state.selectedWatchList[indexOfObject].selectedWatchQuantity;
        let updatedWatchList = this.state.selectedWatchList;
        updatedWatchList.splice(indexOfObject, 1, updatedWatchListObject);

        this.setState({
            activeIndex: indexOfObject,
            selectedWatchList: updatedWatchList
        })
        let totalAmount = this.state.selectedWatchList.reduce((accumulator, el) => {
            return accumulator + el.selectedWatchAmount;
        },0);

        this.setState({
            activeIndex: indexOfObject,
            tooltiptext: false,
            totalAmount : totalAmount,
        })
    }

    /*Decreases the quantity per watch with min.of a, when 0 item disappears from list of selected watches*/

    decreaseAmountHandler = (watchId, indexOfObject, watchQuantity, watchAmount) => {

        if(watchQuantity < 1) {
            let updatedWatchListObject = this.state.selectedWatchList[indexOfObject];
            updatedWatchListObject.selectedWatchQuantity = 0;
            updatedWatchListObject.selectedWatchAmount = 0;
            let updatedWatchList = this.state.selectedWatchList;
            updatedWatchList.splice(indexOfObject, 1, updatedWatchListObject);
            
            this.setState({
                activeIndex: indexOfObject,
                selectedWatchList: updatedWatchList
            });
            let totalAmount = this.state.selectedWatchList.reduce((accumulator, el) => {
            return accumulator + el.selectedWatchAmount;},0);

            this.setState({
                activeIndex: indexOfObject,
                tooltiptext: true,
                totalAmount : totalAmount
            })
            return;

        } else if (watchQuantity >= 10){
            let updatedWatchListObject = this.state.selectedWatchList[indexOfObject];
            updatedWatchListObject.selectedWatchQuantity = 9;
            updatedWatchListObject.selectedWatchAmount = this.state.selectedWatchList[indexOfObject].selectedWatchPrice * this.state.selectedWatchList[indexOfObject].selectedWatchQuantity;
            let updatedWatchList = this.state.selectedWatchList;
            updatedWatchList.splice(indexOfObject, 1, updatedWatchListObject);

            this.setState({
                activeIndex: indexOfObject,
                selectedWatchList: updatedWatchList,
                tooltiptext: false
            });
            let totalAmount = this.state.selectedWatchList.reduce((accumulator, el) => {
                return accumulator + el.selectedWatchAmount;
            },0);

            this.setState({
                activeIndex: indexOfObject,
                tooltiptext: false, 
                totalAmount : totalAmount
            })
            return;
        }

        let updatedWatchListObject = this.state.selectedWatchList[indexOfObject];
        updatedWatchListObject.selectedWatchQuantity = this.state.selectedWatchList[indexOfObject].selectedWatchQuantity - 1;
        updatedWatchListObject.selectedWatchAmount = this.state.selectedWatchList[indexOfObject].selectedWatchPrice * this.state.selectedWatchList[indexOfObject].selectedWatchQuantity;
        let updatedWatchList = this.state.selectedWatchList;
        updatedWatchList.splice(indexOfObject, 1, updatedWatchListObject);

        this.setState({
            selectedWatchList: updatedWatchList,
            activeIndex: indexOfObject
        })

        let totalAmount = this.state.selectedWatchList.reduce((accumulator, el) => {
            return accumulator + el.selectedWatchAmount;
        },0);

        this.setState({
            activeIndex: indexOfObject,
            totalAmount : totalAmount
        })
    }

    /*Sums up the total quantity of watches*/

    summaryHandler = () => {

        if(this.state.totalAmount > 0) {
            this.setState({
                showModal: true
            })
        }
    }

    /*Closes the modal*/
    
    closingHandler = () => {
        
        this.setState({
            showModal: false
        })
    }

    render() {

        const enteredWatches = this.state.enteredWatchList.map((enteredWatch, index) => {          
            let startQuantity = 1;
            return <EnteredWatch
                key={index}
                startQuantity={startQuantity}
                enteredWatch={enteredWatch}
                selected={this.buyWatchHandler.bind(this, enteredWatch.watchName, enteredWatch.watchUrl,
                    enteredWatch.watchDescription, enteredWatch.watchPrice, startQuantity, enteredWatch.watchId)}
                />
        });

        const selectedWatches = this.state.selectedWatchList.map((selectedWatch, index) => {
            const active = this.state.activeIndex;
            const tooltiptext = this.state.tooltiptext;
            return <SelectedWatch
                key={index}
                active={index === active} 
                tooltiptext={tooltiptext}
                numeration={index}
                selectedWatch={selectedWatch}
                onClickIncrement={() => {this.increaseAmountHandler(selectedWatch.selectedWatchId, index, selectedWatch.selectedWatchQuantity, selectedWatch.selectedWatchPrice);}} 
                onClickDecrement={() => {this.decreaseAmountHandler(selectedWatch.selectedWatchId, index, selectedWatch.selectedWatchQuantity, selectedWatch.selectedWatchPrice);}}  
            />
        });

        return (
            <div className="App">
            	<div className="container-fluid">
                    <div className="container">
                        <div className="add-product">
                           <form>
                                <div>
                                    <label>Product name:</label>
                                    <input 
                                        type="text" 
                                        placeholder="Casio Watch" 
                                        required
                                        value={this.state.watchName}
                                        onChange={event => this.setState({watchName: event.target.value})}
                                    />
                                </div>

                                {/* Notification WatchNameError */}
                                <div className="WatchNameError">
                                    <span 
                                        className={"tooltiptext" + (this.state.watchNameError === "Pls. enter a product name" ?
                                         ' visible' : '')}>{this.state.watchNameError}</span>
                                </div>
                             
                                <div>
                                    <label>Product description:</label>
                                    <textarea 
                                        placeholder="Sample description..."
                                        value={this.state.watchDescription}
                                        onChange={event => this.setState({watchDescription: event.target.value})}
                                    >
                                    </textarea>
                                </div>

                                {/* Notification WatchDescriptionError */}
                                <div className="WatchDescriptionError">
                                    <span 
                                        className={"tooltiptext" + (this.state.watchDescriptionError === "Pls. enter a watch description" ?
                                         ' visible' : '')}>{this.state.watchDescriptionError}</span>
                                </div>
                             
                                <div>
                                    <label>Product image:</label>
                                    <input 
                                        type="text" 
                                        placeholder="http://...jpg"
                                        required
                                        value={this.state.watchUrl}
                                        onChange={event => this.setState({watchUrl: event.target.value})}
                                    />
                                </div>

                                {/* Notification WatchUrlError */}
                                <div className="WatchUrlError">
                                    <span 
                                        className={"tooltiptext" + (this.state.watchUrlError === "Pls. enter an url" || this.state.watchUrlError === "Pls. enter a valid url" ?
                                         ' visible' : '')}>{this.state.watchUrlError}</span>
                                </div>
                             
                                <div>
                                    <label>Product price:</label>
                                    <input 
                                        type="number" 
                                        min="0" 
                                        placeholder="33" 
                                        required
                                        value={this.state.watchPrice}
                                        onChange={event => this.setState({watchPrice: event.target.value})}
                                    />
                                </div>

                                 {/* Notification WatchPriceError */}
                                <div className="WatchPriceError">
                                    <span 
                                        className={"tooltiptext" + (this.state.watchPriceError === "Pls. enter a watch price" ?
                                         ' visible' : '')}>{this.state.watchPriceError}</span>
                                </div>
                             
                                <button
                                    type="submit"
                                    onClick={event => this.submitHandler(event)}
                                >
                                    Add a new Task
                                </button>
                            </form>
                         </div>
                         
                         <div className="list-products">
                            {enteredWatches}
                        </div>
                         
                        <div className="shopping-cart">
                            <div className="shopping-cart-products">
                                {selectedWatches}
                            </div>
                            <div className="shopping-cart-summary">
                                <div>Total: <b>${this.state.totalAmount}</b></div>
                                <div><button onClick={this.summaryHandler}>Purchase</button></div>
                                <Modal showModal={this.state.showModal} watch={this.props.enteredWatch} closing={this.closingHandler}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

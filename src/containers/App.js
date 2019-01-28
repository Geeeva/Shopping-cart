import React, { Component } from 'react';
import EnteredWatch from '.././components/EnteredWatch/EnteredWatch';
import SelectedWatch from '.././components/SelectedWatch/SelectedWatch';
import Modal from '.././components/UI/Modal/ModalTotalAmount';
import './App.css';
import 'normalize.css';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            watchName: '',
            watchDescription: '',
            watchUrl: '',
            watchPrice: '',
            watchId: '',
            watchAmount: '',
            watchQuantity: 1, 
            enteredWatchList: [],
            selectedWatchName: '',
            selectedWatchDescription: '',
            selectedWatchUrl: '',
            selectedWatchPrice: '',
            selectedWatchId: '',
            selectedWatchAmount: '', 
            selectedWatchQuantity: 1,
            selectedWatchList: [],
            activeIndex: '',
            tooltiptext: false, 
            totalAmount: 0,
            showModal: false
        }
    }

    submitHandler = (event) => {

        event.preventDefault();
        
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
     
    add = (selectedWatchName, selectedWatchUrl, selectedWatchDescription, selectedWatchPrice, selectedWatchQuantity, selectedWatchAmount, selectedWatchId) => {
        //console.log(this.state.selectedWatchList);
        let arr = this.state.selectedWatchList;

        let found = arr.some(el => {
            return el.selectedWatchName === selectedWatchName;
        });
        //console.log(found);
        if (!found) { 
            let selectedWatchAmount = selectedWatchPrice * selectedWatchQuantity;
            return arr.concat({selectedWatchName, selectedWatchUrl, selectedWatchDescription, selectedWatchPrice, selectedWatchQuantity, selectedWatchAmount, selectedWatchId});
        } else {
            return this.state.selectedWatchList;
        }
        console.log(arr);
    }

    buyWatchHandler = (selectedWatchName, selectedWatchUrl, selectedWatchDescription, selectedWatchPrice, selectedWatchQuantity, selectedWatchAmount, selectedWatchId) => {

        let arr = this.add(selectedWatchName, selectedWatchUrl, selectedWatchDescription, selectedWatchPrice, selectedWatchQuantity, selectedWatchAmount, selectedWatchId);
        
        this.setState({
            selectedWatchList: arr
        });
        console.log(this.state.selectedWatchList);
    }

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

    summaryHandler = () => {

        if(this.state.totalAmount > 0) {
            this.setState({
                showModal: true
            })
        }
    }
    
    closingHandler = () => {
        
        this.setState({
            showModal: false
        })
    }

    render() {

        /*src="https://sc02.alicdn.com/kf/HTB1gHRfg6uhSKJjSspmq6AQDpXaI/Accept-Sample-Design-Your-Own-Blank-Wrist.jpg_350x350.jpg"*/
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
                             
                                <div>
                                    <label>Product description:</label>
                                    <textarea 
                                        placeholder="Sample description..."
                                        value={this.state.watchDescription}
                                        onChange={event => this.setState({watchDescription: event.target.value})}
                                    >
                                    </textarea>
                                </div>
                             
                                <div>
                                    <label>Product image:</label>
                                    <input 
                                        type="text" 
                                        placeholder="http://...jpg"
                                        value={this.state.watchUrl}
                                        pattern="https?://.+" required
                                        onChange={event => this.setState({watchUrl: event.target.value})}
                                    />
                                </div>
                             
                                <div>
                                    <label>Product price:</label>
                                    <input 
                                        type="number" 
                                        min="0" 
                                        placeholder="33" 
                                        value={this.state.watchPrice}
                                        onChange={event => this.setState({watchPrice: event.target.value})}
                                    />
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
                            <ul>
                               {enteredWatches}
                            </ul> 
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

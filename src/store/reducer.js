const initialState = {
    totalSum: 0,
};

const reducer = (state = initialState, action) => {
  const newState = {...state};

  if(action.type === 'DECREASE') {
        if(this.state.totalSum === 0) {
            this.setState({
                watchQuantity: 0,
                watchPrice: 0
            })
            return;
        } else if (this.state.watchQuantity > 10){
            this.setState({watchQuantity: 10,
                watchPrice: this.state.selectedWatchPrice * this.state.watchQuantity
            })
            return;
        }

        this.setState({
            watchQuantity: this.state.watchQuantity - 1,
            watchPrice: this.state.selectedWatchPrice * this.state.watchQuantity
        })
    newState.age++;
  }
  
  if(action.type === 'INCREASE') {
    newState.age--;
  }

  return newState;
}

export default reducer;

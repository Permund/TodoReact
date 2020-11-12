import { render } from '@testing-library/react'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './counter.css'


class CounterButton extends Component{

    //Define the inital state in a constructor
    //state => counter = 0
    constructor(){
        super();

        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)

    }
    render() {
    // let style = {fontSize: "50px", padding: "15px 30px"};
    return(
        <div className="CounterButton">
            <button onClick={ () => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
            <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
        </div>

    )
}

increment() { //Update state
    //console.log('increment');
    //this.state.counter++; //BAd Practice


    this.props.incrementMethod(this.props.by);
}

decrement(){

    this.props.decrementMethod(this.props.by)
}

}
CounterButton.defaultProps = {
    by : 1,
}

CounterButton.propTypes = {
    by: PropTypes.number

}

export default CounterButton
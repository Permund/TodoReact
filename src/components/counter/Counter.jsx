import { render } from '@testing-library/react'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './counter.css'
import CounterButton from './CounterButton';

import ResetButton from './ResetButton';


class Counter extends Component{

    constructor(){
        super();
        this.state = {
            counter : 0

        }

        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)

    }

    render() {
        return (
          <div className="counter">
            <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by = {5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by = {10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <span className="count">{this.state.counter}</span>


            <div>
            <ResetButton reset = "Reset" resetMethod={this.reset} decrementMethod={this.decrement}>
                </ResetButton>
            </div>
    
            </div>
    
        );
      }

      increment(by) { //Update state
       // console.log(`increment from parent - ${by}`)
        this.setState( (prevState) => {
                return {counter: prevState.counter + by}
            });
    }

    decrement(by){
        this.setState( (prevState) => {
            return {counter: prevState.counter - by}
        });
}
    

    reset(){
        this.setState({
             counter: 0
        })
    }


}



export default Counter;


import { render } from '@testing-library/react'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './counter.css'

class ResetButton extends Component{

    constructor(){
        super();

        this.reset = this.reset.bind(this)

    }

    render(){

        return(
            <div className="ResetButton">
                <button className = "reset" onClick={this.reset}>{this.props.reset}</button>
            </div>
    
        )



    }

    reset(){
        this.props.resetMethod();
    }
}

export default ResetButton;
import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { stringToArray, infixToSuffix, suffixResult } from "./lib"
import { inputAction, claerAction, runAction, backSpaceAction } from './store/actionCreators'
import store from './store'
import 'antd/dist/antd.css'
import './Calculator.css'
import { KEY } from './KEY'

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }
    storeChange() {
        this.setState(store.getState())
    }
    input(count) {
        var action = null;
        switch (count) {
            case "C": action = claerAction(); break;
            case "=": {
                let result = suffixResult(infixToSuffix(stringToArray(this.state.equation)))
                action = runAction(result);
                break;
            }
            case "<-": {
                action = backSpaceAction();
                break;
            }
            default:
                action = inputAction(count)
                break;
        }
        store.dispatch(action)
        this.storeChange()
    }

    render() {
        var buttonList = [];
        KEY.forEach((value, index) => {
            if ((index + 1) % 4 === 0) {
                buttonList.push(
                    <span key={index}><Button className="button" style={value.style} onClick={this.input.bind(this, value.value)}>{value.value}</Button><br /></span>
                )
            } else {
                buttonList.push(
                    <span key={index}><Button className="button" style={value.style} onClick={this.input.bind(this, value.value)}>{value.value}</Button></span>
                )
            }
        })

        return (
            <div className="calculator">
                <div className="inlayer">
                    <Input
                        className="input"
                        placeholder="计算器"
                        value={this.state.equation}
                    />
                    <br />
                    {buttonList}
                </div>
            </div>
        );
    }
}

export default Calculator;
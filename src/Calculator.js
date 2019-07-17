import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { stringToArray, infixToSuffix,suffixResult } from "./lib"
import { inputAction, claerAction, runAction, backSpaceAction } from './store/actionCreators'
import store from './store'
import 'antd/dist/antd.css'
import './Calculator.css'

const KEY = [
    { 'value': '7' },
    { 'value': '8' },
    { 'value': '9' },
    { 'value': '+' },
    { 'value': '4' },
    { 'value': '5' },
    { 'value': '6' },
    { 'value': '-' },
    { 'value': '1' },
    { 'value': '2' },
    { 'value': '3' },
    { 'value': '*' },
    { 'value': '.' },
    { 'value': '0' },
    { 'value': '=' },
    { 'value': '/' },
    { 'value': 'C' },
    { 'value': '<-' },
]
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
                action = backSpaceAction(this.backSpace(this.state.equation));
                break;
            }

            default:
                action = inputAction(count)
                break;
        }
        store.dispatch(action)
        this.storeChange()
    }
    backSpace(str) {
        str = str.substring(0, str.length - 1);
        return str;
    }
    render() {
        var buttonList = [];
        KEY.forEach((value, index) => {
            if ((index + 1) % 4 === 0) {
                buttonList.push(
                    <span key={index}><Button className="button" onClick={this.input.bind(this, value.value)}>{value.value}</Button><br /></span>
                )
            } else {
                buttonList.push(
                    <span key={index}><Button className="button" onClick={this.input.bind(this, value.value)}>{value.value}</Button></span>
                )
            }
        })

        return (
            <div className="calculator">
                <div className="inlayer">
                    <Input
                        className="input"
                        placeholder={this.state.inputValue}
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
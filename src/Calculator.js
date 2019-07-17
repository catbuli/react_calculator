import React, { Component } from 'react';
import { Input, Button } from 'antd';
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
                let result = this.suffixResult(this.suffix(this.stringToArray(this.state.equation)))
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
    //字符串转数组
    stringToArray(str) {
        let data = str.split('')
        var flag = ""
        let result = [];
        data.forEach((data, index) => {
            if (data !== "+" && data !== "-" && data !== "*" && data !== "/") {
                flag = flag + data;
            } else {
                result.push(parseFloat(flag))
                result.push(data)
                flag = ""
            }

        })
        result.push(parseFloat(flag))
        return result
    }
    //  中缀表达式转后缀表达式
    suffix(data) {
        let str = ""
        let operator = []
        data.forEach((a, index) => {
            if (Number(a)) {
                str = str + a + " ";
            } else {
                if (operator.length === 0) {
                    operator.push(a)
                } else {
                    let test = operator.length
                    for (let index = 0; index <= test; index++) {
                        let tmp = operator.pop()
                        operator.push(tmp)
                        let flag = this.operatorCompare(a, tmp)
                        if (flag && operator.length !== 0) {
                            str = str + operator.pop() + " ";
                        } else {
                            operator.push(a)
                            break;
                        }
                    }
                }
            }
        })
        while (operator.length !== 0) {
            str = str + operator.pop() + " ";
        }
        console.log(str);
        return str;
    }
    //后缀表达式运算
    suffixResult(str) {
        let data = str.split(' ');
        let result = []
        data.forEach((data) => {
            if (!isNaN(parseFloat(data))) {
                result.push(parseFloat(data))
            } else {
                switch (data) {
                    case "+":
                        result.push(parseFloat(result.pop()) + parseFloat(result.pop()))
                        break;
                    case "-":
                        let a = parseFloat(result.pop()); let b = parseFloat(result.pop())
                        result.push(b - a);
                        break;
                    case "*":
                        result.push(parseFloat(result.pop()) * parseFloat(result.pop()))
                        break;
                    case "/":
                        let aa = parseFloat(result.pop()); let bb = parseFloat(result.pop())
                        result.push(bb / aa);
                        break;
                    default:
                        break;
                }
            }
        })
        return result.pop()
    }
    //运算符比较优先级
    operatorCompare(a, b) {
        var add = "+", minu = "-", multiply = "*", divide = "/"
        var flaga;
        var flagb;
        switch (a) {
            case add: flaga = 1; break;
            case minu: flaga = 1; break;
            case multiply: flaga = 2; break;
            case divide: flaga = 2; break;
            default:
                break;
        }
        switch (b) {
            case add: flagb = 1; break;
            case minu: flagb = 1; break;
            case multiply: flagb = 2; break;
            case divide: flagb = 2; break;
            default:
                break;
        }
        console.log(flaga, flagb);

        return flaga <= flagb
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
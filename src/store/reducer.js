import { CHANGE_INPUT, CLEAR_INPUT, RUN_INPUT ,BACK_SPACE} from './actionTypes'

const defaultState = {
    equation: "",
}
export default (state = defaultState, action) => {
    if (action.type === CHANGE_INPUT) {
        //es6 深复制方法
        let newState = JSON.parse(JSON.stringify(state))
        newState.equation = newState.equation + action.equation
        return newState
    } else if (action.type === CLEAR_INPUT) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.equation = ""
        return newState
    } else if (action.type === RUN_INPUT) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.equation = action.result
        return newState
    } else if (action.type === BACK_SPACE) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.equation = newState.equation.substring(0, newState.equation.length - 1);
        return newState
    }
    return state
};

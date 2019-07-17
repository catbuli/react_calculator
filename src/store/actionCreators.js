import { CHANGE_INPUT,CLEAR_INPUT,RUN_INPUT,BACK_SPACE} from './actionTypes'

export const inputAction = (equation) => ({
    type: CHANGE_INPUT,
    equation
})

export const claerAction = ()=>({
    type: CLEAR_INPUT,
})

export const runAction = (result)=>({
    type: RUN_INPUT,
    result
})

export const backSpaceAction = (result)=>({
    type: BACK_SPACE,
    result
})


const { legacy_createStore, combineReducers, applyMiddleware } = require('redux')
const { createLogger } = require('redux-logger')
//state
const initialCountState = {
    count: 0
}
const initialPersonState = {
    name: '',
    id: 0,
    salary: 0
}

//action types
const countActionTypes = {
    INCREASE: 'INCREASE',
    DECREASE: 'DECREASE'
}

const personActionTypes = {
    UPDATE_SALARY: 'UPDATE_SALARY'
}

//action creators
const increaseCountActionCreator = (value) => {
    return {
        type: countActionTypes.INCREASE,
        payload: value
    }
}
const decreaseCountActionCreator = (value) => {
    return {
        type: countActionTypes.DECREASE,
        payload: value
    }
}

const updatePersonSalaryActionCreator = (value) => {
    return {
        type: personActionTypes.UPDATE_SALARY,
        payload: value
    }
}

//reducer
const countStateReducer = (state = initialCountState, action) => {

    switch (action.type) {
        case countActionTypes.INCREASE:
            return {
                ...state,
                count: state.count + action.payload
            }

        case countActionTypes.DECREASE:
            return {
                ...state,
                count: state.count - action.payload
            }

        default:
            return { ...state }
    }
}

const personReducer = (state = initialPersonState, action) => {
    switch (action.type) {
        case personActionTypes.UPDATE_SALARY:
            return {
                ...state,
                salary: action.payload
            }

        default:
            return { ...state }
    }
}

const reducerMap = combineReducers({
    countState: countStateReducer,
    personState: personReducer
})
const logger = createLogger()
//const store = legacy_createStore(countStateReducer)
const store = legacy_createStore(
    reducerMap,
    applyMiddleware(logger)
)

//console.log(store.getState());

// store.dispatch({ type: actionTypes.INCREASE, payload: 3 })
const increaseByThreeAction = increaseCountActionCreator(3)
store.dispatch(increaseByThreeAction)
//console.log(store.getState());

//store.dispatch({ type: actionTypes.DECREASE, payload: 2 })
const decreaseByTwoAction = decreaseCountActionCreator(2)
store.dispatch(decreaseByTwoAction)
//console.log(store.getState());

const updateSalaryAction = updatePersonSalaryActionCreator(1000)
store.dispatch(updateSalaryAction)
//console.log(store.getState());
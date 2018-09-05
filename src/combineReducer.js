export default function combineReducer(...reducers){
    const finalReducerKeys = Object.keys(reducers).filter(key => typeof reducers[key] === 'function')

    return (state={}, action) => {
        const nextState = {}
        let haschanged = false

        finalReducerKeys.forEach(key => {
            nextState[key] = reducers[key](state[key], action)
            haschanged = haschanged || nextState[key] !== state[key]
        })  

        return haschanged ? nextState : state
    }
}
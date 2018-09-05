export default function createStore(reducer, initialState, enhancer) {
    if(typeof initialState === 'function' && enhancer === 'undefined'){
        enhancer = initialState
        initialState = undefined
    }

    if(typeof enhancer !== 'undefined'){
        if(typeof enhancer !== 'function'){
            throw new Error('enhancer is shoule be function')
        }
        return enhancer(createStore)(reducer, initialState)
    }

    let currentReducer = reducer,
        currentState = initialState,
        listeners = [],
        isDispatching = false;
    
    /**
     * get current state
     * @returns {any}
     */
    function getState() {
        if(isDispatching){
            throw new Error('store is dispatching now')
        }

        return currentState
    }

    /**
     * 
     * @param {Function} listener function to be invoked after dispach
     * @returns {Function} function to remove this listener
     */
    function subscribe(listener) {
        listeners.push(listener)

        return function unsubscribe() {
            listeners.splice(listeners.indexOf(listener), 1)
        }
    }

    /**
     * 
     * @param {Function} reducer the reducer instead of old one for the store
     * @returns {Function} return old reducer
     */
    function replaceReducer(reducer) {
        if(typeof reducer !== 'function'){
            throw new Error('reducer should be a function')
        }

        let oldReducer = currentReducer
        currentReducer = reducer
        return oldReducer
    }

    /**
     * 
     * @param {Object} action the action to tell reducer how to deal with state
     */
    function dispatch(action) {
        currentState = currentReducer(currentState, state)

        listeners.forEach(listenr => listener())

        return action
    }

    return {
        dispach,
        subscribe,
        replaceReducer,
        getState
    }
}
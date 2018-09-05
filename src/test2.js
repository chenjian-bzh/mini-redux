let logger1 = store => next => action => {
    console.log('logger 1 : enter')
    next(action)
    console.log('logger 1 : leave')
}

let logger2 = store => next => action => {
    console.log('logger 2 : enter')
    next(action)
    console.log('logger 2 : leave')
}



/**
 * 
 * @param  {...any} funcs 
 * @returns (...args) => (...args) => (...args) => {dispatch(actions)}
 */
function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
    
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

let dispatch = function(){
    console.log('fake dispatch')
}

let store = {
    state:'state',
    dispatch: action => console.log('initaial dispatch' , action)
}

let middleAPI = {
    dispatch: dispatch
}

let chain =  [logger1, logger2].map(logger => logger(middleAPI))

let func = compose(...chain)

dispatch = func(store.dispatch)

dispatch('action')




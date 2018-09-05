import compose from './compose'

const applyMiddleware = (...middlewares) => createStore => (...args) => {
    let store = createStore(...args)

    let dispatch = () => {
        throw new Error('error dispatch , need compose')
    }

    let middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
    }

    let chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
        ...store,
        dispatch
    }
}

export default applyMiddleware 
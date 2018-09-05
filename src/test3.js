function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
    
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

let a = (next) => {
    console.log('a first...')
    return action => {
        console.log('a...')
        next && next(action)
        console.log('a end...')
    }
}

let b = (next) => {
    console.log('b first...')
    return action => {
        console.log('b...')
        next && next(action)
        console.log('b end...')
    }
}

let c = (next) => {
    console.log('c first...')
    return action => {
        console.log('c...')
        next && next(action)
        console.log('c end...')
    }
}

let d = (next) => {
    console.log('d first...')
    return action => {
        console.log('d...')
        next && next(action)
        console.log('d end...')
    }
}


function f1(action)  {
    console.log('f1...')
    console.log(action)
    console.log('f1 end...')
}

function f2(action) {
    console.log('f2...')
    console.log(action)
    console.log('f2 end...')
}

function f3(action) {
    console.log('f3...')
    console.log(action)
    console.log('f3 end...')
}

function f4(action) {
    console.log('f4...')
    console.log(action)
    console.log('f4 end...')
}

let func = compose(...[a, b, c ,d])

//func()('asd')

let func2 = compose(...[f1, f2, f3, f4])

//func2('qqq')

// f1(f2(f3(f4('sdfsd'))))
a(b(c(d())))('asd')

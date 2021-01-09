// redux

enum types {
    CHANGE_COLOR = 'changeColor',
    CHANGE_MARGIN = 'changeMargin'
}

const action1 = () => ({ type: types.CHANGE_COLOR as const, color: 'black' })
const action2 = () => ({ type: types.CHANGE_MARGIN as const, margin: 20 })

const actions = {
    action1,
    action2
}

type InferedTypes<T> = T extends { [p: string]: infer U } ? U : never
type RType<T> = T extends () => infer U ? U : never

const initialState = {
    color: 'white',
    margin: 10
}

const reduced = (state: typeof initialState, action: RType<InferedTypes<typeof actions>>): typeof initialState => {
    switch (action.type) {
        case types.CHANGE_COLOR: return {
            ...state,
            color: action.color
        }
        case types.CHANGE_MARGIN: return {
            ...state,
            margin: action.margin
        }
    }
}

const newState = reduced(initialState, action1())
const newState1 = reduced(newState, action2())

console.log(newState1)

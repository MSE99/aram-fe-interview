
export const createTodo = (id, text, done) => ({ id, text, done })

export const selectId = 
    ({ id }) => id

export const selectText = 
    ({ text }) => text

export const selectDone = 
    ({ done }) => done

export const sameTodo =
    (left, right) => selectId(left) === selectId(right) && selectText(left) === selectText(right) && selectDone(left) === selectDone(right)


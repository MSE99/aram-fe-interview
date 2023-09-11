
export const createTodo = (task_id, text, done) => ({ task_id, text, done })

export const selectId = 
    ({ task_id }) => task_id

export const selectText = 
    ({ text }) => text

export const selectDone = 
    ({ done }) => done

export const sameTodo =
    (left, right) => selectId(left) === selectId(right) && selectText(left) === selectText(right) && selectDone(left) === selectDone(right)

export const changeStatus = 
    todo => ({ ...todo, done: !selectDone(todo) })

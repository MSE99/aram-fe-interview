import { reactive } from 'vue'
import { sameTodo } from './todo'

export default reactive({
    todos: [],

    list() {
        return this.todos
    },

    _add(todo) {
        const nextTodos = [...this.todos, todo]
        this.todos = nextTodos
    },

    _remove(todo) {
        const nextTodos = this.todos.filter(t => !sameTodo(t, todo))
        this.todos = nextTodos
    },

    _clear() {
        this.todos = []
    }
})

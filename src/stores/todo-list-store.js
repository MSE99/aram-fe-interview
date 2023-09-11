import { reactive } from 'vue'
import { compareTodos } from './todo'

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
        const nextTodos = this.todos.filter(t => !compareTodos(t, todo))
        this.todos = nextTodos
    },

    _clear() {
        this.todos = []
    }
})
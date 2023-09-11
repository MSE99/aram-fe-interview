import { reactive } from 'vue'
import { sameTodo } from './todo'

export default reactive({
    todos: [],

    list() {
        return this.todos
    },

    fetch() {
        throw new Error('NOT IMPLEMENTED')
    },

    add(text) {
        throw new Error('NOT IMPLEMENTED')
    },

    delete() {
        throw new Error('NOT IMPLEMENTED')
    },

    changeStatus() {
        throw new Error('NOT IMPLEMENTED')
    },

    // Small helper API to ease testing
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

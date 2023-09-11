import { reactive } from 'vue'
import { sameTodo, changeStatus, selectId, selectDone } from './todo'
import endpoints from './endpoints'

export default reactive({
    todos: [],
    controlsDisabled: false,

    list() {
        return this.todos
    },

    shouldDisableUI() { return this.controlsDisabled },

    async fetch() {
        this.controlsDisabled = true
        
        try {
            const res = await fetch(endpoints.getTasksURL, {
                headers: endpoints.headers,
                mode: 'cors',
                method: 'POST'
            })
            
            this._assertOK(res)
            
            const tasks = await res.json()
            this.todos = tasks
        } catch (err) {
            console.error(err)
        } finally {
            this.controlsDisabled = false
        }
    },

    async add(text) {
        this.controlsDisabled = true

        try {
            const res = await fetch(endpoints.addTaskURL, {
                headers: endpoints.headers,
                method: 'POST',
                body: JSON.stringify({
                    status: false,
                    text
                }),
                mode: 'cors'
            })

            this._assertOK(res)

            const { task } = await res.json()
            this.todos = [...this.todos, task]
        } catch (err) {
            console.error(err)
        } finally {
            this.controlsDisabled = false
        }
    },

    async delete(todo) {
        this.controlsDisabled = true

        try {
            const res = await fetch(endpoints.deleteTaskURL, {
                headers: endpoints.headers,
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    task_id: selectId(todo)
                })
            })

            this._assertOK(res)

            this.todos = this.todos.filter((otherTodo) => !sameTodo(todo, otherTodo))
        } catch (err) {
            console.error(err)
        } finally {
            this.controlsDisabled = false
        }
    },

    async changeStatus(todo) {
        this.controlsDisabled = true
        
        try {
            const changed = changeStatus(todo)

            const res = await fetch(endpoints.changeTaskURL, {
                headers: endpoints.headers,
                method: 'POST',
                body: JSON.stringify({
                    task_id: selectId(changed),
                    status: selectDone(changed)
                }),
                mode: 'cors'
            })

            this._assertOK(res)

            this.todos = this.todos.map((otherTodo) => {
                return sameTodo(todo, otherTodo) ? changed : otherTodo
            })
        } catch (err) {
            console.error(err)
        } finally {
            this.controlsDisabled = false
        }
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
    },

    _assertOK(res) {
        if (!res.ok)
            throw new Error(`Request failed with status ${res.status}`)
    }
})

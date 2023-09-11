import { expect, it, describe, beforeEach } from 'vitest'
import store from './todo-list-store'
import { createTodo } from './todo'

describe('todo-list-store', () => {
    beforeEach(() => {
        store._clear()
    })
    
    it('should return [] on initial state', () => {
        expect(store.list()).toEqual([])
    })

    it('_addTodo should add a todo', () => {
        const todo = createTodo(1, 'test', false)
        store._add(todo)
        expect(store.list()).toEqual([todo])
    })

    it('_removeTodo should remove a todo', () => {
        const todo = createTodo(1, 'test', false)
        store._add(todo)
        expect(store.list()).toEqual([todo])
        
        store._remove(todo)
        expect(store.list()).toEqual([])
    })
})

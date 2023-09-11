import App from './App.vue'
import store from './stores/todo-list-store'

import { expect, it, describe, beforeEach, afterAll, vi } from 'vitest'
import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { createTodo, selectId } from './stores/todo'

describe('App', () => {
    let fetchSpy

    beforeEach(() => {
        store._clear()
        fetchSpy = vi.spyOn(store, 'fetch').mockResolvedValue(undefined)
    })
    
    afterAll(() => store._clear())

    it('should render all todos.', () => {
        store._add(createTodo(1, 'foo', false))
        store._add(createTodo(2, 'bar', false))
        store._add(createTodo(3, 'naz', true))

        const screen = render(App)
        
        expect(fetchSpy).toHaveBeenCalledOnce()
    
        screen.getByText('foo')
        screen.getByText('bar')
        screen.getByText('naz')
    })

    it('should call addTodo when the add button is clicked.', async () => {
        vi.spyOn(store, 'add').mockResolvedValue(undefined)

        const screen = render(App)

        await userEvent.type(screen.getByTestId('todo-text-input'), ' foo is great bar is none baz is all!      {Enter}')
        
        expect(store.add).toHaveBeenCalledOnce()
        expect(store.add).toHaveBeenCalledWith('foo is great bar is none baz is all!')
    })

    it('should call delete when delete button is clicked.', async () => {
        vi.spyOn(store, 'delete').mockResolvedValue(undefined)

        const todo = createTodo(1, 'foo', false) 
        store._add(todo)

        const screen = render(App)

        await userEvent.click(screen.getByTestId(`todo-delete-${selectId(todo)}`))

        expect(store.delete).toHaveBeenCalledOnce()
        expect(store.delete).toHaveBeenCalledWith(todo)
    })

    it('should call updateStatus when update checkbox is clicked.', async () => {
        vi.spyOn(store, 'changeStatus').mockResolvedValue(undefined)

        const todo = createTodo(1, 'foo', false) 
        store._add(todo)

        const screen = render(App)

        await userEvent.click(screen.getByTestId(`todo-checkbox-${selectId(todo)}`))

        expect(store.changeStatus).toHaveBeenCalledOnce()
        expect(store.changeStatus).toHaveBeenCalledWith(todo)
    })
})

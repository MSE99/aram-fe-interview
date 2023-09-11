import TodoForm from './TodoForm.vue'

import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

describe('TodoForm', () => {
    it('should not add a new todo if the text is empty.', async () => {
        const screen = render(TodoForm)
        
        const input = screen.getByTestId('todo-text-input')
        const btn = screen.getByTestId('todo-add-button')
    
        await userEvent.type(input, '    ')
        await userEvent.click(btn)

        expect(screen.emitted()['add-todo']).toBeUndefined()
    })

    it('should emit a add todo event on submit.', async () => {
        const screen = render(TodoForm)
        
        const input = screen.getByTestId('todo-text-input')
        const btn = screen.getByTestId('todo-add-button')
    
        await userEvent.type(input, 'Lorem ipsum lorem lorem lorem lore must be greater than 10')
        await userEvent.click(btn)

        expect(screen.emitted()['add-todo']).toEqual([['Lorem ipsum lorem lorem lorem lore must be greater than 10']])
        expect(input).toHaveValue('')
    })

    it('should render an error if the input is less than 10 chars.', async () => {
        const screen = render(TodoForm)
        
        const input = screen.getByTestId('todo-text-input')
        const btn = screen.getByTestId('todo-add-button')
    
        await userEvent.type(input, 'Lorem ipsum lorem lorem lorem lore must be greater than 10')
        await userEvent.click(btn)
        
        screen.getByTestId('error')
    })

    it('should render an error if the input is more than 1000 chars.', async () => {
        const screen = render(TodoForm)
        
        const input = screen.getByTestId('todo-text-input')
        const btn = screen.getByTestId('todo-add-button')
    
        await userEvent.type(input, '1'.repeat(1001))
        await userEvent.click(btn)
        
        screen.getByTestId('error')
    }, { timeout: 100_000 })


    it('should render input and submit button as disabled if areControlsDisabled prop is set to true.', async () => {
        const screen = render(TodoForm, { props: { areControlsDisabled: true } })
        
        const input = screen.getByTestId('todo-text-input')
        const btn = screen.getByTestId('todo-add-button')

        expect(input).toBeDisabled()
        expect(btn).toBeDisabled()
    })
})

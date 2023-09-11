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
    
        await userEvent.type(input, 'Foo is great bar is none!')
        await userEvent.click(btn)

        expect(screen.emitted()['add-todo']).toEqual([['Foo is great bar is none!']])
    })
})

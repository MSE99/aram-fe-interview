import Todo from './Todo.vue'
import { createTodo, selectText, selectId } from '../stores/todo'

import { expect, it, describe } from 'vitest'
import { render } from '@testing-library/vue'
import user from '@testing-library/user-event'

describe('Todo', () => {
    const todo = createTodo(1, 'test', false)
    
    it('should render the given todo record', () => {
        const screen = render(Todo, {props: {
            record: todo
        }})

        const id = selectId(todo)
        const text = selectText(todo)

        screen.getByText(text)
        
        expect(screen.getByTestId(`todo-checkbox-${id}`)).not.toBeChecked()
    })

    it('should emit a status update event when the checkbox is clicked.', async () => {
        const screen = render(Todo, {props: {
            record: todo
        }})

        const checkbox = screen.getByTestId(`todo-checkbox-${selectId(todo)}`)
        await user.click(checkbox)
        
        expect(screen.emitted()['change-status']).toEqual([[todo]])
    })

    it('should emit delete event if the user clicks on the delete button.', async () => {
        const screen = render(Todo, {props: {
            record: todo
        }})

        const deleteButton = screen.getByTestId(`todo-delete-${selectId(todo)}`)
        await user.click(deleteButton)
        
        expect(screen.emitted()['delete']).toEqual([[todo]])
    })
})

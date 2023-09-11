<script setup>
    import { reactive } from 'vue'

    const emit = defineEmits(['add-todo'])
    
    const state = reactive({
        text: '',
        error: ''
    })

    const handleSubmit = _ => {
        const cleaned = state.text.trim()
        
        if (cleaned.length === 0) {
            state.error = 'Please enter a todo'
            return
        } else if (cleaned.length < 10) {
            state.error = 'Must be over 10 characters long'
            return
        } else if (cleaned.length > 1000) {
            state.error = 'Are you kidding me?'
            return
        }

        emit('add-todo', cleaned)
        state.text = ''
        state.error = ''
    }
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <label>
            Create Todo:
            <input name="text" data-testid="todo-text-input" type="text" v-model="state.text" />
        </label>

        <button data-testid="todo-add-button">Add</button>
    
        <p data-testid="error">
            {{ state.error }}
        </p>
    </form>    
</template>

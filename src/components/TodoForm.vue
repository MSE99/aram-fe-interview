<script setup>
    import { reactive } from 'vue'

    defineProps(['areControlsDisabled'])
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
        <fieldset :disabled="areControlsDisabled">
            <label for="text">New todo</label>
            <input 
                placeholder="Todo..."
                id="text" 
                name="text" 
                data-testid="todo-text-input" 
                type="text" 
                v-model="state.text" 
            />
            
            <button data-testid="todo-add-button">Add</button>
            
            <p data-testid="error">
                {{ state.error }}
            </p>
        </fieldset>
    </form>    
</template>

<style scoped>
    form {
        margin-bottom: 3rem;
    }

    fieldset {
        border: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    label {
        font-size: 1.5rem;
        font-weight: bold;
    }

    input {
        font-size: 1.11rem;
        margin: 1rem 0;
        padding: 0.11rem 0;
        width: 100%;
    }

    button {
        font-size: 1.11rem;
        padding: 0.5rem 1.5rem;
        align-self: flex-end;
        background: lightcoral;
        color: white;
        border-radius: 5px;
        transition: all ease-in-out 250ms;
    }

    button:hover {
        cursor: pointer;
        background: coral;
    }

    p {
        color: red;
        margin-top: 1rem;
    }
</style>

<script setup>
    import { reactive } from 'vue'

    const emit = defineEmits(['add-todo'])
    const input = reactive({
        text: ''
    })

    const handleSubmit = _ => {
        if (!input.text.trim()) return
        emit('add-todo', input.text)
        input.text = ''
    }
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <label>
            Create Todo:
            <input name="text" data-testid="todo-text-input" type="text" v-model="input.text" />
        </label>

        <button data-testid="todo-add-button">Add</button>
    </form>    
</template>

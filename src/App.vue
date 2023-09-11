<script setup>
  import { onMounted } from 'vue'
  import store from './stores/todo-list-store'
  import TodoForm from './components/TodoForm.vue'
  import Todo from './components/Todo.vue'
  import { selectId } from './stores/todo'

  onMounted(() => { store.fetch() })

  const handleAddTodo = (text) => {
    store.add(text)
  }

  const handleDelete = (todo) => {
    store.delete(todo)
  }

  const handleChangeStatus = (todo) => {
    store.changeStatus(todo)
  }
</script>

<template>
  <TodoForm 
    @add-todo="handleAddTodo"
    :areControlsDisabled="store.shouldDisableUI()"
  />

  <Todo 
    v-for="todo in store.list()" 
    :key="selectId(todo)" 
    :record="todo"
    :areControlsDisabled="store.shouldDisableUI()"
    @delete="handleDelete"
    @change-status="handleChangeStatus"
  />

  <span v-if="store.shouldDisableUI()">
    Loading...
  </span>
</template>


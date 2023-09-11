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

  window.store = store
</script>

<template>
  <TodoForm 
    @add-todo="handleAddTodo"
  />

  <Todo 
    v-for="todo in store.list()" 
    :key="selectId(todo)" 
    :record="todo"
    @delete="handleDelete"
    @change-status="handleChangeStatus"
  />
</template>


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
  <main>
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

    <span data-testid="loading" v-if="store.shouldDisableUI()">
      ⏱️ Loading...
    </span>
  </main>
</template>

<style scoped>
  main {
    width: 100%;
    height: 100%;
    padding: 2rem;
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  span {
    font-size: 1.5rem;
  }
</style>

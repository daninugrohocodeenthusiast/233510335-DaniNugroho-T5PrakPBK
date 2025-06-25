// src/stores/todoStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([]); // State to hold the list of todos

  // Action to add a new todo
  const addTodo = (text) => {
    if (text.trim()) {
      todos.value.push({
        id: Date.now(), // Unique ID
        text,
        completed: false
      });
    }
  };

  // Action to delete a todo
  const deleteTodo = (id) => {
    todos.value = todos.value.filter(todo => todo.id !== id);
  };

  // Action to toggle todo completion status
  const toggleTodoCompletion = (id) => {
    const todo = todos.value.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };

  // Getter to count incomplete todos
  const incompleteTodosCount = computed(() => {
    return todos.value.filter(todo => !todo.completed).length;
  });

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodoCompletion,
    incompleteTodosCount
  };
});
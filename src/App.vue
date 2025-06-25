<template>
  <div class="todo-app">
    <h1>My Todo List</h1>
    <div class="input-section">
      <input
        type="text"
        v-model="newTodoText"
        @keyup.enter="addNewTodo"
        placeholder="Add a new task..."
        class="todo-input"
      />
      <button @click="addNewTodo" class="add-button">Add Task</button>
    </div>

    <p class="incomplete-count">
      Tasks to do: {{ todoStore.incompleteTodosCount }}
    </p>

    <ul class="todo-list">
      <li v-for="todo in todoStore.todos" :key="todo.id" :class="{ 'completed': todo.completed }" class="todo-item">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="todoStore.toggleTodoCompletion(todo.id)"
          class="todo-checkbox"
        />
        <span :class="{ 'text-completed': todo.completed }">{{ todo.text }}</span>
        <button @click="todoStore.deleteTodo(todo.id)" class="delete-button">X</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from './stores/todoStore';

const todoStore = useTodoStore();
const newTodoText = ref('');

const addNewTodo = () => {
  todoStore.addTodo(newTodoText.value);
  newTodoText.value = ''; // Clear input after adding
};
</script>

<style scoped>
.todo-app {
  font-family: 'Arial', sans-serif;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #DC3545; /* Modern red */
  margin-bottom: 25px;
  font-size: 2.2em;
}

.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.todo-input {
  flex-grow: 1;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1.1em;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: #DC3545;
}

.add-button {
  background-color: #DC3545; /* Modern red */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #C82333; /* Darker red on hover */
}

.incomplete-count {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 20px;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #F8F9FA; /* Light gray background */
  border: 1px solid #eee;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.todo-item.completed {
  background-color: #E9ECEF; /* Slightly darker for completed tasks */
}

.todo-checkbox {
  margin-right: 15px;
  transform: scale(1.3); /* Slightly larger checkbox */
}

.todo-item span {
  flex-grow: 1;
  text-align: left;
  font-size: 1.1em;
  color: #333;
}

.todo-item .text-completed {
  text-decoration: line-through;
  color: #999;
}

.delete-button {
  background-color: #FF6347; /* Tomato red for delete */
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  margin-left: 15px;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #E55337; /* Darker tomato red on hover */
}
</style>
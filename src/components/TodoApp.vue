<template>
  <div class="todo-app brutalist-container">
    <h1 class="brutalist-header">My Todo List</h1>

    <div class="input-section">
      <input
        type="text"
        v-model="newTodoText"
        @keyup.enter="addNewTodo"
        placeholder="Add a new task..."
        class="todo-input brutalist-input"
      />
      <button @click="addNewTodo" class="add-button brutalist-button">ADD TASK</button>
    </div>

    <p class="incomplete-count brutalist-text-small">
      TASKS TO DO: <span class="brutalist-highlight-red">{{ todoStore.incompleteTodosCount }}</span>
    </p>

    <ul class="todo-list">
      <li v-for="todo in todoStore.todos" :key="todo.id" :class="{ 'completed': todo.completed }" class="todo-item brutalist-item">
        <label class="brutalist-checkbox-container">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="todoStore.toggleTodoCompletion(todo.id)"
            class="todo-checkbox brutalist-checkbox"
          />
          <span class="brutalist-checkmark"></span>
        </label>
        <span :class="{ 'text-completed': todo.completed }" class="todo-text brutalist-item-text">{{ todo.text }}</span>
        <button @click="todoStore.deleteTodo(todo.id)" class="delete-button brutalist-delete-button">X</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const todoStore = useTodoStore();
const newTodoText = ref('');

const addNewTodo = () => {
  if (newTodoText.value.trim()) { // Ensure not adding empty tasks
    todoStore.addTodo(newTodoText.value);
    newTodoText.value = ''; // Clear input after adding
  }
};
</script>

<style scoped>
/* Define primary colors */
:root {
  --brutalist-red: #E60023; /* A strong, clear red */
  --brutalist-dark: #222;
  --brutalist-light-gray: #F0F0F0;
  --brutalist-border: 2px solid var(--brutalist-dark);
}

.todo-app {
  font-family: 'IBM Plex Mono', monospace; /* A more "techy" or brutalist font */
  max-width: 650px; /* Slightly wider */
  margin: 60px auto; /* More margin */
  padding: 30px; /* More padding */
  background-color: #fff;
  /* Instead of box-shadow, a strong border is key for brutalism */
  border: var(--brutalist-border);
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  position: relative; /* For potential future absolute positioning of elements */
}

/* Header */
.brutalist-header {
  color: var(--brutalist-red);
  margin-bottom: 30px;
  font-size: 2.8em; /* Larger header */
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: var(--brutalist-border); /* Underline with a strong border */
  padding-bottom: 15px;
}

/* Input Section */
.input-section {
  display: flex;
  gap: 15px; /* More gap */
  margin-bottom: 30px;
}

.todo-input {
  flex-grow: 1;
  padding: 15px; /* Larger padding for input */
  border: var(--brutalist-border);
  font-size: 1.2em; /* Larger text in input */
  background-color: var(--brutalist-light-gray); /* Light gray background for input */
  color: var(--brutalist-dark);
}

.todo-input::placeholder {
  color: #777; /* Softer placeholder text */
}

.todo-input:focus {
  outline: none;
  border-color: var(--brutalist-red); /* Red border on focus */
}

.add-button {
  background-color: var(--brutalist-red);
  color: white;
  padding: 15px 25px; /* Larger button */
  border: var(--brutalist-border); /* Strong border on button */
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.2s, color 0.2s;
}

.add-button:hover {
  background-color: var(--brutalist-dark); /* Dark background on hover */
  color: var(--brutalist-red); /* Red text on hover */
  border-color: var(--brutalist-red);
}

/* Incomplete Count */
.incomplete-count {
  font-size: 1.2em;
  color: var(--brutalist-dark);
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px dashed var(--brutalist-dark); /* Dashed border for callout */
  padding: 10px 15px;
  display: inline-block; /* To make dashed border wrap content tightly */
}

.brutalist-highlight-red {
  color: var(--brutalist-red);
  font-weight: bold;
}

/* Todo List */
.todo-list {
  list-style: none;
  padding: 0;
  border-top: var(--brutalist-border); /* Strong top border for the list */
  padding-top: 15px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px; /* More padding */
  margin-bottom: 12px;
  background-color: #fff;
  border: 1px solid var(--brutalist-dark); /* Item border */
  box-sizing: border-box;
}

.todo-item.completed {
  background-color: var(--brutalist-light-gray); /* Light gray for completed */
  border-color: #999; /* Lighter border for completed */
}

.todo-text {
  flex-grow: 1;
  text-align: left;
  font-size: 1.1em;
  color: var(--brutalist-dark);
  padding-left: 15px; /* Space from custom checkbox */
}

.todo-item .text-completed {
  text-decoration: line-through;
  color: #777; /* Muted color for completed text */
}

/* Custom Checkbox (Anti-Mainstream) */
.brutalist-checkbox-container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 25px; /* Fixed width for the clickable area */
  height: 25px;
}

.brutalist-checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.brutalist-checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #fff;
  border: var(--brutalist-border);
}

.brutalist-checkbox-container:hover input ~ .brutalist-checkmark {
  background-color: #eee;
}

.brutalist-checkbox-container input:checked ~ .brutalist-checkmark {
  background-color: var(--brutalist-red);
  border-color: var(--brutalist-red);
}

.brutalist-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.brutalist-checkbox-container input:checked ~ .brutalist-checkmark:after {
  display: block;
}

.brutalist-checkbox-container .brutalist-checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* Delete Button */
.delete-button {
  background-color: var(--brutalist-dark); /* Dark background */
  color: var(--brutalist-red); /* Red X */
  border: var(--brutalist-border);
  width: 40px; /* Larger button */
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.3em;
  cursor: pointer;
  margin-left: 15px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.delete-button:hover {
  background-color: var(--brutalist-red);
  color: var(--brutalist-dark);
  border-color: var(--brutalist-dark);
}
</style>
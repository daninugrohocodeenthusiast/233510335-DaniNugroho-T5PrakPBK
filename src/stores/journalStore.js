// src/stores/journalStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useJournalStore = defineStore('journal', () => {
  const journalEntries = ref([]); // State to hold daily journal entries
  const selectedDate = ref(new Date().toISOString().split('T')[0]); // YYYY-MM-DD

  // Helper to find an entry by date
  const findEntryByDate = (date) => {
    return journalEntries.value.find(entry => entry.date === date);
  };

  // Actions
  const createOrLoadEntry = (date) => {
    const existingEntry = findEntryByDate(date);
    if (!existingEntry) {
      journalEntries.value.push({
        id: Date.now(),
        date: date,
        topTasks: [
          { id: Date.now() + 1, text: '', completed: false }, // Allow up to 3-5 tasks
          { id: Date.now() + 2, text: '', completed: false },
          { id: Date.now() + 3, text: '', completed: false },
        ],
        gratitude: '',
        learning: '',
      });
    }
    selectedDate.value = date; // Ensure the selected date is updated
  };

  const updateTaskText = (date, taskId, newText) => {
    const entry = findEntryByDate(date);
    if (entry) {
      const task = entry.topTasks.find(t => t.id === taskId);
      if (task) {
        task.text = newText;
      }
    }
  };

  const toggleTaskCompletion = (date, taskId) => {
    const entry = findEntryByDate(date);
    if (entry) {
      const task = entry.topTasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    }
  };

  const updateGratitude = (date, text) => {
    const entry = findEntryByDate(date);
    if (entry) {
      entry.gratitude = text;
    }
  };

  const updateLearning = (date, text) => {
    const entry = findEntryByDate(date);
    if (entry) {
      entry.learning = text;
    }
  };

  const deleteEntry = (date) => {
    journalEntries.value = journalEntries.value.filter(entry => entry.date !== date);
    // Optionally, reset selectedDate if current one is deleted
    if (selectedDate.value === date && journalEntries.value.length > 0) {
        selectedDate.value = journalEntries.value[0].date; // Go to first available entry
    } else if (journalEntries.value.length === 0) {
        selectedDate.value = new Date().toISOString().split('T')[0]; // Reset to today
    }
  };

  // Getters
  const currentDayEntry = computed(() => {
    return findEntryByDate(selectedDate.value);
  });

  const incompleteTasksCount = computed(() => {
    const entry = currentDayEntry.value;
    return entry ? entry.topTasks.filter(task => !task.completed && task.text.trim() !== '').length : 0;
  });

  const allDates = computed(() => {
    return journalEntries.value.map(entry => entry.date).sort();
  });

  return {
    journalEntries,
    selectedDate,
    createOrLoadEntry,
    updateTaskText,
    toggleTaskCompletion,
    updateGratitude,
    updateLearning,
    deleteEntry,
    currentDayEntry,
    incompleteTasksCount,
    allDates,
  };
});
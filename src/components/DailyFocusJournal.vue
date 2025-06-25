<template>
  <div class="journal-app">
    <header class="app-header">
      <h1 class="header-title">Daily Focus Journal</h1>
      <p class="header-subtitle">Cultivate clarity, gratitude, and growth.</p>
    </header>

    <div class="date-selector-wrapper">
      <input
        type="date"
        v-model="journalStore.selectedDate"
        class="date-selector"
        @change="journalStore.createOrLoadEntry(journalStore.selectedDate)"
      />
      <button @click="journalStore.deleteEntry(journalStore.selectedDate)" class="delete-day-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      </button>
    </div>

    <div v-if="journalStore.currentDayEntry" class="journal-entry-container">
      <section class="section-card focus-section">
        <h2 class="section-title">✨ Today's Focus Tasks</h2>
        <p class="tasks-summary">
          <span class="highlight-text">{{ journalStore.incompleteTasksCount }}</span> tasks left for today.
        </p>
        <ul class="task-list">
          <li v-for="(task, index) in journalStore.currentDayEntry.topTasks" :key="task.id" class="task-item">
            <input
              type="checkbox"
              :id="`task-${task.id}`"
              :checked="task.completed"
              @change="journalStore.toggleTaskCompletion(journalStore.selectedDate, task.id)"
              class="task-checkbox"
            />
            <input
              type="text"
              :value="task.text"
              @input="journalStore.updateTaskText(journalStore.selectedDate, task.id, $event.target.value)"
              :placeholder="`Task ${index + 1}`"
              :class="['task-text-input', { 'completed-task-text': task.completed }]"
            />
          </li>
        </ul>
      </section>

      <div class="reflection-sections">
        <section class="section-card gratitude-section">
          <h2 class="section-title">🙏 I'm Grateful For...</h2>
          <textarea
            v-model="journalStore.currentDayEntry.gratitude"
            @input="journalStore.updateGratitude(journalStore.selectedDate, $event.target.value)"
            placeholder="Write down things you're grateful for today..."
            rows="4"
            class="reflection-textarea"
          ></textarea>
        </section>

        <section class="section-card learning-section">
          <h2 class="section-title">🧠 Today I Learned...</h2>
          <textarea
            v-model="journalStore.currentDayEntry.learning"
            @input="journalStore.updateLearning(journalStore.selectedDate, $event.target.value)"
            placeholder="What's one new thing you learned today?"
            rows="4"
            class="reflection-textarea"
          ></textarea>
        </section>
      </div>
    </div>
    <div v-else class="empty-day-state">
        <p>No entry for {{ journalStore.selectedDate }}.</p>
        <button @click="journalStore.createOrLoadEntry(journalStore.selectedDate)" class="create-entry-button vibrant-button">
            Create Entry for Today
        </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useJournalStore } from '../stores/journalStore';

const journalStore = useJournalStore();

// On initial load, create or load today's entry
onMounted(() => {
  journalStore.createOrLoadEntry(journalStore.selectedDate);
});

// Optional: Persist journalEntries to localStorage
// watch(journalStore.journalEntries, (newVal) => {
//   localStorage.setItem('dailyFocusJournal', JSON.stringify(newVal));
// }, { deep: true });

// onMounted(() => {
//   const storedJournal = localStorage.getItem('dailyFocusJournal');
//   if (storedJournal) {
//     journalStore.journalEntries = JSON.parse(storedJournal);
//     // Ensure selectedDate is still valid or defaults to today if not found
//     if (!journalStore.allDates.includes(journalStore.selectedDate)) {
//         journalStore.selectedDate = new Date().toISOString().split('T')[0];
//     }
//   }
// });
</script>

<style scoped>
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap');

/* Color Palette Variables (Tranquil Garden & Soft Hues) */
:root {
  --color-mint-soft: #C8E6C9; /* Soft mint green */
  --color-sky-pale: #B3E0F2; /* Pale sky blue */
  --color-cream-warm: #FAF0E6; /* Warm cream */
  --color-gold-accent: #F0E68C; /* Pale gold accent */
  --color-charcoal-dark: #4A4A4A; /* Dark charcoal for primary text */
  --color-gray-medium: #9E9E9E; /* Medium gray for secondary text */
  --color-white: #FFFFFF;
  --color-shadow-light: rgba(0, 0, 0, 0.05); /* Very soft shadow */
  --color-shadow-medium: rgba(0, 0, 0, 0.1);
}

.journal-app {
  font-family: 'Quicksand', sans-serif;
  max-width: 800px; /* Slightly wider for journal layout */
  margin: 60px auto;
  padding: 45px;
  background-color: var(--color-white);
  border-radius: 25px; /* Very rounded */
  box-shadow: 0 18px 50px var(--color-shadow-medium); /* Deeper, soft shadow */
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05); /* Very subtle border */
}

/* Header Section */
.app-header {
  text-align: center;
  margin-bottom: 45px;
}

.header-title {
  font-family: 'Playfair Display', serif; /* Elegant serif for title */
  font-size: 3.5em; /* Larger, more impactful */
  font-weight: 700;
  margin: 0;
  color: var(--color-charcoal-dark);
  line-height: 1.2;
}

.header-subtitle {
  font-size: 1.2em;
  color: var(--color-gray-medium);
  margin-top: 10px;
  font-weight: 300; /* Lighter weight */
}

/* Date Selector */
.date-selector-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 40px;
}

.date-selector {
  padding: 12px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-family: 'Quicksand', sans-serif;
  font-size: 1.1em;
  color: var(--color-charcoal-dark);
  cursor: pointer;
  background-color: var(--color-white);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.date-selector:focus {
  outline: none;
  border-color: var(--color-mint-soft);
  box-shadow: 0 0 0 3px rgba(200, 230, 201, 0.4);
}

.delete-day-button {
    background: none;
    border: none;
    color: var(--color-gray-medium);
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s, background-color 0.2s;
}
.delete-day-button:hover {
    color: var(--color-sky-pale);
    background-color: rgba(0, 0, 0, 0.05);
}

.journal-entry-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px; /* Space between sections */
}

@media (min-width: 768px) {
    .journal-entry-container {
        grid-template-columns: 1.5fr 1fr; /* Focus section wider, reflection sections narrower */
        grid-template-areas:
            "focus reflection-1"
            "focus reflection-2";
    }
    .focus-section { grid-area: focus; }
    .gratitude-section { grid-area: reflection-1; }
    .learning-section { grid-area: reflection-2; }
    .reflection-sections {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
}


/* Section Cards */
.section-card {
  background-color: var(--color-white);
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0 8px 25px var(--color-shadow-light); /* Soft shadow for cards */
  border: 1px solid rgba(0, 0, 0, 0.03); /* Extremely subtle border */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.section-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 35px var(--color-shadow-medium);
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6em;
  color: var(--color-charcoal-dark);
  margin-bottom: 25px;
  text-align: left;
  border-bottom: 1px solid #eee; /* Subtle separator */
  padding-bottom: 10px;
}

/* Focus Section Specifics */
.tasks-summary {
    font-size: 1.1em;
    color: var(--color-gray-medium);
    margin-bottom: 25px;
}
.highlight-text {
    font-weight: 700;
    color: var(--color-mint-soft); /* Highlight with mint */
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.task-checkbox {
  margin-right: 15px;
  transform: scale(1.4);
  accent-color: var(--color-mint-soft); /* Checkbox color */
}

.task-text-input {
  flex-grow: 1;
  border: none;
  border-bottom: 1px solid #e0e0e0; /* Underline input */
  padding: 8px 0;
  font-size: 1.1em;
  color: var(--color-charcoal-dark);
  background-color: transparent; /* No background */
  transition: border-color 0.3s;
}

.task-text-input:focus {
  outline: none;
  border-color: var(--color-sky-pale);
}

.task-text-input::placeholder {
  color: var(--color-gray-medium);
  font-style: italic;
}

.completed-task-text {
  text-decoration: line-through;
  color: var(--color-gray-medium);
  font-style: italic;
}

/* Reflection Sections Specifics */
.reflection-textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-family: 'Quicksand', sans-serif;
  font-size: 1.05em;
  color: var(--color-charcoal-dark);
  background-color: var(--color-cream-warm); /* Warm cream background */
  resize: vertical; /* Allow vertical resizing */
  min-height: 120px;
  box-sizing: border-box; /* Include padding in width/height */
  transition: border-color 0.3s, box-shadow 0.3s;
}

.reflection-textarea::placeholder {
  color: var(--color-gray-medium);
  font-style: italic;
}

.reflection-textarea:focus {
  outline: none;
  border-color: var(--color-sky-pale);
  box-shadow: 0 0 0 3px rgba(179, 224, 242, 0.4);
}

/* Empty State */
.empty-day-state {
    text-align: center;
    margin-top: 50px;
    padding: 30px;
    background-color: var(--color-cream-warm);
    border-radius: 15px;
    box-shadow: 0 5px 15px var(--color-shadow-light);
}

.empty-day-state p {
    font-size: 1.2em;
    color: var(--color-charcoal-dark);
    margin-bottom: 25px;
}

/* Vibrant Button (reused from previous design, slightly adjusted colors) */
.vibrant-button {
  background: linear-gradient(45deg, var(--color-mint-soft), var(--color-sky-pale));
  color: var(--color-white);
  padding: 14px 28px;
  border: none;
  border-radius: 10px; /* Slightly less rounded than app/cards */
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 600;
  display: inline-flex; /* Use inline-flex for self-centering */
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 5px 15px rgba(179, 224, 242, 0.3);
}

.vibrant-button svg {
  color: var(--color-white);
}

.vibrant-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(179, 224, 242, 0.4);
}

.vibrant-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(179, 224, 242, 0.2);
}
</style>
<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia tasks</h1>
    </header>

    <!-- new task form -->

    <div class="new-task-form">
      <taskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favorite'">Favorite tasks</button>
    </nav>

    <!-- Loading -->
    <div class="loading" v-if="taskStore.isLoading">Loading...</div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>all tasks</p>
      <p>
        You have {{ taskStore.totalCount }}
        <span v-if="taskStore.totalCount === 1">task</span>
        <span v-else>tasks</span>
        left to do
      </p>
      <div v-for="task in taskStore.tasks">
        <taskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-else>
      <p>favorite tasks</p>
      <p>
        You have {{ taskStore.favCount }}
        <span v-if="taskStore.favCount === 1">task</span>
        <span v-else>tasks</span>
        left to do
      </p>
      <div v-for="task in taskStore.favs">
        <taskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">reset State</button>
  </main>
</template>

<script>
import { ref } from "vue";
import taskDetails from "./components/taskDetails.vue";
import taskForm from "./components/taskForm.vue";
import { useTaskStore } from "./stores/taskstore";

export default {
  components: { taskDetails, taskForm },
  setup() {
    const taskStore = useTaskStore();
    
    taskStore.getTasks()

    const filter = ref("all");

    return { taskStore, filter };
  },
};
</script>

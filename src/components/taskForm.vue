<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to" v-model="newTask" />
    <button>add</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../stores/taskstore";

export default {
  setup() {
    const taskStore = useTaskStore();
    const newTask = ref("");
    const handleSubmit = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          title: newTask.value,
          isFavorite: false,
          id: Math.floor(Math.random() * 10000000),
        });
      }
      newTask.value = "";
    };

    return { handleSubmit, newTask };
  },
};
</script>

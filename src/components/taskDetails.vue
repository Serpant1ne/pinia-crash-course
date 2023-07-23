<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="icons">
            <i class="material-icons" @click="taskStore.deleteTask(task.id)">delete</i>
            <i 
            class="material-icons" 
            :class="{active: task.isFavorite}"
            @click="taskStore.toggleFav(task.id)"
            >favorite</i>
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '../stores/taskstore';

export default {
    props: ['task'],
    setup() {
        const taskStore = useTaskStore();

        return { taskStore }
    }
}
</script>


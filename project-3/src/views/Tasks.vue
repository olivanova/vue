<template>
  <h1 class="text-white center" v-if="!tasksList.length && !loading">Задач пока нет</h1>
  <AppLoader v-if="loading"/>
  <template v-if="tasksList.length && !loading">
    <h3 class="text-white">Всего активных задач: {{ active }}</h3>
    <tasks-card v-for="task in tasksList"
      :title="task.title"
      :status="task.status"
      :deadline="task.date"
      :id="task.databaseId"
    ></tasks-card>
  </template>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '../components/AppLoader'
import TasksCard from '../components/TasksCard'

export default {
  setup() {
    const store = useStore();
    const tasksList = computed(() => store.getters.tasksList);
    const active = computed(() => store.getters.activeTask)
    const loading = computed(() => store.getters.isFetching)

    onMounted(() => {
      store.dispatch('loadDatabase')
    })

    return {
      tasksList, active, loading
    }
  },
  components: {AppLoader, TasksCard}
}
</script>

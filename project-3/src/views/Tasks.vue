<template>
  <h1 class="text-white center" v-if="!tasksList.length && !loading">Задач пока нет</h1>
  <AppLoader v-if="loading"/>
  <template v-if="tasksList.length && !loading">
    <h3 class="text-white">Всего активных задач: {{ active }}</h3>
    <div class="card" v-for="task in tasksList">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" :name="statusName(task.status)"
        />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date(task.date).toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <router-link :to="`/tasks/${task.databaseId}`" custom v-slot="{ navigate }">
        <button class="btn primary" @click="navigate">Посмотреть {{ task.id }}</button>
      </router-link>
      <button class="btn danger" @click="deleteTask(task.databaseId)">Удалить {{ task.id }}</button>
    </div>
  </template>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useStatus} from "../hooks/status";
import AppStatus from '../components/AppStatus'
import AppLoader from '../components/AppLoader'
import AppNotification from '../components/AppNotification'

export default {
  setup() {
    const store = useStore();
    const statusName = useStatus()
    const tasksList = computed(() => store.getters.tasksList);
    const active = computed(() => store.getters.activeTask)
    const loading = computed(() => store.getters.isFetching)
    const notificationEnable = computed(() => store.getters.notification)
    const isFiltered = computed(() => store.getters.isFiltered)

    const deleteTask = (databaseId) => {
      store.dispatch('delete', databaseId)
    }

    onMounted(() => {
      store.dispatch('loadDatabase')
    })

    return {
      tasksList, active, loading, notificationEnable,
      deleteTask, statusName
    }
  },
  components: {AppStatus, AppLoader, AppNotification}
}
</script>

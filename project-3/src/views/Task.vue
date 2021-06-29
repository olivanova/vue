<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" :name="statusName(task.status)"/></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="setStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click="setStatus('done')">Завершить</button>
      <button class="btn danger" @click="setStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-if="!task && !loading">
    Задачи с id = <strong>{{ taskId }}</strong> нет.
  </h3>
  <AppLoader v-if="loading"/>
</template>

<script>
import { useStore } from 'vuex'
import AppStatus from '../components/AppStatus'
import AppLoader from '../components/AppLoader'
import AppNotification from '../components/AppNotification'
import { useStatus } from "../hooks/status";
import {computed, onMounted} from "vue";

export default {
  props: ['taskId'],

  setup(props){
    const store = useStore();
    const statusName = useStatus();
    const task = computed(() => store.getters.tasksList)
    const loading = computed(() => store.getters.isFetching)

    onMounted(() => {
      store.dispatch('loadTask', props.taskId)
    })

    const setStatus = (newStatus) => {
      store.commit('setStatus', {databaseId: props.taskId, newStatus: newStatus})
      store.dispatch('updatedTasks', {databaseId: task.value.databaseId, newStatus});
    };

    return {
      task, statusName, setStatus, loading
    }
  },

  components: {AppStatus, AppLoader, AppNotification}
}
</script>

<style scoped>

</style>

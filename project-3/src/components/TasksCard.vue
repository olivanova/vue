<template>
  <div class="card">
    <h2 class="card-title">
      {{ title }}
      <AppStatus :type="status" :name="statusName(status)"
      />
    </h2>
    <p>
      <strong>
        <small>
          {{new Date(deadline).toLocaleDateString()}}
        </small>
      </strong>
    </p>
    <router-link :to="`/tasks/${id}`" custom v-slot="{ navigate }">
      <button class="btn primary" @click="navigate">Посмотреть</button>
    </router-link>
    <button class="btn danger" @click="deleteTask(id)">Удалить</button>
  </div>
</template>

<script>
import {useStatus} from "../hooks/status";
import {useStore} from "vuex";

import AppStatus from "./AppStatus"
export default {
  props: ['title', 'status', 'deadline', 'id', 'obj'],
  setup() {
    const store = useStore();
    const statusName = useStatus();

    const deleteTask = (databaseId) => {
      store.dispatch('delete', databaseId)
    }

    return {
      statusName, deleteTask
    }
  },
  components: { AppStatus }
}
</script>

<style scoped>

</style>

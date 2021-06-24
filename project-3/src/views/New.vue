<template>
  <form class="card" @submit.prevent="createTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="inputTitle">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="inputDate">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="inputDescription"></textarea>
    </div>
    <button class="btn primary" :disabled="isDisable">Создать</button>
  </form>
</template>

<script>
import {ref, computed} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const inputTitle = ref('');
    const inputDate = ref('');
    const inputDescription = ref('');

    const store = useStore();
    const router = useRouter();

    const isDisable = computed(() => {
      return inputTitle.value.length < 3 || inputDate.value === '' || inputDescription.value.length < 3
    })

    const createTask = () => {
      const status = new Date(inputDate.value) > Date.now() ? 'active' : 'cancelled'
      const obj = {
        title: inputTitle.value,
        date: new Date(inputDate.value),
        description: inputDescription.value,
        // id: store.getters.tasksList.length + 1,
        status
      }
      store.dispatch('createNewTask', obj)
      router.push({name: 'index'})
    }

    return {
      inputTitle, inputDate, inputDescription,
      createTask, isDisable
    }
  }
}

</script>

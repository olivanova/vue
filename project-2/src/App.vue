<template>
  <div class="container">
    <app-alert
        v-if="alert"
        :message="alert"
        @close="closeAlert"
        :kind="alert.type"
        :style="{backgroundColor: 'white'}"
    ></app-alert>
  </div>
  <div class="container column">
    <form-resume @add-new-item="addNewItem"></form-resume>

    <div class="card card-w70">
      <resume @load-resume="loadFromServer" @delete-item="deleteItem"></resume>
    </div>

  </div>
  <div class="container">
    <comments @show-alert="showAlert"></comments>
  </div>
</template>

<script>
import AppButton from "./components/AppButton";
import AppAlert from "./components/AppAlert"

import Comments from "./components/Comments";
import Resume from "./components/Resume";
import FormResume from "./components/FormResume";

export default {
  provide() {
    return {
      resumeArray: this.resumeArray,
    }
  },

  data() {
    return {
      resumeArray: [],
      alert: null,
    }
  },

  methods: {
    deleteItem(elem) {
      this.resumeArray = elem;
    },

    loadFromServer(elem) {
      this.resumeArray = elem;
    },

    addNewItem(newObj) {
      this.resumeArray.push(newObj)
    },

    showAlert(error) {
      this.alert = error
    },

    closeAlert() {
      this.alert = null
    }
  },
  components: { FormResume, Resume, Comments, AppButton, AppAlert }
}
</script>

<template>
  <resume-notification
      v-if="!resumeArrayLocal.length"
      text="Добавьте первый блок чтобы увидеть результат">
  </resume-notification>

  <component v-for="(item, index) in resumeArrayLocal"
             :is="`resume-${item.type}`"
             :key="item.id"
             v-bind="{value: item.text}"
  >
    <app-button
        :btn-type="['small', 'danger', 'round']"
        @action="deleteLine(item.id)">
      <svg viewBox="0 0 24 24" width="8" height="8" class="close">
        <path d="M 2 2 L 22 22 M 2 22 L22 2" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" />
      </svg>
    </app-button>
  </component>
</template>

<script>
import AppButton from "./AppButton";

import ResumeAvatar from "./ResumeAvatar";
import ResumeNotification from "./ResumeNotification";
import ResumeSubtitle from "./ResumeSubtitle";
import ResumeText from "./ResumeText";
import ResumeTitle from "./ResumeTitle";

export default {
  inject: ['resumeArray'],
  emits: ['load-resume', 'delete-item'],

  data() {
    return {
      resumeArrayLocal: this.resumeArray,
    }
  },

  mounted(){
    this.loadResume()
  },

  methods: {
    async loadResume() {
      try {
        const response = await fetch(`${process.env.VUE_APP_DATABASE_URL}resume.json`, {
          method: 'GET'
        });
        const database = await response.json();
        this.resumeArrayLocal = Object.keys(database).map( item => {
          return {
            id: item,
            ...database[item]
          }
        })
        this.$emit('load-resume', this.resumeArrayLocal)
      } catch (error) {
        this.alert = {
          name: 'Записей нет',
          text: 'Начните создавать резюме'
        }
      }
    },

    async deleteLine(id) {
      const responce = await fetch(`${process.env.VUE_APP_DATABASE_URL}resume/${id}.json`, {
        method: 'DELETE',
      });

      this.resumeArrayLocal = this.resumeArrayLocal.filter( item => item.id !== id);
      this.$emit('delete-item', this.resumeArrayLocal)
    },
  },

  components: { AppButton, ResumeAvatar, ResumeNotification, ResumeSubtitle, ResumeText, ResumeTitle }
}
</script>

<style scoped>

</style>
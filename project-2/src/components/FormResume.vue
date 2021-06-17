<template>
  <p> form</p>
  <form class="card card-w30" @submit.prevent="addNewItem">
    <form-resume-select
        v-model="fieldType.type"
        label="Тип блока"
        :options="fieldType.options"
    ></form-resume-select>

    <form-resume-text-area
        v-model.trim="fieldText.model"
        label="Значение"
    ></form-resume-text-area>

    <app-button btn-type="primary" :disabled="fieldText.model.length < 3">Добавить</app-button>
  </form>
</template>

<script>
import FormResumeSelect from './FormResumeSelect'
import FormResumeTextArea from "./FormResumeTextArea";
import AppButton from "./AppButton";

export default {
  emits: ['add-new-item'],
  data() {
    return {
      fieldType: {
        type: 'title',
        options: {
          title: 'Заголовок',
          subtitle: 'Подзаголовок',
          avatar: 'Аватар',
          text: 'Текст'
        }
      },
      fieldText: {
        model: ''
      },
      resumeArrayLocal: [],
    }
  },

  methods: {
    async addNewItem(){
      const responce = await fetch(`${process.env.VUE_APP_DATABASE_URL}resume.json`, {
        method: 'POST',
        header: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          type: this.fieldType.type,
          text: this.fieldText.model
        })
      })
      const database = await responce.json();
      this.resumeArrayLocal = {
        id: database.name,
        type: this.fieldType.type,
        text: this.fieldText.model
      };

      this.$emit('add-new-item', this.resumeArrayLocal)
      this.fieldType.type = 'title';
      this.fieldText.model = '';
      this.alert= null;
    },
  },
  components: { FormResumeSelect, FormResumeTextArea, AppButton }
}
</script>

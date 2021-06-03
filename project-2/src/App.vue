<template>
  <div class="container">
    <app-alert
        v-if="alert"
        :message="alert"
        @close="closeAlert"
        :style="{backgroundColor: 'white'}"
    ></app-alert>
  </div>
  <div class="container column">
    <form class="card card-w30" @submit.prevent="addNewItem">
      <app-select
          v-model="fieldType.type"
          label="Тип блока"
          :options="fieldType.options"
      ></app-select>

      <app-text-area
        v-model.trim="fieldText.model"
        label="Значение"
      ></app-text-area>

      <app-button btn-type="primary" :disabled="fieldText.model.length < 3">Добавить</app-button>
    </form>

    <div class="card card-w70">
      <app-notification
          v-if="!resumeArray.length"
          text="Добавьте первый блок чтобы увидеть результат">
      </app-notification>

      <component :is="`app-${item.type}`"
                 v-bind="{[item.type]: item.text}"
                 v-for="(item, index) in resumeArray"
                 :key="index"
      >
        <app-button
            :btn-type="['small', 'danger', 'round']"
            @action="deleteLine(item.id)">
          <svg viewBox="0 0 24 24" width="8" height="8" class="close">
            <path d="M 2 2 L 22 22 M 2 22 L22 2" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" />
          </svg>
        </app-button>
      </component>
    </div>
  </div>
  <div class="container">
    <p>
      <button class="btn primary" @click="loadComments" :disabled="commentArray.length">Загрузить комментарии</button>
    </p>
    <app-loader v-if="isLoading"></app-loader>
    <div class="card" v-if="commentArray.length">
      <h2>Комментарии</h2>
      <ul class="list">
        <app-comment-card v-for="item in commentArray" :email="item.email" :text="item.body"></app-comment-card>
      </ul>
    </div>

  </div>
</template>

<script>
import AppButton from "./components/AppButton";
import AppCommentCard from "./components/AppCommentCard";
import AppLoader from "./components/AppLoader"
import AppAlert from "./components/AppAlert"

import AppSelect from "./components/form/AppSelect";
import AppTextArea from "./components/form/AppTextArea";

import AppTitle from "./components/resume/AppTitle";
import AppAvatar from "./components/resume/AppAvatar";
import AppSubtitle from "./components/resume/AppSubtitle";
import AppText from "./components/resume/AppText";
import AppNotification from "./components/resume/AppNotification";

export default {
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
      resumeArray: [],
      commentArray: [],
      isLoading: false,
      alert: null,
    }
  },
  mounted(){
    this.loadResume()
  },
  methods: {
    async deleteLine(id) {
      const responce = await fetch(`https://vue-project-2-8806f-default-rtdb.firebaseio.com/resume/${id}.json`, {
        method: 'DELETE',
      });
      this.resumeArray = this.resumeArray.filter( item => item.id !== id);
    },

    async loadResume() {
      try {
        const response = await fetch('https://vue-project-2-8806f-default-rtdb.firebaseio.com/resume.json', {
          method: 'GET'
        });
        const database = await response.json();
        this.resumeArray = Object.keys(database).map( item => {
          return {
            id: item,
            ...database[item]
          }
        })
      } catch (error) {
        this.alert = {
          name: 'Записей нет',
          text: 'Начните создавать резюме'
        }
      }
    },

    async addNewItem(){
      const responce = await fetch('https://vue-project-2-8806f-default-rtdb.firebaseio.com/resume.json', {
        method: 'POST',
        header: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          type: this.fieldType.type,
          text: this.fieldText.model
        })
      })

      this.resumeArray.push({
        type: this.fieldType.type,
        text: this.fieldText.model
      });
      this.fieldType.type = 'title';
      this.fieldText.model = '';
      this.alert= null;
    },

    async loadComments() {
      this.isLoading = true;
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=42', {
          method: 'GET'
        });
        const commentsList = await response.json();
        if(!commentsList) {
          throw new Error('Никто не оставит комментариев :( Будьте первым')
        }
        const res = commentsList.map(item => {
          this.commentArray.push({
            email: item.email,
            body: item.body,
          })
        });
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.alert = {
          name: 'Произошла ошибка',
          text: 'Сервер временно недоступен, повторите попытку позже'
        }
      }
    },
    closeAlert() {
      this.alert = null
    }
  },
  components: {AppText, AppSelect, AppTextArea, AppButton, AppTitle, AppAvatar, AppSubtitle, AppNotification, AppCommentCard, AppLoader, AppAlert}
}
</script>

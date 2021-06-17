<template>
  <p>
    <button class="btn primary" @click="loadComments" :disabled="commentArray.length">Загрузить комментарии</button>
  </p>
  <app-loader v-if="isLoading"></app-loader>
  <div class="card" v-if="commentArray.length">
    <h2>Комментарии</h2>
    <ul class="list">
      <comments-card v-for="item in commentArray" :email="item.email" :text="item.body"></comments-card>
    </ul>
  </div>
</template>

<script>
import AppButton from "./AppButton";
import AppLoader from "./AppLoader"
import CommentsCard from "./CommentsCard";

export default {
  emits: ['show-alert'],
  data() {
    return {
      commentArray: [],
      isLoading: false,
    }
  },
  methods: {
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
          text: 'Сервер временно недоступен, повторите попытку позже',
          type: 'danger',
        };
        this.$emit('show-alert', this.alert);
      }
    },
  },
  components: {AppButton, AppLoader, CommentsCard}
}
</script>

<style scoped>

</style>
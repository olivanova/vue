<template>
  <div class="alert" :class="kind">
    <h3>{{ message.name }}</h3>
    <p>{{ message.text }}</p>
    <button class="btn" @click="$emit('close')">Закрыть окно</button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    kind: {
      type: String,
      required: false,
    }
  }
}
</script>

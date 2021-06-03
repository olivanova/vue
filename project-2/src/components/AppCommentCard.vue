<template>
  <li class="list-item">
    <div>
      <p><strong>{{ email }}</strong></p>
      <small>{{ text }}</small>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
    email: {
      type: String,
    }
  }
}
</script>

<style scoped>

</style>
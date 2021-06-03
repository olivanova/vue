<template>
  <div class="component-wrapper">
    <h2>{{ subtitle }}</h2>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    subtitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
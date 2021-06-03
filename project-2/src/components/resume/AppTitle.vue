<template>
  <div class="component-wrapper">
    <h1>{{ title }}</h1>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
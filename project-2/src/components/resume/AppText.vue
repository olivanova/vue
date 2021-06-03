<template>
  <div class="component-wrapper">
    <p>{{ text}}</p>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
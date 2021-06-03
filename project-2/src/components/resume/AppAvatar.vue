<template>
  <div class="component-wrapper">
    <div class="avatar">
      <img :src="avatar">
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
  .avatar {
    display: flex;
    justify-content: center;
  }

  .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
</style>
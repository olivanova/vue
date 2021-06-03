<template>
  <button :class="['btn', btnType]" @click="$emit('action')">
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    btnType: {
      required: false,
      validator(value) {
        let isValid = true;
        if(typeof value === 'string') {
          return ['', 'primary', 'danger', 'small', 'round'].includes(value)
        } else {
          for(const item of value){
            isValid = ['', 'primary', 'danger', 'small', 'round'].includes(item)
          }
          return isValid
        }
      }
    },
    emits: ['action'],
    text: {
      type: String,
      require: true
    }
  }
}
</script>

<style scoped>

</style>
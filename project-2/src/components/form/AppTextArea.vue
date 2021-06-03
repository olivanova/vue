<template>
  <div class="form-control">
    <label :for="id">{{ label }}</label>
    <textarea
        rows="3"
        :id="id"
        :value="modelValue"
        @input="change"
    ></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: `input-${Math.random}`,
    }
  },
  props: {
    label: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  methods: {
    change(e){
      this.$emit('update:modelValue', e.target.value)
    }
  },
}
</script>

<style scoped>

</style>
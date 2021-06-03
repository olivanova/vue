<template>
  <div class="form-control">
    <label :for="id">{{ label }}</label>
    <select :id="id" @change="change" v-model="modelValue">
      <option
          v-for="(val, key) in fieldType.options"
          :value="key"
          ref="input"
          :key="key"
      >{{ val }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inject: ['fieldType', 'fieldText'],
  data(){
    return {
      id: `type-${Math.random()}`
    }
  },
  props: {
    label: {
      type: String,
      required: false,
    },
    options: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  methods: {
    change(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  },
}
</script>
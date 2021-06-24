<template>
  <span :class="['badge', {
    'primary': type === 'active' || type === 'done',
    'warning': type === 'pending' || type === 'cancelled'
  }]">
    {{ name }}
  </span>
</template>

<script>
export default {
  props: ['type', 'name'],
}
</script>

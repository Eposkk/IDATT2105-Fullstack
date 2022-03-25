<template>
  <p aria-live="assertive" class="errorMessage" :id="id">
    <slot />
  </p>
</template>

<script>
export default {
  name: "BaseErrorMessage",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style scoped>
.errorMessage {
  color: red;
}
</style>

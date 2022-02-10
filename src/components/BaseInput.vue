<template>
  <label :for="uuid" v-if="label">
    {{ label }}
  </label>
  <input
    class="inputField"
    v-bind="{
      ...$attrs,
      onInput: updateValue,
    }"
    :id="uuid"
    :value="modelValue"
    :placeholder="label"
    :aria-describedby="error ? '${uuid}-error' : null"
    :aria-invalid="!!error"
    :class="{ error }"
  />
</template>

<script>
import UniqueId from "../features/UniqueId";
import SetupFormComponent from "../features/SetupFormComponent";
export default {
  name: "BaseInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props, context) {
    const { updateValue } = SetupFormComponent(props, context);
    const uuid = UniqueId().getId();
    return {
      updateValue,
      uuid,
    };
  },
};
</script>

<style scoped></style>

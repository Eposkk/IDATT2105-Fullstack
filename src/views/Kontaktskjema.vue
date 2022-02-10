<template>
  <div class="about">
    <h1>This is an about page</h1>
    <form @submit.prevent="onSubmit">
      <BaseInput label="Name" type="name" :modelValue="name" />
      <BaseInput label="Email" type="email" :modelValue="email" />
    </form>
    <div>
      <ul>
        <li>{{ email }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import BaseInput from "../components/BaseInput";
import { useField, useForm } from "vee-validate";

export default {
  components: { BaseInput },
  setup() {
    const failMessage = "Required Field";
    const validations = {
      email: (value) => {
        if (!value) return failMessage;

        const regexForEmailCheck =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexForEmailCheck.test(String(value).toLowerCase()))
          return "Enter a valid email";
        return true;
      },
      name: (value) => {
        if (value === undefined || value == null) return failMessage;
        if (!String(value).length) return failMessage;
        return true;
      },
      message: (value) => {
        if (value === undefined || value == null) return failMessage;
        if (!String(value).length) return failMessage;
        return true;
      },
    };

    useForm({
      validationSchema: validations,
    });

    const {
      value: email,
      errorMessage: emailError,
      handleChange,
    } = useField("email");
    const { value: name, errorMessage: nameError } = useField("name");
    const { value: message, errorMessage: messageError } = useField("name");

    return {
      email,
      name,
      message,
      emailError,
      nameError,
      messageError,
      handleChange,
    };
  },
};
</script>

<template>
  <div class="about">
    <h1>Contact me</h1>
    <h2>Fill out the form to send an inquiry</h2>
    <form @submit.prevent="onSubmit" id="inputs">
      <BaseInput
        id="input"
        label="Name"
        type="text"
        modelValue=""
        v-model="submission.name"
        :error="nameError"
      />
      <BaseInput
        id="input"
        label="Email"
        type="email"
        modelValue=""
        v-model="submission.email"
        :error="emailError"
      />
      <BaseInput
        id="input"
        label="Message"
        type="text"
        modelValue=""
        v-model="submission.email"
        :error="messageError"
      />
      <button id="input" :disabled="isValid">Submit</button>
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
  data() {
    return {
      submission: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  computed: {
    isValid() {
      return (
        this.submission.email && this.submission.name && this.submission.message
      );
    },
  },
};
</script>

<style scoped>
#inputs {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
  margin: auto;
}

#input {
  margin: 10px;
}

button {
  box-shadow: 0 1px 0 0 #1c1b18;
  background: #eae0c2 linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
  border-radius: 15px;
  border: 2px solid #333029;
  display: inline-block;
  cursor: pointer;
  color: #505739;
  font-family: Arial, serif;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 16px;
  text-decoration: none;
  text-shadow: 0 1px 0 #ffffff;
  margin: 1px;
}

button:hover:enabled {
  background: #ccc2a6 linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  transform: scale(1.05);
}

button:disabled {
  background: #a47e7e;
  cursor: not-allowed;
  color: #1e1b1b;
}
</style>

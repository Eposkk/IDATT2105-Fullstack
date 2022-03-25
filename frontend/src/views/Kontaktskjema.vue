<template>
  <div class="about">
    <h1>Contact me</h1>
    <h2>Fill out the form to send an inquiry</h2>
    <form @submit="submit" id="inputs">
      <BaseInput
        class="input"
        label="Name"
        type="text"
        v-model="name"
        :error="errors.name"
      />
      <BaseInput
        class="input"
        label="Email"
        type="email"
        v-model="email"
        :error="errors.email"
      />
      <BaseInput
        class="input"
        label="Message"
        type="text"
        v-model="message"
        :error="errors.message"
      />
      <button
        id="submitButton"
        type="submit"
        :disabled="errors.name || errors.email || errors.message"
      >
        Submit
      </button>
    </form>
  </div>
</template>
<script>
import BaseInput from "../components/BaseInput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import { useStore } from "vuex";

export default {
  components: { BaseInput },
  setup() {
    const validations = yup.object({
      email: yup.string().required().email(),
      message: yup.string().required(),
      name: yup
        .string()
        .required()
        .matches(/^[A-ÅÆØa-æøå ]*$/, "Please enter valid name"),
    });
    const { handleSubmit, errors } = useForm({
      validationSchema: validations,
      initialValues: {
        name: "",
        email: "",
        message: "",
      },
    });

    const { value: email } = useField("email");
    const { value: name } = useField("name");
    const { value: message } = useField("message");

    const store = useStore();

    name.value = store.state.user;
    email.value = store.state.email;

    const submit = handleSubmit((values) => {
      store.commit("SET_FLASHMESSAGE", "Sending...");
      setTimeout(() => {
        store.commit("SET_USER", name);
        store.commit("SET_EMAIL", email);
        axios
          .post(
            "https://my-json-server.typicode.com/Eposkk/IDATT2105-Fullstack/submission",
            values
          )
          .then(function (response) {
            console.log("Response: " + response);
          })
          .catch(function (err) {
            console.log("Error: " + err);
          });
      }, 2000);

      setTimeout(() => {
        store.commit("SET_FLASHMESSAGE", "Finished");
      }, 1000);

      setTimeout(() => {
        store.commit("SET_FLASHMESSAGE", "");
      }, 2000);
    });

    return {
      email,
      name,
      message,
      errors,
      submit,
    };
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

#submitButton {
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
  margin: 10px;
}

#submitButton:hover:enabled {
  background: #ccc2a6 linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  transform: scale(1.05);
}

#submitButton:disabled {
  background: #5a5545;
  color: #ffffff;
}
</style>

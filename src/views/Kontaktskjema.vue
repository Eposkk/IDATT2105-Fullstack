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
      <button id="submitButton" type="submit">Submit</button>
    </form>
  </div>
</template>
<script>
import BaseInput from "../components/BaseInput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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
    });

    const { value: email } = useField("email");
    const { value: name } = useField("name");
    const { value: message } = useField("message");

    const submit = handleSubmit((values) => {
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
      alert(
        "Email: " +
          values.email +
          "\nName: " +
          values.name +
          "\nMessage: " +
          values.message +
          "\nHas been sent, Thanks for your feedback!"
      );
      const submission = { ...this.submission, id: uuidv4() };
      this.$store
        .dispatch("submitSubmission", submission)
        .then(() => {
          this.$router.push({
            name: "FeedbackDetails",
            params: { id: submission.id },
          });
        })
        .catch((error) => {
          this.$router.push({
            name: "ErrorDisplay",
            params: { error: error },
          });
        });
    });

    return {
      email,
      name,
      message,
      errors,
      submit,
    };
  },
  created() {},
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

#submitButton:hover {
  background: #ccc2a6 linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  transform: scale(1.05);
}
</style>

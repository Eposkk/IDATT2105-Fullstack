<template>
  <div id="inputs">
    <h1 id="header">Please register!</h1>
    <BaseInput class="input" label="Name" type="text" />
    <BaseInput class="input" label="Email" type="email" />
    <div id="username">
      <label>Username:</label>
      <input
        data-test="usernameRegInput"
        type="text"
        name="username"
        v-model="user.username"
      />
    </div>
    <div id="password">
      <label id="passwordLabel">Password: </label>
      <input
        data-test="passwordRegInput"
        type="password"
        v-model="user.password"
      />
    </div>
    <BaseInput class="input" label="Phone Number" type="tel" />

    <button
      id="submitRegistartion"
      v-on:click="handleRegistration"
      data-test="button"
    >
      Register
    </button>
    <label data-test="registrationStatus" v-if="registrationStatus">
      {{ this.registrationStatus }}
    </label>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput";
import store from "@/store";
import { v4 as uuidv4 } from "uuid";

export default {
  components: { BaseInput },
  name: "Register",
  methods: {
    handleRegistration() {
      const user = {
        ...this.user,
        id: uuidv4(),
      };
      if (!(user.username === "" || user.password === "")) {
        console.log(user);
        store.dispatch("postNewUser", user).then(() => {
          setTimeout(
            () =>
              this.$router.push("/login").catch((error) => {
                console.log(error);
              }),
            100
          );
        });
      } else this.registrationStatus = "Please fill out the registration";
    },
  },

  data() {
    return {
      user: {
        id: "",
        username: "",
        password: "",
      },
      registrationStatus: "",
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

#submitRegistartion {
  ox-shadow: 0 1px 0 0 #1c1b18;
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

#submitRegistartion:hover:enabled {
  background: #ccc2a6 linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  transform: scale(1.05);
}
</style>

<template>
  <div id="loginContainer">
    <div id="loginTitle">
      <label>Please login!</label>
    </div>
    <div id="username">
      <label>Username:</label>
      <input
        data-test="userInput"
        type="text"
        name="username"
        v-model="user.username"
      />
    </div>
    <div id="password">
      <label id="passwordLabel">Password: </label>
      <input
        data-test="passwordInput"
        type="password"
        v-model="user.password"
      />
      <button data-test="button" v-on:click="handleClickSignin">Sign in</button>
    </div>
    <div id="loginStatus">
      <h3>{{ this.loginStatus }}</h3>
      <router-link to="/register"><p data-test="loginStatus"></p></router-link>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";
export default {
  name: "LoginComponent",
  methods: {
    async handleClickSignin() {
      let gotResponse = false;
      let response;
      try {
        response = await store.dispatch("fetchUserName", this.user);
        gotResponse = true;
      } catch (exception) {
        gotResponse = false;
      }
      console.log(gotResponse);

      console.log(response);
      if (gotResponse === false) {
        this.loginStatus = "Wrong credentials";
        store.commit("SET_LOGINSTATUS", false);
        console.log("Wrong credentials");
      } else {
        this.loginStatus = "Logged in";
        store.commit("SET_LOGINSTATUS", true);
        await router.push("/homepage");
        console.log(store.getters.getLoginStatus);
        console.log("Logged in");
      }
    },
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      loginStatus: "",
    };
  },
};
</script>

<style scoped>
#loginContainer {
  display: grid;
  justify-content: center;
  margin: 40px;
}

#loginTitle {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
}

#username,
#password {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
  margin: 10px;
}

#usernameLabel,
#passwordLabel {
  width: 100px;
}
</style>

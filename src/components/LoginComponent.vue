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
      <router-link to="/register"
        ><p data-test="loginStatus" v-if="loginStatus">
          {{ loginStatus }}
        </p></router-link
      >
    </div>
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";
export default {
  name: "LoginComponent",
  methods: {
    handleClickSignin() {
      store.dispatch("fetchUserName", this.user.username);
      console.log(this.user.username);
      if (store.state.currentUser.username === this.user.username) {
        if (store.state.currentUser.password === this.user.password) {
          this.loginStatus = "Logged in";
          router.push("/");
          console.log("Logged in");
        } else {
          this.loginStatus =
            "Username or password is wrong, register by clicking me";
          console.log("Not logged in");
        }
      } else {
        this.loginStatus = "Username not found, register by clicking me";
        console.log("Not logged in");
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
  mounted() {
    store.dispatch("fetchUsers");
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

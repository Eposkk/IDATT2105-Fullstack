<template>
  <div id="loginContainer">
    <div id="loginTitle">
      <label>Please login!</label>
    </div>
    <div id="username">
      <label id="usernameLabel">Username:</label>
      <input v-model="user.username" />
    </div>
    <div id="password">
      <label id="passwordLabel">Password: </label>
      <input v-model="user.password" />
      <button v-on:click="handleClickSignin">Sign in</button>
    </div>
    <router-link to="/register"
      ><p v-if="loginStatus">{{ loginStatus }}</p></router-link
    >
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  methods: {
    handleClickSignin() {
      this.$store.dispatch("fetchUserName", this.user.username);
      if (this.$store.state.currentUser.username === this.user.username) {
        if (this.$store.state.currentUser.password === this.user.password) {
          this.$router.push("/");
          this.loginStatus = "Logged in";
          this.$store.state.console.log("Logged i");
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
    this.$store.dispatch("fetchUsers");
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

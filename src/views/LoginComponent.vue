<template>
  <div id="loginContainer">
    <div id="loginTitle">
      <label>Please login!</label>
    </div>
    <div id="username">
      <label id="usernameLabel">Username:</label>
      <textarea v-model="user.username"></textarea>
    </div>
    <div id="password">
      <label id="passwordLabel">Password: </label>
      <textarea v-model="user.password"></textarea>
      <button v-on:click="handleClickSignin_2">Sign in</button>
    </div>
    <router-link to="/register"
      ><p>{{ loginStatus }}</p></router-link
    >
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  methods: {
    handleClickSignin_2() {
      this.$store.dispatch("fetchUserName", this.user.username);
      if (this.$store.state.currentUser.username === this.user.username) {
        if (this.$store.state.currentUser.password === this.user.password) {
          this.$router.push("/");
          this.loginStatus = "Logged in";
          this.$store.state.console.log("Logged i");
        } else {
          this.loginStatus = "Not logged in, register by clicking me";
          console.log("Not logged in");
        }
      } else {
        this.loginStatus = "Not logged in, register by clicking me";
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
}

#usernameLabel,
#passwordLabel {
  width: 100px;
}
</style>

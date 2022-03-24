<template>
  <div id="flashMessage" v-if="this.$store.state.flashMessage">
    {{ this.$store.state.flashMessage }}
  </div>
  <div id="nav">
    <router-link class="routerLink" to="/">Home</router-link>
    <router-link class="routerLink" to="/about">About</router-link>
    <router-link class="routerLink" to="/kontaktskjema">Contact me</router-link>
    <router-link
      class="routerLink"
      to="/login"
      v-if="!this.$store.getters.getLoginStatus"
      >Login</router-link
    >

    <router-link
      class="routerLink"
      to="/register"
      v-if="!this.$store.getters.getLoginStatus"
      >Register
    </router-link>

    <router-link
      class="routerLink"
      v-if="this.$store.getters.getLoginStatus"
      to="/homepage"
    >
      {{ "Logged in: " + this.$store.getters.getName.username }}
    </router-link>
  </div>
  <router-view class="view" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #23262d;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.routerLink {
  padding: 4px;
}

@keyframes fade {
  from {
    background: #42b983;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: fade;
  animation-duration: 2s;
  color: black;
}
</style>

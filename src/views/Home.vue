<template>
  <div>
    <h1 v-if="!name">Hi, please login!</h1>
    <div v-if="name">
      <h1>Welcome {{ name }}</h1>
      <router-link class="routerLink" to="/calculator">Calculator</router-link>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "Home",
  setup() {
    const name = store.state.currentUser.username;
    return {
      name,
    };
  },
};
</script>

<style></style>

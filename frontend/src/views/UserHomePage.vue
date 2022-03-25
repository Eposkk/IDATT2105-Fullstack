<template>
  <h1>Hi {{ this.$store.getters.getName.username }}</h1>
  <button @click="handleLogout">Log out</button>
</template>

<script>
import store from "@/store";
import router from "@/router";
export default {
  name: "UserHomePage",

  methods: {
    handleLogout() {
      store.commit("SET_LOGINSTATUS", false);
      store.commit("SET_CURRENT_TOKEN", "");
      store.commit("SET_CURRENT_USER", "");
      store.commit("SET_USER", "");
      router.push("/");
    },
  },
};
</script>

<style scoped>
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

button:hover {
  background: #ccc2a6 linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  transform: scale(1.05);
}
button:active {
  box-shadow: 0 4px 8px;
  transform: scale(0.98);
}
</style>

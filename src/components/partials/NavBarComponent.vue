<script setup>
import {useAuthStore} from "@/store/auth";
const authStore = useAuthStore()
</script>

<template>
  <div class="fixed w-full">
    <nav class="bg-[#282828]">
      <router-link to="/">Home</router-link>
      <template v-if="!authStore.user">
        <router-link to="/register">Sign Up</router-link>
        <router-link to="/login">Sign In</router-link>
      </template>
      <template v-else>
        <router-link to="/">Projects</router-link>
      </template>
    </nav>
  </div>
</template>

<style scoped>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #FFC700;
  padding: 10px;
}

nav a.router-link-exact-active {
  color: #FFFFFF;
}
</style>

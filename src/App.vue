<script setup>
import NavBarComponent from "@/components/partials/NavBarComponent.vue";
import {onBeforeMount} from "vue";
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
onBeforeMount(() => {
  authStore.getAuthUser()
      .catch(e => {
    console.log(e);
  })
})

</script>

<template>
  <NavBarComponent/>
  <div class="pt-16">
    <router-view/>
  </div>
</template>

<style>

</style>

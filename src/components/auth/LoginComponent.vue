<script setup>

import {useForm} from "vee-validate";
import * as yup from 'yup';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
// eslint-disable-next-line no-unused-vars
const {values, errors, defineField} = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  }),
});
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = () => {
  if (!errors.value.length) {
    let data = {
      email: email.value,
      password: password.value
    }
    authStore.login(data).then((data) => {
      console.log(data);
      if (data.success) {
        router.push({name: 'projectsIndex'})
      }
    })

  } else {
    alert(500)
  }
}
</script>

<template>
  <div class="">
    <div class=" min-h-screen flex items-center">
      <div class="w-full">
        <h2 class="text-center text-black font-bold text-2xl uppercase mb-10">Sign In</h2>
        <div class="bg-[#FFC700] text-black p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
          <form @submit.prevent="onSubmit" action="">
            <div class="mb-5">
              <label for="email" class="block mb-2 font-bold ">E-mail</label>
              <input type="text" v-model="email" v-bind="emailAttrs" id="email" name="email"
                     placeholder="Put in your E-mail." class="border border-gray-300 shadow p-3 w-full rounded mb-">
            </div>

            <div class="mb-5">
              <label for="password" class="block mb-2 font-bold ">Password</label>
              <input v-model="password" v-bind="passwordAttrs" type="password" id="password"
                     name="password" placeholder="Put in your Password."
                     class="border border-red-300 shadow p-3 w-full rounded mb-">
            </div>

            <button class="block w-full bg-black text-white font-bold p-4 rounded-lg">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

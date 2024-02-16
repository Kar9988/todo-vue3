<script setup>
import {useForm} from "vee-validate";
import * as yup from 'yup';
import {defineProps, defineEmits} from 'vue'
import { useCardStore } from "@/store/card";
import { useListStore } from "@/store/list";
import {useRoute} from 'vue-router'

const route = useRoute()
const cardStore = useCardStore()
const listStore = useListStore()

const emits = defineEmits(['toggle'])
// eslint-disable-next-line no-unused-vars
const {values, errors, defineField} = useForm({
  validationSchema: yup.object({
    title: yup.string().required(),
    description: yup.string().min(60).required(),
  }),
});
const [title, titleAttrs] = defineField('title');
const [description, descriptionAttrs] = defineField('description');

const props = defineProps({
  isModalVisible: {
    type: Boolean,
    required: true
  },
  listId: {
    type: Number,
    required: true
  }
})
const toggle = () => {
  emits('toggle')
}
const createCard = () => {
  let data = {
    title: title.value,
    description: description.value,
    list_id: props.listId
  }
  cardStore.createCard(data).then((data) => {
    if (data.success) {
      listStore.getProjectLists(route.params.projectId)
      emits('toggle')
    }
  })
}
</script>

<template>
  <div>

    <transition name="fade">

      <div v-show="props.isModalVisible" class="fixed inset-0 z-30">

        <!--       background -->
        <div v-show="props.isModalVisible" @click="toggle" class="bg-filter bg-white opacity-75 fixed inset-0 w-full h-full z-20">
        </div>
        <!--          -->
        <main class="flex flex-col items-center justify-center h-full w-full">
          <transition name="fade-up-down">
            <div v-show="props.isModalVisible" class="modal-wrapper flex items-center z-30">
              <div class="modal max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl min-w-[1024px] md:max-w-2xl bg-white max-h-screen shadow-lg flex-row rounded relative">

                <div class="modal-header p-5 bg-[#282828] text-gray-900 rounded-t">
                  <h5 class="text-white text-2xl uppercase">Create new Card</h5>
                </div>
                <div class="modal-body p-5 w-full h-full overflow-y-auto ">
                  <form @submit.prevent="createCard" action="">
                    <div class="mb-5">
                      <label for="title" class="block mb-2 font-bold ">Title</label>
                      <input type="text" v-model="title" v-bind="titleAttrs" id="title" name="title"
                             class="border border-gray-300 shadow p-3 w-full rounded mb-">
                    </div>

                    <div class="mb-5">
                      <label for="password" class="block mb-2 font-bold ">Description</label>
                      <textarea rows="5" cols="96" v-model="description" v-bind="descriptionAttrs" class="border border-gray-300 resize rounded-md"></textarea>

                    </div>
                  </form>
                </div>
                <div class="modal-footer py-3 px-5 border0-t text-right">
                  <button class="bg-red-400 mr-3 rounded-lg px-5 py-2 text-black" @click="toggle">Cancel</button>
                  <button class="bg-[#FFC700] rounded-lg px-5 py-2 text-black" @click.prevent="createCard">Create</button>
                </div>
              </div>
            </div>
          </transition>


        </main>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.modal-body{
  max-height: 500px;
}
.bg-gray-800-opacity{
  background-color: #2D374850;
}
@media screen and (max-width: 768px){
  .modal-body {
    max-height: 400px;
  }
}

/* animation for vue transition tag */

.fade-up-down-enter-active {
  transition: all 0.3s ease;
}
.fade-up-down-leave-active {
  transition: all 0.3s ease;
}
.fade-up-down-enter {
  transform: translateY(10%);
  opacity: 0;
}
.fade-up-down-leave-to {
  transform: translateY(10%);
  opacity: 0;
}

.fade-enter-active{
  -webkit-transition: opacity 2s;
  transition: opacity .3s;

}
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter,
.fade-leave-to{
  opacity: 0;
}


</style>

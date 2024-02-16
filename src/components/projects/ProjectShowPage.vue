<script setup>
import {computed, onMounted, ref} from "vue";
import PlusComponent from "@/assets/icons/PlusComponent.vue";
import CardCreateModal from "@/components/projects/modals/CardCreateModal.vue";
import {useListStore} from "@/store/list";
import {useCardStore} from "@/store/card";
import {useRoute} from 'vue-router'
import moment from "moment";

const route = useRoute()
const listStore = useListStore()
const cardStore = useCardStore()
const newLists = ref([])
const selectedListId = ref(null)
const addNewList = () => {
  newLists.value.push({
    title: ''
  })
}
const saveNewList = (title) => {
  let data = {
    title: title,
    project_id: route.params.projectId
  }
  listStore.createList(data).then(() => {
    listStore.getProjectLists(route.params.projectId)
  })
}
const isOpen = ref(false)
let timeInterval;
const onToggle = (listId) => {
  if (listId) {
    selectedListId.value = listId
  }
  isOpen.value = !isOpen.value
}
const startTimer = (card, fetch = false) => {
  if (card.tracker_active && !fetch) {
    cardStore.endTimer(card.id)
    clearInterval(timeInterval);
    card.tracker_active = false
  } else {
    cardStore.startTimer(card.id)
    timeInterval = setInterval(() => {
      updateTimer(card)
    }, 1000);
    card.tracker_active = true
  }
}
const updateTimer = (card) => {
  if (!card.tracker) {
    card.tracker = 1
  } else {
    card.tracker++
  }
}
const formattedTime = (seconds, card) => {
  if (card.tracker_active && card.tracker_started) {
    return  moment.utc(moment().diff(moment(card.tracker_started), 'seconds')*1000).format('HH:mm:ss')
  } else if (card && !card.tracker_started && card.tracker) {
    return  moment.utc(card.tracker*1000).format('HH:mm:ss')
  } else {
    console.log(seconds, card?.name)
    return moment.utc(seconds*1000).format('HH:mm:ss');
  }
}

const isModalVisible = computed(() => {
  return isOpen.value
})
// const saveAllLists = () => {
//   console.log(newLists.value)
// }

onMounted(() => {
  listStore.getProjectLists(route.params.projectId).then(() => {
    listStore.lists.forEach((list) => {
      list.cards.forEach((card) => {
        if (card.tracker_active) {
          startTimer(card, true)
        }
      })
    });
  })
})

</script>

<template>
  <div class="flex flex-wrap justify-center mt-10">
    <!--    <div v-if="newLists.length > 1" class="p-4 max-w-sm">-->
    <!--      <div @click="saveAllLists()" class="cursor-pointer flex items-center rounded-lg bg-[#FFC700] p-4 w-[228px]">-->
    <!--        Save All-->
    <!--      </div>-->
    <!--    </div>-->
    <div v-for="(list, index) in listStore.lists" :key="index" class="p-4 border-2 rounded-2xl mr-2 max-w-sm min-w-96">
      <h2 class="text-lg font-medium">{{ list.title }}</h2>
      <div v-for="(card, cardIndex) in list.cards" :key="`card-${cardIndex}`"
           class="flex rounded-lg bg-[#282828] p-8 flex-col mt-2">
        <div class="flex items-center mb-3">
          <div
              class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#FFC700] text-white flex-shrink-0">
          </div>
          <h2 class="text-white dark:text-white text-lg font-medium">{{ card.title }}</h2>
        </div>
        <div class="flex flex-col justify-between flex-grow">
          <button v-if="!card.tracker_active" @click.prevent="startTimer(card)"
                  class="bg-[#FFC700] w-7/12 rounded-lg px-5 py-2 text-black">
                        Start {{ formattedTime(card.tracker??0, card)}}
          </button>
          <button v-else @click.prevent="startTimer(card)"
                  class="bg-[#FFC700] w-7/12 rounded-lg px-5 py-2 text-black">
                        Pause {{ formattedTime(card.tracker??0, card)}}
          </button>
        </div>
      </div>
      <div @click="onToggle(list.id)" class="cursor-pointer mt-3 flex items-center rounded-lg bg-[#00000021] hover:bg-[#00000047] p-4">
        <PlusComponent/>
        <p class="ml-3">Add a card</p>
      </div>
    </div>
    <div v-for="(list, index) in newLists" :key="`newList-${index}`" class="p-4 border-2 rounded-2xl mr-2 max-w-sm">
      <div class="mb-5">
        <label for="name" class="block mb-2 font-bold ">Name</label>
        <input type="text" v-model="list.title" id="name" name="name"
               class="border border-gray-300 shadow p-3 w-full rounded mb-">
        <button class="mt-2 bg-[#FFC700] rounded-lg px-5 py-2 text-black" @click="saveNewList(list.title)">Save</button>
      </div>

    </div>
    <div class="p-4 max-w-sm">
      <div @click="addNewList()"
           class="cursor-pointer flex items-center rounded-lg bg-[#00000021] hover:bg-[#00000047] p-4 w-[228px]">
        <PlusComponent/>
        <p class="ml-3">Add another list</p>
      </div>
    </div>
    <CardCreateModal @toggle="onToggle" :is-modal-visible="isModalVisible" :list-id="selectedListId"></CardCreateModal>

  </div>
</template>

<style scoped>

</style>

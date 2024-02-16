<script setup>
import PlusComponent from "@/assets/icons/PlusComponent.vue";
import {ref, computed, onMounted} from "vue";
import ProjectCreateModal from "@/components/projects/modals/ProjectCreateModal.vue";
import {useProjectStore} from '@/store/project'
import moment from "moment/moment";

const projectStore = useProjectStore()
const isOpen = ref(false)
const onToggle = () => {
  isOpen.value = !isOpen.value
}
onMounted(() => {
  projectStore.getUserProjects()
})
const isModalVisible = computed(() => {
  return isOpen.value
})
const projects = computed(() => {
  return projectStore.projects
})
const formattedTime = (seconds) => {
  return moment.utc((seconds??0) * 1000).format('HH:mm:ss');
}
</script>

<template>
  <div class="flex flex-wrap justify-center mt-10">
    <div v-for="(project, index) in projects" :key="index" class="p-4 max-w-sm">
      <div class="flex rounded-lg h-full bg-[#282828] p-8 flex-col">
        <div class="flex items-center mb-3">
          <div
              class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#FFC700] text-white flex-shrink-0">
          </div>
          <h2 class="text-white dark:text-white text-lg font-medium">{{ project.name }}</h2>
        </div>
        <div class="flex flex-col justify-between flex-grow">
          <p class="leading-relaxed text-base text-white dark:text-gray-300">
            Worked total: {{ formattedTime(project.list_cards_sum_tracker) }}
          </p>
          <router-link class="mt-3 text-black dark:text-white hover:text-[#FFC700] inline-flex items-center"
                       :to="`/project/${project.id}`">
            Explore
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                 stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
    <div class="p-4 max-w-sm h-full">
      <div @click="onToggle" class="cursor-pointer flex rounded-lg h-full bg-[#9ca3af] p-8 flex-col">
        <PlusComponent/>
      </div>
    </div>
    <ProjectCreateModal @toggle="onToggle" :is-modal-visible="isModalVisible"/>

  </div>

</template>

<style scoped>

</style>

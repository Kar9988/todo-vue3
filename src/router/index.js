import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from "@/components/auth/RegisterComponent.vue";
import LoginComponent from "@/components/auth/LoginComponent.vue";
import ProjectsList from "@/components/projects/ProjectsList.vue";
import ProjectShowPage from "@/components/projects/ProjectShowPage.vue";

const routes = [
  {
    path: '/',
    name: 'projectsIndex',
    component: ProjectsList
  },
  {
    path: '/project/:projectId',
    name: 'projectShow',
    component: ProjectShowPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to) => {
  if (!localStorage.getItem('token') && to.name !== 'login' && to.name !== 'register') {

    return {
      name: 'login'
    }
  }
  if (localStorage.getItem('token') && (to.name === 'login' || to.name === 'register')) {
    return {
      name: 'projectsIndex'
    }
  }
})

export default router

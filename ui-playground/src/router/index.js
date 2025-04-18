import { createRouter, createWebHistory } from 'vue-router'


const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/About', component: About},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

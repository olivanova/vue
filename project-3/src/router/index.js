import { createRouter, createWebHistory} from 'vue-router';
import New from "../views/New";
import Task from "../views/Task";

const Tasks = () => import(
  /* webpackChunkName: "tasks" */
  /* webpackMode: "lazy-once" */
  '../views/Tasks')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Tasks, name: 'index' },
    { path: '/new', component: New, name: 'new' },
    { path: '/tasks/:taskId?', component: Task, props: true },
  ],
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})

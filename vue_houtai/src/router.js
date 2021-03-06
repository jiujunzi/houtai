import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Home from './components/Home'
import Welcome from './components/Welcome'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home, redirect: '/welcome', children: [{ path: '/welcome', component: Welcome }] }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // 如果访问的路劲是login，就直接放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 判定有无token
  if (!tokenStr) return next('/login')
  next()
})
export default router

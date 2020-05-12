const Home = () => import("../views/Home")

export default [
  {
    path: "home",
    component: Home,
    meta: { requiresAuth: true },
    alias: ["home", ""]
  }
]
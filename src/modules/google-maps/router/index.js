const Home = () => import("../views/Home")

export default [
  {
    path: "google-maps",
    component: Home,
    meta: { requiresAuth: true },
  }
]
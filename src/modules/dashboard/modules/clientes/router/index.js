const clientes = () => import("../views/Clientes")

export default [
  {
    path: "clientes",
    component: clientes,
    meta: { requiresAuth: true },
    alias: ["home", ""]
  }
]
const orcamento = () => import("../views/Orcamento")

export default [
  {
    path: "clientes/orcamento",
    component: orcamento,
    meta: { requiresAuth: true },
  }
]
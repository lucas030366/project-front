import clientesRoutes from "../modules/clientes/router"

const Dashboard = () => import("../views/Dashboard")

export default [
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      ...clientesRoutes
    ]
  }
]
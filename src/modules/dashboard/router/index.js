import homeRoutes from "@/modules/home/router"
import clientsRoutes from "../../clientes/router"

const Dashboard = () => import("../views/Dashboard")

export default [
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      ...homeRoutes,
      ...clientsRoutes
    ]
  }
]
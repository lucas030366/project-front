import homeRoutes from "@/modules/home/router"
import clientsRoutes from "../../clientes/router"
import orcamentoRoutes from "../../orcamento/router"
import googleMaps from "../../google-maps/router"

const Dashboard = () => import("../views/Dashboard")

export default [

  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      ...homeRoutes,
      ...clientsRoutes,
      ...orcamentoRoutes,
      ...googleMaps,
    ]
  }
]
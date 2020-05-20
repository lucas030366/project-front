import apollo from "@/plugins/apollo"

import OrderQuery from "../Order.gql"
import AllOrdersQuery from "../AllOrders.gql"
import ExactOrderQuery from "../ExactOrder.gql"

const order = async ({ clientId }) => {
  const response = await apollo.query({
    query: OrderQuery,
    variables: {
      clientId
    }
  })
  return response.data.orders
}

const allOrders = async () => {
  const response = await apollo.query({
    query: AllOrdersQuery
  })
  return response.data.orders
}

const exactOrder = async ({ orderId }) => {
  const response = await apollo.query({
    query: ExactOrderQuery,
    variables: {
      orderId
    }
  })
  return response.data.order
}

export default {
  order,
  exactOrder,
  allOrders
}
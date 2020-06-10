import apollo from "@/plugins/apollo"
import { from } from "rxjs"
import { map } from "rxjs/operators"

import OrderQuery from "../Order.gql"
import AllOrdersQuery from "../AllOrders.gql"
import ExactOrderQuery from "../ExactOrder.gql"

import CreateOrderMutation from "../CreateOrder.gql"


const order = async ({ clientId }) => {
  const response = await apollo.query({
    query: OrderQuery,
    variables: {
      clientId
    }
  })
  return response.data.orders
}

const allOrders = () => {
  const queryRef = apollo.watchQuery({
    query: AllOrdersQuery
  })
  return from(queryRef).pipe(map(response => response.data.orders))
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


/********************************************/

const createOrder = async variables => {
  const response = await apollo.mutate({
    mutation: CreateOrderMutation,
    variables,
    update: (proxy, { data: { createOrder } }) => {
      console.log(createOrder)
      try {
        const data = proxy.readQuery({
          query: AllOrdersQuery
        })
 
        data.orders = [...data.orders, createOrder]

        proxy.writeQuery({
          query: AllOrdersQuery,
          data
        })

      } catch (error) {
        console.log("Erro observable:", error)
      }

    }
  })
  return response.data.createOrder
}

export default {
  order,
  exactOrder,
  allOrders,
  createOrder
}
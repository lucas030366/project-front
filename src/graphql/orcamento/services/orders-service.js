import apollo from "@/plugins/apollo"
import { from } from "rxjs"
import { map } from "rxjs/operators"

import OrderQuery from "../Order.gql"
import AllOrdersQuery from "../AllOrders.gql"
import ExactOrderQuery from "../ExactOrder.gql"

import CreateOrderMutation from "../CreateOrder.gql"
import DeleteOrderMutation from "../DeleteOrder.gql"
import UpdateOrderMutation from "../UpdateOrder.gql"


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

const deleteOrder = async (orderId) => {
  const response = await apollo.mutate({
    mutation: DeleteOrderMutation,
    variables: {
      orderId
    },
    update: (proxy, { data: { deleteOrder } }) => {

      try {
        const data = proxy.readQuery({
          query: AllOrdersQuery
        })

        const indice = data.orders.findIndex(t => t.id == deleteOrder.id)
        data.orders.splice(indice, 1)

        proxy.writeQuery({
          query: AllOrdersQuery,
          data
        })

      } catch (error) {
        console.log(error)
      }
    }
  })
  return response.data.deleteOrder

}

const updateOrder = async variables => {
  const response = await apollo.mutate({
    mutation: UpdateOrderMutation,
    variables: {
      clientId: variables.client.id,
      orderId: variables.id,
      descricao: variables.descricao,
      valor: +variables.valor,
      status: variables.status
    },
    update: (proxy, { data: { updateOrder } }) => {

      try {
        const data = proxy.readQuery({
          query: AllOrdersQuery
        })

        const indice = data.orders.findIndex(t => t.id === updateOrder.id)
        data.orders.splice(indice, 1, updateOrder)

        proxy.writeQuery({
          query: AllOrdersQuery,
          data
        })

      } catch (error) {
        console.log(error)
      }

    }
  })
  return response.data.updateOrder
}

export default {
  order,
  exactOrder,
  allOrders,
  createOrder,
  deleteOrder,
  updateOrder
}
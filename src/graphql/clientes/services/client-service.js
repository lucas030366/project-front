import apollo from "@/plugins/apollo"
import { from } from "rxjs"
import { map } from "rxjs/operators"

import ClientsQuery from "../Clients.gql"
import UpdateClientMutation from "../UpdateClient.gql"
import CreateClientMutation from "../CreateClient.gql"
import DeleteClientMutation from "../DeleteClient.gql"

const clients = (options = {}) => {
  const queryRef = apollo.watchQuery({
    query: ClientsQuery,
    ...options
  })
  return from(queryRef).pipe(map(response => response.data.clients))
}

/**********************************************************/

const clienteCampos = (variables, usaId) => {
  let fields = {
    nome: variables.nome,
    endereco: variables.endereco,
    telefone: variables.telefone,
    cep: variables.cep,
    complemento: variables.complemento,
    numero: +variables.numero,
    status_cli: variables.status_cli,
    status_ord: variables.status_ord,
    status_pay: variables.status_pay
  }

  if (usaId) {
    const id = { id: variables.id }
    return Object.assign(fields, id)
  }

  return fields
}

const createClient = async variables => {
  const fields = clienteCampos(variables, true)
  const response = await apollo.mutate({
    mutation: CreateClientMutation,
    variables: fields,
    update: (proxy, { data: { createClient } }) => {

      try {
        const data = proxy.readQuery({
          query: ClientsQuery
        })

        data.clients = [...data.clients, createClient]

        proxy.writeQuery({
          query: ClientsQuery,
          data
        })

      } catch (error) {
        console.log("Erro observable:", error)
      }

    }
  })

  return response.data.createClient
}

const updateClient = async variables => {
  const fields = clienteCampos(variables, true)
  const response = await apollo.mutate({
    mutation: UpdateClientMutation,
    variables: fields,
    update: (proxy, { data: { updateClient } }) => {
      try {
        const data = proxy.readQuery({
          query: ClientsQuery
        })

        const indice = data.clients.findIndex(t => t.id === updateClient.id)
        data.clients.splice(indice, 1, updateClient)

        proxy.writeQuery({
          query: ClientsQuery,
          data
        })

      } catch (error) {
        console.log(error)
      }

    }
  })

  return response.data.updateClient
}

const deleteClient = async (clientId) => {
  const response = await apollo.mutate({
    mutation: DeleteClientMutation,
    variables: {
      clientId
    },
    update: (proxy, { data: { deleteClient } }) => {

      try {
        const data = proxy.readQuery({
          query: ClientsQuery
        })

        const indice = data.clients.findIndex(t => t.id == deleteClient.id)
        data.clients.splice(indice, 1)

        proxy.writeQuery({
          query: ClientsQuery,
          data
        })

      } catch (error) {
        console.log(error)
      }
    }
  })
  return response.data.deleteClient

}

export default {
  clients,
  createClient,
  updateClient,
  deleteClient
}
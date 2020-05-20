import apollo from "@/plugins/apollo"

import ClientsQuery from "../Clients.gql"
import UpdateClientMutation from "../UpdateClient.gql"
import CreateClientMutation from "../CreateClient.gql"
import DeleteClientMutation from "../DeleteClient.gql"

const clients = async (options = {}) => {
  const response = await apollo.query({
    query: ClientsQuery,
    ...options
  })
  return response.data.clients //nome da query em ClientsQuery
}


/**********************************************************/
const updateClient = async variables => {
  const response = await apollo.mutate({
    mutation: UpdateClientMutation,
    variables
  })
  return response.data.updateClient
}

const createClient = async variables => {
  console.log(variables)
  const response = await apollo.mutate({
    mutation: CreateClientMutation,
    variables
  })
  return response.data.createClient
}

const deleteClient = async (clientId) => {
  console.log(clientId)
  const response = await apollo.mutate({
    mutation: DeleteClientMutation,
    variables: {
      clientId
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
import apollo from "@/plugins/apollo"

import ClientsQuery from "../Clients.gql"
import UpdateClientMutation from "../UpdateClient.gql"

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

export default {
  clients,
  updateClient
}
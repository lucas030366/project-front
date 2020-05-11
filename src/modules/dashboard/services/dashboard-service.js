import apollo from "@/plugins/apollo"

import ClientsQuery from "../graphql/Clients.gql"

const clients = async ( options = {} ) => {
  const response = await apollo.query({
    query: ClientsQuery,
    ...options
  })
  return response.data.clients //nome da query em ClientsQuery
}


export default {
  clients
}
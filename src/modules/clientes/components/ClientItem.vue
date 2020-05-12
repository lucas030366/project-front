<template>
<div>
  <ClientListItem v-for="cliente of clients" :key="cliente.id" :client="cliente" />
  </div>
</template>

<script>

import authService from "../services/client-service"

import ClientListItem from "./ClientListItem"

export default {
  name: "Clientes",
  components: {
    ClientListItem
  },
  data(){
    return{
      clients: []
    }
  },
  async created(){
    this.clients = await authService.clients()
  }
}
</script>
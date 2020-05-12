<template>
  <div>
    <h3 v-for="cliente of clients" :key="cliente.id">{{ cliente }}</h3>
  </div>
</template>

<script>

import authService from "../services/client-service"

export default {
  name: "Clientes",
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
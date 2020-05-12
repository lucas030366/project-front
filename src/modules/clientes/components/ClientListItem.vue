<template>
  <div>
    <h3> {{client.nome}} </h3>
  </div>
</template>

<script>
export default {
  name: "ClientListItem",
  props: {
    client: Object
  }
}
</script>
<template>
  <div>
    <AppNavDrawer />
    <v-app-bar color="indigo" app dense dark>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <i class="fas fa-sign-out-alt fa-lg"></i>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import AppNavDrawer from "./AppNavDrawer";

import apollo, { onLogout } from "@/plugins/apollo";

export default {
  name: "AppToolbar",
  components: { AppNavDrawer },
  methods: {
    async logout() {
      this.$router.push("/login");
      await onLogout(apollo);
    },
  },
};
</script>
<template>
  <v-navigation-drawer v-model="showNav" permanent :mini-variant="mini" dark app color="#263238">
    <v-list >
      <v-list-item class="pl-2">
        <v-list-item-avatar>
          <v-btn icon text @click="mini = !mini">
            <v-icon>fas fa-user-circle</v-icon>
          </v-btn>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.nome }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider light />

      <v-list-item v-for="item of items" :key="item.title" :to="item.url" :exact="item.exact">
        <v-list-item-icon class="mr-4" :title="item.title">
          <v-icon size="18">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bolder">{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import authService from "@/graphql/auth/services/auth-service";

export default {
  name: "NavDrawer",
  data() {
    return {
      items: [
        {
          title: "Home",
          icon: "fas fa-home",
          url: "/dashboard",
          exact: true,
        },
        {
          title: "Clientes",
          icon: "fas fa-users",
          url: "/dashboard/clientes",
          exact: true,
        },
        {
          title: "Orçamentos",
          icon: "fas fa-folder-open",
          url: "/dashboard/clientes/orcamento",
          exact: true,
        },
        {
          title: "Mapa",
          icon: "fas fa-map",
          url: "/dashboard/google-maps",
          exact: true,
        },
      ],
      mini: true,
      showNav: true,
      user: [],
    };
  },
  async created() {
    this.user = await authService.user();
  },
};
</script>
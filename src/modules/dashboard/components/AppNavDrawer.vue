<template>
	<v-navigation-drawer v-model="showNav" :mini-variant="mini" dark app color="blue-grey darken-4">
		<v-list>
			<v-list-item v-if="mini">
				<v-list-item-action class="justify-center">
					<v-btn icon text @click="mini = !mini">
						<v-icon>fas fa-chevron-right</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>

			<v-list-item>
				<v-list-item-icon>
					<v-icon>fas fa-user-circle</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ user.nome }}</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action>
					<v-btn icon text @click="mini = !mini">
						<v-icon>fas fa-chevron-left</v-icon>
					</v-btn>
				</v-list-item-action>
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

			<!-- <v-list-group prepend-icon="fas fa-users">
				<template v-slot:activator>
					<v-list-item-content>
						<v-list-item-title>Clientes</v-list-item-title>
					</v-list-item-content>
				</template>
				<v-list-item sub-group v-for="(crud, i) in cruds" :key="i">
					<v-list-item-title v-text="crud[0]"></v-list-item-title>
					<v-list-item-action>
						<v-icon v-text="crud[1]"></v-icon>
					</v-list-item-action>
				</v-list-item>
			</v-list-group>-->
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import authService from "@/graphql/auth/services/auth-service";

export default {
	name: "NavDrawer",
	props: {
		showNav: Boolean
	},
	data() {
		return {
			cruds: [
				["Create", "fas fa-plus"],
				["Read", "fas fa-edit"],
				["Update", "fas fa-user"],
				["Delete", "fas fa-trash"]
			],
			items: [
				{
					title: "Home",
					icon: "fas fa-home",
					url: "/dashboard",
					exact: true
				},
				{
					title: "Clientes",
					icon: "fas fa-users",
					url: "/dashboard/clientes",
					exact: true
				},
				{
					title: "Orçamentos",
					icon: "fas fa-folder-open",
					url: "/dashboard/clientes/orcamento",
					exact: true
				}
			],
			mini: false,
			user: []
		};
	},
	async created() {
		this.user = await authService.user();
	}
};
</script>
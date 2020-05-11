<template>
	<v-navigation-drawer v-model="showNav" :mini-variant="mini" dark app color="blue darken-2">
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
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>{{item.title}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>

import authService from "@/modules/auth/services/auth-service"

export default {
	name: "NavDrawer",
	props: {
		showNav: Boolean
	},
	data() {
		return {
			items: [
				{
					title: "Home",
					icon: "fas fa-tachometer-alt",
					url: "/dashboard",
					exact: true
				},
				{
					title: "Clientes",
					icon: "fas fa-user-alt",
					url: "/dashboard/clientes",
					exact: true
				}
			],
			mini: false,
			user: []
		};
	},
	async created(){
		this.user = await authService.user()
	}
};
</script>
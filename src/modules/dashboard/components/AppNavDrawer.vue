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

			<v-list-group prepend-icon="fas fa-user-circle" value="true">
				<template v-slot:activator>
					<v-list-item-title>Users</v-list-item-title>
				</template>

				<v-list-group no-action sub-group value="true">
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title>Admin</v-list-item-title>
						</v-list-item-content>
					</template>

					<v-list-item v-for="(admin, i) in admins" :key="i" link>
						<v-list-item-title v-text="admin[0]"></v-list-item-title>
						<v-list-item-icon>
							<v-icon v-text="admin[1]"></v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list-group>

				<v-list-group sub-group no-action>
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title>Actions</v-list-item-title>
						</v-list-item-content>
					</template>
					<v-list-item v-for="(crud, i) in cruds" :key="i">
						<v-list-item-title v-text="crud[0]"></v-list-item-title>
						<v-list-item-action>
							<v-icon v-text="crud[1]"></v-icon>
						</v-list-item-action>
					</v-list-item>
				</v-list-group>
			</v-list-group>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import authService from "@/modules/auth/services/auth-service";

export default {
	name: "NavDrawer",
	props: {
		showNav: Boolean
	},
	data() {
		return {
			admins: [
				["Management", "fas fa-user"],
				["Settings", "fas fa-user"]
			],
			cruds: [
				["Create", "fas fa-plus"],
				["Read", "fas fa-edit"],
				["Update", "fas fa-user"],
				["Delete", "fas fa-trash"]
			],
			items: [
				{
					title: "Home",
					icon: "fas fa-tachometer-alt",
					url: "/dashboard",
					exact: true
				},
				{
					title: "Clientes",
					icon: "fas fa-users",
					url: "/dashboard/clientes",
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
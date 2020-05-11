<template>
	<div>
		<AppNavDrawer :showNav="drawer"/>
		<v-app-bar app color="indigo" dark>
			<v-app-bar-nav-icon @click="drawer = !drawer" />
			<v-toolbar-title>Dashboard</v-toolbar-title>
		</v-app-bar>
	</div>
</template>

<script>
import AppNavDrawer from "./AppNavDrawer";

export default {
	name: "AppToolbar",
	components: {
		AppNavDrawer
	},
	data() {
		return {
			drawer: true
		};
	}
};
</script>
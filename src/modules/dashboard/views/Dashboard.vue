<template>
	<v-container>
		<h3>teste</h3>
		<h3>{{ user.nome }}</h3>
	</v-container>
</template>

<script>
import AuthService from "@/modules/auth/services/auth-service";
export default {
	name: "AppMenu",
	data() {
		return {
		user: []
		};
	},
	async created() {
		this.user = await AuthService.user();
	}
};
</script>
<template>
	<section>
		<AppLayout />
		<router-view></router-view>
	</section>
</template>

<script>
import AppLayout from "../components/AppLayout";

export default {
	name: "Clientes",
	components: {
		AppLayout
	}
};
</script>
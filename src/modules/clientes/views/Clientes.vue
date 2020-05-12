<template>
	<AppLayout>
		<router-view></router-view>
	</AppLayout>
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
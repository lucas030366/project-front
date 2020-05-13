<template>
	<v-dialog v-model="show" max-width="290" >
		<v-card>
			<v-card-title class="headline">{{resolve}}</v-card-title>

			<v-card-text>
				Let Google help apps determine location.
				This means sending anonymous location data to Google, even when no apps are running.
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: "Modal",
	props: {
		show: Boolean
	},
	data() {
		return {
			resolve: undefined
		};
	}
};
</script>
<template>
	<section>
		<AppToolbar />

		<v-container grid-list-md>
			<v-layout>
				<v-flex md12>
					<slot />
					<!--Puxando o router view de Dashboard-->
				</v-flex>
			</v-layout>
		</v-container>

		<AppFooter />
	</section>
</template>

<script>
import AppToolbar from "./AppToolbar";

import AppFooter from "./AppFooter";

export default {
	name: "AppLayout",
	components: {
		AppFooter,
		AppToolbar
	},
	data() {
		return {
			drawer: true
		};
	}
};
</script>
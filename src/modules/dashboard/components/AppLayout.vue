<template>
	<section>
		<AppToolbar />

		<AppContent />

		<AppFooter />
	</section>
</template>

<script>
import AppToolbar from "./AppToolbar";

import AppFooter from "./AppFooter";
import AppContent from "./AppContent";

export default {
	name: "AppLayout",
	components: {
		AppFooter,
		AppToolbar,
		AppContent
	},
	data() {
		return {
			drawer: true
		};
	}
};
</script>
<template>
	<v-fab-transition>
		<v-tooltip top>
			<template v-slot:activator="{ on }">
				<v-btn
					@click="showDialogCreate"
					v-on="on"
					absolute
					fab
					large
					dark
					bottom
					right
					color="green darken-2"
					class="mb-5 mr-5"
				>
					<v-icon>fas fa-plus</v-icon>
				</v-btn>
			</template>
			<span>Novo cliente</span>
		</v-tooltip>
	</v-fab-transition>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("clientes");

export default {
	name: "AppFloatingButton",
	data() {
		return {
			show: false
		};
	},
	methods: {
		...mapActions(["setModalCreate"]),
		showDialogCreate() {
			this.setModalCreate({ showModalCreate: true });
		}
	}
};
</script>
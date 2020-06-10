<template>
	<v-fab-transition>
		<v-tooltip top>
			<template v-slot:activator="{ on }">
				<v-btn
					@click="showDialogCreate(type)"
					v-on="on"
					absolute
					fab
					large
					dark
					bottom
					right
					color="#0ba25d"
					class="mb-5 mr-5"
				>
					<v-icon>fas fa-plus</v-icon>
				</v-btn>
			</template>
			<span>Novo {{ typeFormated }}</span>
		</v-tooltip>
	</v-fab-transition>
</template>

<script>
import { createNamespacedHelpers, Store } from "vuex";
const clientesStore = createNamespacedHelpers("clientes");
const orcamentosStore = createNamespacedHelpers("orcamentos");

export default {
	name: "AppFloatingButton",
	props: {
		type: String
	},
	data() {
		return {
			show: false
		};
	},
	methods: {
		...clientesStore.mapActions(['setModalCreateClient']),
		...orcamentosStore.mapActions(['setModalCreateOrcamento']),
		showDialogCreate(type) {
			switch (type) {
				case "cliente":
					this.setModalCreateClient({ showModalCreateClient: true });
					break;
				case "orcamento":
					this.setModalCreateOrcamento({ showModalCreateOrcamento: true });
					break;
				default:
					break;
			}
		}
	},
	computed: {
		...orcamentosStore.mapState(["showModalEditOrcamento"]),
		typeFormated(){
			return this.type == "cliente" ? "Cliente" : "Orçamento"
		}
	}
};
</script>
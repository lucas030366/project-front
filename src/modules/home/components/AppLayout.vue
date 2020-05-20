<template>
	<section>
		<v-container grid-list-md>
			<v-row>
				<v-col lg="4">
					<v-card class="mx-auto pa-3" dark tile elevation="2" color="#00c0ef">
						<v-row>
							<v-col lg="8">
								<h3 class="display-2 font-weight-medium">{{ clientes.length }}</h3>
								<h6 class="font-weight-bolder title">Clientes</h6>
							</v-col>
							<v-col>
								<v-icon color="rgba(0,0,0,0.15)" size="50">fas fa-user</v-icon>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
				<v-col lg="4">
					<v-card outlined tile class="pa-5">Contagem Orçamentos</v-card>
				</v-col>
				<v-col lg="4">
					<v-card outlined tile class="pa-5">ROI</v-card>
				</v-col>
			</v-row>

			<v-row>
				<v-col lg="4">
					<v-card outlined tile class="pa-5">TESTE</v-card>
				</v-col>
				<v-col lg="4">
					<v-card outlined tile class="pa-5">TESTE</v-card>
				</v-col>
				<v-col lg="4">
					<v-card outlined tile class="pa-5">TESTE</v-card>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script>
import ClientService from "@/graphql/clientes/services/client-service";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("clientes");

export default {
	name: "AppLayoutHome",
	data() {
		return {
			clientesCount: null
		};
	},
	methods: {
		...mapActions(["setClientes"])
	},
	computed: {
		...mapState(["clientes"])
	},
	async created() {
		this.setClientes(await ClientService.clients());
	}
};
</script>
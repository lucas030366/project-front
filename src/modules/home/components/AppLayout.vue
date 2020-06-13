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
					<v-card class="mx-auto pa-3" dark tile elevation="2" color="#3bce62">
						<v-row>
							<v-col lg="8">
								<h3 class="display-2 font-weight-medium">{{ orders.length }}</h3>
								<h6 class="font-weight-bolder title">Orçamentos Ativos</h6>
							</v-col>
							<v-col>
								<v-icon color="rgba(0,0,0,0.15)" size="50">fas fa-folder-open</v-icon>
							</v-col>
						</v-row>
					</v-card>
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
import { Subject } from "rxjs";

import ClientService from "@/graphql/clientes/services/client-service";
import OrcamentosService from "@/graphql/orcamento/services/orders-service"

export default {
	name: "AppLayoutHome",
	data() {
		return {
			clientes: [],
			orders: [],
			subject$: new Subject(),
			subscriptions: []
		};
	},
	methods: {
		setInit() {
			this.subscriptions.push(
				ClientService.clients().subscribe(clients => (this.clientes = clients))
			);
			this.subscriptions.push(
				OrcamentosService.allOrders().subscribe(orders => this.orders = orders)
			)
		}
	},
	created() {
		this.setInit();
	},
	destroyed() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}
};
</script>
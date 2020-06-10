<template>
	<section>
		<v-simple-table fixedHeader>
			<thead>
				<tr>
					<th class="subtitle-1 font-weight-bold">Nome</th>
					<th class="subtitle-1 font-weight-bold">Endereço</th>
					<th class="subtitle-1 font-weight-bold">Contato</th>
					<th class="subtitle-1 font-weight-bold">Opções</th>
				</tr>
			</thead>
			<tbody>
				<ClientListItem v-for="cliente of clientes" :key="cliente.id" :client="cliente" />
			</tbody>
		</v-simple-table>

		<AppFloatingButton :type="type" />

		<ModalCreate :show="showModalCreateClient" />
	</section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("clientes");

import { Subject } from "rxjs";

import ClientService from "@/graphql/clientes/services/client-service";

import ClientListItem from "./ClientListItem";
import AppFloatingButton from "../../shared/AppFloatingButton";
import ModalCreate from "./ModalCreate";

export default {
	name: "Clientes",
	components: {
		ClientListItem,
		AppFloatingButton,
		ModalCreate
	},
	data() {
		return {
			show: null,
			subject$: new Subject(),
			subscriptions: [],
			clientes: [],
			type: "cliente"
		};
	},
	methods: {
		...mapActions(["setClientes"]),
		value(val) {
			this.show = val;
		},
		setClients() {
			this.subscriptions.push(
				ClientService.clients().subscribe(clients => this.clientes = clients)
			);
		}
	},
	computed: {
		...mapState(["showModalCreateClient"])
	},
	created() {
		this.setClients()
	},
	destroyed(){
		this.subscriptions.forEach(s => s.unsubscribe());
	}
};
</script>
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
	</section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("clientes");

import ClientService from "@/graphql/clientes/services/client-service";

import ClientListItem from "./ClientListItem";

export default {
	name: "Clientes",
	components: {
		ClientListItem
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
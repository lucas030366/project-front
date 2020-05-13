<template>
	<v-simple-table fixedHeader>
		<thead>
			<tr>
				<th class="text-left subtitle-1 font-weight-bold">Nome</th>
				<th class="text-left subtitle-1 font-weight-bold">Endereço</th>
				<th class="text-left subtitle-1 font-weight-bold">Opções</th>
			</tr>
		</thead>
		<tbody>
			<ClientListItem v-for="cliente of clients" :key="cliente.id" :client="cliente" />
		</tbody>
	</v-simple-table>
</template>

<script>
import authService from "../services/client-service";

import ClientListItem from "./ClientListItem";

export default {
	name: "Clientes",
	components: {
		ClientListItem
	},
	data() {
		return {
			clients: []
		};
	},
	async created() {
		this.clients = await authService.clients();
	}
};
</script>
<template>
	<tr>
		<td>{{ client.nome }}</td>
		<td>{{ client.endereco }}</td>
		<td>{{ client.telefone }}</td>
		<td>
			<v-tooltip color="black" top>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" text fab>
						<v-icon size="17" color="grey darken-4">fas fa-calculator</v-icon>
					</v-btn>
				</template>
				<span>orçamento</span>
			</v-tooltip>
			<v-tooltip color="black" top>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" text fab @click="editar(client)">
						<v-icon size="17" color="blue darken-2">fas fa-edit</v-icon>
					</v-btn>
				</template>
				<span>editar</span>
			</v-tooltip>
			<v-tooltip color="black" top>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" text fab>
						<v-icon size="17" color="red darken-2">fas fa-trash-alt</v-icon>
					</v-btn>
				</template>
				<span>excluir</span>
			</v-tooltip>
		</td>
		<ModalEdit :show="showModalEdit" />
	</tr>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("clientes");

import ModalEdit from "./ModalEdit";

export default {
	name: "ClientListItem",
	components: {
		ModalEdit
	},
	props: {
		client: Object
	},
	methods: {
		...mapActions(["setClient", "setModalEdit"]),
		editar(client) {
			this.setModalEdit({ showModalEdit: true });
			this.setClient({ cliente: client });
		}
	},
	computed: {
		...mapState(["cliente", "showModalEdit"])
	}
};
</script>
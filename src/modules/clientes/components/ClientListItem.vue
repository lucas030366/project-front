<template>
	<tr>
		<td>{{ client.nome }}</td>
		<td>{{ client.endereco }}</td>
		<td>{{ (client.telefone) }}</td>
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
					<v-btn v-on="on" text fab @click="deletar(client.id)">
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

import FormatPhoneMixin from "@/mixins/format-phone";

import ClientService from "@/graphql/clientes/services/client-service";

import ModalEdit from "./ModalEdit";

import { Subject } from 'rxjs';
import { mergeMap } from "rxjs/operators";


export default {
	name: "ClientListItem",
	mixins: [FormatPhoneMixin],
	components: {
		ModalEdit
	},
	props: {
		client: Object
	},
	data(){
		return{
			subject$: new Subject()
		}
	},
	methods: {
		...mapActions(["setClient", "setModalEdit"]),
		async editar(client) {
			this.setModalEdit({ showModalEdit: true });
			await this.setClient({ cliente: client });
		},
		async deletar(client) {
			const confirm = window.confirm("Deseja excluir esse cliente?");
			try {
				if (confirm) {					
					await ClientService.deleteClient(client);
				}
			} catch (error) {
				console.log(error);
			}
		}
	},
	computed: {
		...mapState(["cliente", "showModalEdit"])
	}
};
</script>
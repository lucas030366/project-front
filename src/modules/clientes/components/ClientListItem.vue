<template>
	<tr>
		<td>{{ client.nome }}</td>
		<td>{{ client.endereco }}</td>
		<td>
			<v-tooltip color="black" top>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" text fab @click="editar(client)">
						<v-icon size="17" color="grey darken-4">fas fa-calculator</v-icon>
					</v-btn>
				</template>
				<span>orçamento {{ cliente }}</span>
			</v-tooltip>
			<v-tooltip color="black" top>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" text fab>
						<v-icon size="17" color="primary">fas fa-edit</v-icon>
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
	</tr>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
	name: "ClientListItem",
	props: {
		client: Object
	},
	data() {
		return {
			show: false,
			teste: null
		};
	},
	methods: {
		...mapActions(["setClient"]),
		editar(client) {
			this.teste = { client };
			this.setClient({ cliente: this.teste });
		}
	},
	computed: {
		...mapState(["cliente"])
	}
};
</script>
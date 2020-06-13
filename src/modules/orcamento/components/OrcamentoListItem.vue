<template>
	<tr>
		<td>
			<v-btn class="white--text btn-custom pa-3" :color="status.color" x-small rounded>{{ status.text }}</v-btn>
		</td>
		<td>{{ orcamento.descricao }}</td>
		<td>{{ formatCurrency(orcamento.valor) }}</td>
		<td>{{ orcamento.client.nome }}</td>
		<td>
			<v-tooltip color="black" top>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" text fab @click="editar(orcamento)">
						<v-icon size="17" color="blue darken-2">fas fa-edit</v-icon>
					</v-btn>
				</template>
				<span>editar</span>
			</v-tooltip>
			<v-tooltip color="black" top>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" text fab @click="deletar(orcamento.id)">
						<v-icon size="17" color="red darken-2">fas fa-trash-alt</v-icon>
					</v-btn>
				</template>
				<span>excluir</span>
			</v-tooltip>
		</td>
	</tr>
</template>

<script>
import OrcamentosService from "@/graphql/orcamento/services/orders-service"

import currencyFormartMixin from "@/mixins/format-currency";

export default {
	name: "OrcamentoListItem",
	mixins: [currencyFormartMixin],
	props: {
		orcamento: Object
	},
	methods: {
		editar(order) {
			console.log(order.id);
		},
		async deletar(order) {
			const confirm = window.confirm("Deseja excluir esse Orçamento?");
			try {
				if (confirm) {					
					await OrcamentosService.deleteOrder(order);
				}
			} catch (error) {
				console.log(error);
			}
		}
	},
	computed: {
		status() {
			let orcamento = { text: null, color: null };
			switch (this.orcamento.status) {
				case "AGUARDANDO":
					orcamento = { text: "Aguardando", color: "orange" };
					break;
				case "EXECUTANDO":
					orcamento = { text: "Executando", color: "#1867c0" };
					break;
				case "CONCLUIDO":
					orcamento = { text: "Concluido", color: "green darken-2" };
					break;
				case "CANCELADO":
					orcamento = { text: "Cancelado", color: "red" };
					break;

				default:
					orcamento = { text: "Aguardando", color: "orange" };
					break;
			}
			return orcamento;
		}
	}
};
</script>

<style scoped>
	.btn-custom{
		min-width: 8rem !important;
	}
</style>
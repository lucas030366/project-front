<template>
	<tr>
		<td>{{ orcamento.descricao }}</td>
		<td>{{ formatCurrency(orcamento.valor) }}</td>
		<td>{{ orcamento.client.nome }}</td>
	</tr>
</template>

<script>
import currencyFormartMixin from "@/mixins/format-currency";

export default {
	name: "OrcamentoListItem",
	mixins: [currencyFormartMixin],
	props: {
		orcamento: Object
	}
};
</script>
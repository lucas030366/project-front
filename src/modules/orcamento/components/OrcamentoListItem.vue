<template>
	<tr>
		<td>{{ orcamento.descricao }}</td>
		<td>{{ orcamento.valor }}</td>
		<td>{{ orcamento.client.nome }}</td>
	</tr>
</template>

<script>
export default {
	name: "OrcamentoListItem",
	props: {
		orcamento: Object
	}
};
</script>
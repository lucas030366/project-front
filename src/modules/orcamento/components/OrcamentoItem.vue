<template>
	<section>
		<v-simple-table fixedHeader>
			<thead>
				<tr>
					<th class="subtitle-1 font-weight-bold">Descrição</th>
					<th class="subtitle-1 font-weight-bold">Valor</th>
					<th class="subtitle-1 font-weight-bold">Contato</th>
				</tr>
			</thead>
			<tbody>
				<OrcamentoListItem v-for="orcamento of orders" :key="orcamento.id" :orcamento="orcamento" />
			</tbody>
		</v-simple-table>
	</section>
</template>

<script>
import OrcamentoListItem from "./OrcamentoListItem";

import ordersService from "../services/orders-service";

export default {
	name: "OrcamentoItem",
	components: {
		OrcamentoListItem
	},
	data() {
		return {
			orders: []
		};
	},
	async created() {
		this.orders = await ordersService.allOrders();
	}
};
</script>
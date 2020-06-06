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

		<AppFloatingButton :type="type" />

		<ModalCreate :show="showModalCreateOrcamento" />
	</section>
</template>

<script>
import OrcamentoListItem from "./OrcamentoListItem";
import AppFloatingButton from "../../clientes/components/AppFloatingButton";
import ModalCreate from "./ModalCreate";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("orcamentos");

import OrdersService from "@/graphql/orcamento/services/orders-service";

export default {
	name: "OrcamentoItem",
	components: {
		OrcamentoListItem,
		AppFloatingButton,
		ModalCreate
	},
	data() {
		return {
			orders: [],
			type: "orcamento"
		};
	},
	computed: {
		...mapState(["showModalCreateOrcamento"])
	},
	async created() {
		this.orders = await OrdersService.allOrders();
	}
};
</script>
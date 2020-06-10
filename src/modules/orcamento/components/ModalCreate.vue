<template>
	<v-row id="modalEditar" justify="center">
		<v-dialog v-model="show" persistent max-width="900">
			<v-card>
				<v-card-title>
					<span class="headline">Novo Orçamento</span>
					<v-spacer />
					<v-progress-circular v-if="isLoading" indeterminate color="primary" />
				</v-card-title>
				<v-card-text>
					<v-container>
						<input type="hidden" />
						<v-col lg="12">
							<v-select
								:items="clientes"
								item-text="nome"
								item-value="id"
								label="Cliente"
								prepend-icon="fas fa-user"
								v-model="orcamento.cliente"
							></v-select>
						</v-col>

						<v-col lg="12">
							<v-textarea
								auto-grow
								label="Descrição"
								rows="2"
								row-height="20"
								prepend-icon="fas fa-comments"
								v-model="orcamento.descricao"
							></v-textarea>
						</v-col>
						<v-col lg="12">
							<v-text-field
								label="Valor"
								type="number"
								clearable
								prepend-icon="fas fa-dollar-sign"
								v-model="orcamento.valor"
							/>
						</v-col>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red darken-3" :disabled="isLoading" class="white--text" @click="fechar">
						Fechar
						<v-icon class="ml-2" size="16">fas fa-times</v-icon>
					</v-btn>
					<v-btn color="green darken-1" :disabled="isLoading" class="white--text" @click="submit">
						Salvar
						<v-icon class="ml-2" size="16">fas fa-check</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const orcamentosStore = createNamespacedHelpers("orcamentos");

import { Subject } from "rxjs";
import { mergeMap } from "rxjs/operators";

import ClientService from "@/graphql/clientes/services/client-service";
import OrcamentosService from "@/graphql/orcamento/services/orders-service";

export default {
	name: "modalEditar",
	props: {
		show: Boolean
	},
	data() {
		return {
			isLoading: false,
			orcamento: {
				cliente: null,
				descricao: null,
				valor: null
			},
			clientes: [],
			subject$: new Subject(),
			subscriptions: []
		};
	},
	methods: {
		...orcamentosStore.mapActions(["setModalCreateOrcamento"]),
		setClients() {
			this.subscriptions.push(
				ClientService.clients().subscribe(clients => (this.clientes = clients))
			);
		},
		reset() {
			var self = this;
			Object.keys(this.orcamento).forEach(function(key, index) {
				self.orcamento[key] = null;
			});
		},
		fechar() {
			this.setModalCreateOrcamento({ showModalCreateOrcamento: false });
			this.reset();
		},
		async submit() {
			let order = {
				clientId: this.orcamento.cliente,
				descricao: this.orcamento.descricao,
				valor: +this.orcamento.valor
			};

			try {
				await OrcamentosService.createOrder(order);
				this.fechar();
			} catch (error) {
				console.log(error);
			} finally {
				this.isLoading = false;
			}
		}
	},
	computed: {
		...orcamentosStore.mapState(["showModalCreateOrcamento"])
	},
	created() {
		this.setClients();
	},
	destroyed() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}
};
</script>
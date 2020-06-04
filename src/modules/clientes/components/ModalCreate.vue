<template>
	<v-row id="modalEditar" justify="center">
		<v-dialog v-model="show" persistent max-width="600px">
			<v-card>
				<v-card-title>
					<span class="headline">Novo Cadastro</span>
					<v-spacer />
					<v-progress-circular v-if="isLoading" indeterminate color="primary" />
				</v-card-title>
				<v-card-text>
					<v-container>
						<input type="hidden" />
						<v-col lg="12">
							<v-text-field
								label="Nome completo"
								clearable
								v-model="user.nome"
								prepend-icon="fas fa-user-tag"
							/>
						</v-col>

						<v-col lg="12">
							<v-text-field
								label="Endereço"
								clearable
								v-model="user.endereco"
								prepend-icon="fas fa-map-marker-alt"
							/>
						</v-col>
						<v-col lg="12">
							<v-text-field
								label="Telefone"
								clearable
								v-model="user.telefone"
								prepend-icon="fas fa-phone"
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
const { mapState, mapActions } = createNamespacedHelpers("clientes");

import { Subject } from "rxjs";
import { mergeMap } from "rxjs/operators";

import ClientService from "@/graphql/clientes/services/client-service";

export default {
	name: "modalEditar",
	props: {
		show: Boolean
	},
	data() {
		return {
			isLoading: false,
			user: {
				nome: null,
				endereco: null,
				telefone: null
			},
			subject$: new Subject()
		};
	},
	methods: {
		...mapActions(["setModalCreate", "setClientes"]),
		fechar() {
			this.setModalCreate({ showModalCreate: false });
			// this.reset();
		},
		reset() {
			var self = this;

			Object.keys(this.user).forEach(function(key, index) {
				self.user[key] = null;
			});
		},
		async submit() {
			this.isLoading = true;

			try {
				await ClientService.createClient(this.user);
				ClientService.clients().subscribe(clients => this.setClientes(clients));
				this.fechar();
			} catch (error) {
				console.log(error);
			} finally {
				this.isLoading = false;
			}
		}
	},
	computed: {
		...mapState(["cliente"])
	}
};
</script>
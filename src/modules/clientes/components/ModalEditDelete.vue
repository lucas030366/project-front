<template>
	<v-row id="modalEditar" justify="center" v-if="cliente">
		<v-dialog v-model="show" persistent max-width="600px">
			<v-card>
				<v-card-title>
					<span class="headline">Editar Cadastro</span>
					<v-spacer />
					<v-progress-circular v-if="isLoading" indeterminate color="primary" />
				</v-card-title>
				<v-card-text>
					<v-container>
						<input type="hidden" :value="cliente.id" />
						<v-col lg="12">
							<v-text-field
								label="Nome completo"
								clearable
								:value="cliente.nome"
								v-model.trim="copyClient.nome"
								prepend-icon="fas fa-user-tag"
							/>
						</v-col>

						<v-col lg="12">
							<v-text-field
								label="Endereço"
								clearable
								:value="cliente.endereco"
								v-model.trim="copyClient.endereco"
								prepend-icon="fas fa-map-marker-alt"
							/>
						</v-col>
						<v-col lg="12">
							<v-text-field
								label="Telefone"
								clearable
								:value="cliente.telefone"
								v-model.trim="copyClient.telefone"
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

import FormatPhoneMixin from "@/mixins/format-phone";

import clientService from "@/graphql/clientes/services/client-service";

export default {
	name: "ModalEditDelete",
	props: {
		show: Boolean
	},
	mixins: [FormatPhoneMixin],
	data() {
		return {
			isLoading: false
		};
	},
	methods: {
		...mapActions(["setModalEditClient", "setClientes"]),
		fechar() {
			this.setModalEditClient({ showModalEditClient: false });
		},
		async submit() {
			this.isLoading = true;
			try {
				await clientService.updateClient(this.copyClient);
				this.setClientes(await clientService.clients());
				this.fechar();
			} catch (error) {
				console.log(error);
			} finally {
				this.isLoading = false;
			}
		}
	},
	computed: {
		...mapState(["cliente", "showModalEditClient"]),
		copyClient() {
			return { ...this.cliente };
		}
	}
};
</script>
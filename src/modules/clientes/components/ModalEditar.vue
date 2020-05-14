<template>
	<v-row id="modalEditar" justify="center" v-if="cliente">
		<v-dialog v-model="show" persistent max-width="600px">
			<v-card>
				<v-card-title>
					<span class="headline">Editar Cadastro</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-col lg="12">
							<v-text-field
								label="Nome completo"
								clearable
								:value="cliente.nome"
								prepend-icon="fas fa-user-tag"
							/>
						</v-col>

						<v-col lg="12">
							<v-text-field
								label="Endereço"
								clearable
								:value="cliente.endereco"
								prepend-icon="fas fa-map-marker-alt"
							/>
						</v-col>
						<v-col lg="12">
							<v-text-field
								label="Telefone"
								clearable
								:value="cliente.telefone"
								prepend-icon="fas fa-phone"
							/>
						</v-col>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red darken-3" class="white--text" @click="fechar">
						Fechar
						<v-icon class="ml-2" size="16">fas fa-times</v-icon>
					</v-btn>
					<v-btn color="green darken-1" class="white--text">
						Salvar
						<v-icon class="ml-2" size="16">fas fa-check</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
	name: "modalEditar",
	props: {
		show: Boolean
	},
	methods: {
		...mapActions(["setModal"]),
		fechar() {
			this.setModal({ showModal: false });
		}
	},
	computed: {
		...mapState(["cliente", "showModal"])
	}
};
</script>
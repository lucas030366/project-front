<template>
  <v-row id="modalEditar" justify="center" v-if="cliente">
    <v-dialog v-model="show" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Editar Cadastro</span>
          <v-spacer />
          <v-progress-circular v-if="isLoading" indeterminate color="primary" />
        </v-card-title>

        <v-container>
          <v-form>
            <v-row>
              <v-col lg="6">
                <v-text-field label="Nome completo" outlined filled v-model.trim="client.nome" />
              </v-col>

              <v-col lg="6">
                <v-text-field label="Telefone" outlined filled v-model.trim="client.telefone" />
              </v-col>
            </v-row>

            <v-row>
              <v-col class="d-inline-flex">
                <v-text-field label="CEP" outlined filled v-model.trim="client.cep" />

                <v-btn icon class="mt-3 ml-1">
                  <i class="fas fa-map-marker-alt fa-2x pa-3"></i>
                </v-btn>
              </v-col>

              <v-col lg="5">
                <v-text-field label="Endereço" outlined filled v-model.trim="client.endereco" />
              </v-col>

              <v-col>
                <v-text-field
                  label="Complemento"
                  outlined
                  filled
                  v-model.trim="client.complemento"
                />
              </v-col>

              <v-col lg="2">
                <v-text-field
                  label="Numero"
                  type="number"
                  outlined
                  filled
                  v-model.trim="client.numero"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col lg="2">
                <v-switch color="blue darknen-5" label="Ativo" v-model.trim="client.status_cli"></v-switch>
              </v-col>
              <v-col lg="3">
                <v-switch label="Orçamento em aberto" v-model.trim="client.status_ord"></v-switch>
              </v-col>
              <v-col lg="3">
                <v-switch
                  color="red darknen-5"
                  label="Dívidas em aberto"
                  v-model.trim="client.status_pay"
                ></v-switch>
              </v-col>
            </v-row>
          </v-form>
        </v-container>

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
import { copyFile } from "fs";

export default {
  name: "ModalEditDelete",
  props: {
    show: Boolean,
  },
  mixins: [FormatPhoneMixin],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["setModalEditClient"]),
    fechar() {
      this.setModalEditClient({ showModalEditClient: false });
    },
    async submit() {
      this.isLoading = true;
      try {
        await clientService.updateClient(this.client);
        this.fechar();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    ...mapState(["cliente", "showModalEditClient"]),
    client() {
      return Object.assign({}, this.cliente);
    },
  },
};
</script>
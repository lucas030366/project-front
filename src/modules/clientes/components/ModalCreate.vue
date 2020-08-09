<template>
  <v-row id="modalEditar" justify="center">
    <v-dialog v-model="show" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Novo Cadastro</span>
          <v-spacer />
          <v-progress-circular v-if="isLoading" indeterminate color="primary" />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form>
              <v-row>
                <v-col lg="6">
                  <v-text-field label="Nome completo" outlined filled v-model.trim="user.nome" />
                </v-col>

                <v-col lg="6">
                  <v-text-field label="Telefone" outlined filled v-model.trim="user.telefone" />
                </v-col>
              </v-row>

              <v-row>
                <v-col class="d-inline-flex">
                  <v-text-field label="CEP" outlined filled v-model.trim="user.cep" />

                  <v-btn icon class="mt-3 ml-1">
                    <i class="fas fa-map-marker-alt fa-2x pa-3"></i>
                  </v-btn>
                </v-col>

                <v-col lg="5">
                  <v-text-field label="Endereço" outlined filled v-model.trim="user.endereco" />
                </v-col>

                <v-col>
                  <v-text-field
                    label="Complemento"
                    outlined
                    filled
                    v-model.trim="user.complemento"
                  />
                </v-col>

                <v-col lg="2">
                  <v-text-field
                    label="Número"
                    type="number"
                    outlined
                    filled
                    v-model.trim="user.numero"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col lg="2">
                  <v-switch color="blue darknen-5" label="Ativo" v-model.trim="user.status_cli"></v-switch>
                </v-col>
                <v-col lg="3">
                  <v-switch label="Orçamento em aberto" v-model.trim="user.status_ord"></v-switch>
                </v-col>
                <v-col lg="3">
                  <v-switch
                    color="red darknen-5"
                    label="Dívidas em aberto"
                    v-model.trim="user.status_pay"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-form>
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
    show: Boolean,
  },
  data() {
    return {
      isLoading: false,
      user: {
        nome: null,
        endereco: null,
        telefone: null,
        cep: null,
        complemento: null,
        numero: null,
        status_cli: true,
        status_ord: null,
        status_pay: null,
      },
      subject$: new Subject(),
    };
  },
  methods: {
    ...mapActions(["setModalCreateClient", "setClientes"]),
    fechar() {
      this.setModalCreateClient({ showModalCreateClient: false });
      this.reset();
    },
    reset() {
      const self = this;

      Object.keys(this.user).forEach((element) => {
        let campos = self.user[element];
        campos == false ? (self.user[element] = null) : null;
      });
    },
    async submit() {
      this.isLoading = true;

      try {
        await ClientService.createClient(this.user);
        ClientService.clients().subscribe((clients) =>
          this.setClientes(clients)
        );
        this.fechar();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    ...mapState(["cliente"]),
  },
};
</script>
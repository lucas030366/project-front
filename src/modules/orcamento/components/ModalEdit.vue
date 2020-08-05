<template>
  <v-row id="modalEditar" justify="center">
    <v-dialog v-model="show" persistent max-width="900" v-if="orcamento">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Orçamento</span>
          <v-spacer />
          <v-progress-circular v-if="isLoading" indeterminate color="primary" />
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="d-flex justify-center">
              <v-radio-group v-model="order.status" row>
                <v-radio
                  v-for="action of status"
                  :key="action.value"
                  :label="action.type"
                  :value="action.value"
                  :color="action.color"
                ></v-radio>
              </v-radio-group>
            </div>

            <v-col lg="12">
              <v-text-field
                label="Cliente"
                dense
                filled
                disabled
                prepend-icon="fas fa-user-alt"
                v-model.trim="order.client.nome"
              />
            </v-col>

            <v-col lg="12">
              <v-textarea
                auto-grow
                label="Descrição"
                rows="2"
                row-height="20"
                dense
                prepend-icon="fas fa-comments"
                v-model.trim="order.descricao"
              ></v-textarea>
            </v-col>

            <v-col lg="12">
              <v-text-field
                label="Valor"
                type="number"
                clearable
                dense
                prepend-icon="fas fa-dollar-sign"
                v-model.trim="order.valor"
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
          <v-btn color="green darken-1" :disabled="isLoading" class="white--text" @click="editar">
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
const clientesStore = createNamespacedHelpers("clientes");

import FormatPhoneMixin from "@/mixins/format-phone";

import clientService from "@/graphql/clientes/services/client-service";
import orderService from "@/graphql/orcamento/services/orders-service";

export default {
  name: "ModalEdit",
  props: {
    show: Boolean,
  },
  mixins: [FormatPhoneMixin],
  data() {
    return {
      isLoading: false,
      status: [
        { type: "Aguardando", color: "orange", value: "AGUARDANDO" },
        { type: "Executando", color: "blue", value: "EXECUTANDO" },
        { type: "Concluido", color: "green", value: "CONCLUIDO" },
        { type: "Cancelado", color: "red", value: "CANCELADO" },
      ],
    };
  },
  methods: {
    ...orcamentosStore.mapActions(["setModalEditOrcamento"]),
    fechar() {
      this.setModalEditOrcamento({ showModalEditOrcamento: false });
    },
    async editar() {
      try {
        await orderService.updateOrder(this.order);
        this.fechar();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...orcamentosStore.mapState(["orcamento"]),
    order() {
      return Object.assign({}, this.orcamento);
    },
    finalyOrder(){
      return {
        clientId: this.order.client.id,
        orderId: this.order.id,
        descricao: this.order.descricao,
        valor: this.order.valor,
        status: this.order.status
      }
    }
  },
};
</script>
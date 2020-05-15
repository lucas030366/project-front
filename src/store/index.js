import Vue from 'vue'
import Vuex from 'vuex'

import clientes from "@/resources/clientes/_store"

Vue.use(Vuex)

const modules = {
  clientes
}
export default new Vuex.Store({
  strict: process.env.NODE_ENV != "production",
  modules
})

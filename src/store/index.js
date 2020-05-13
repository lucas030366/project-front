import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  cliente: null
}

const types = {
  SET_CLIENT: "SET_CLIENT"
}

const mutations = {
  [types.SET_CLIENT]: (state, { cliente }) => {
    state.cliente = cliente
  }
}

const actions = {
  setClient: ({ commit }, payload) => {
    commit(types.SET_CLIENT, payload)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})

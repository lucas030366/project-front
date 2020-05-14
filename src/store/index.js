import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  cliente: null,
  showModal: false
}

const types = {
  SET_CLIENT: "SET_CLIENT",
  SET_MODAL: "SET_MODAL"
}

const mutations = {
  [types.SET_CLIENT]: (state, { cliente }) => {
    state.cliente = cliente
  },
  [types.SET_MODAL]: (state, { showModal }) => {
    state.showModal = showModal
  }
}

const actions = {
  setClient: ({ commit }, payload) => {
    commit(types.SET_CLIENT, payload)
  },
  setModal: ({ commit }, payload) => {
    commit(types.SET_MODAL, payload)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})

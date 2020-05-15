const state = {
  clientes: [],
  cliente: null,
  showModal: false
}

const types = {
  SET_CLIENTES: "SET_CLIENTES",
  SET_CLIENT: "SET_CLIENT",
  SET_MODAL: "SET_MODAL"
}

const mutations = {
  [types.SET_CLIENT]: (state, { cliente }) => {
    state.cliente = cliente
  },
  [types.SET_MODAL]: (state, { showModal }) => {
    state.showModal = showModal
  },
  [types.SET_CLIENTES]: (state, clientes) => {
    state.clientes = clientes
  }
}

const actions = {
  setClient: ({ commit }, payload) => {
    commit(types.SET_CLIENT, payload)
  },
  setModal: ({ commit }, payload) => {
    commit(types.SET_MODAL, payload)
  },
  setClientes: ({ commit }, payload) => {
    commit(types.SET_CLIENTES, payload)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
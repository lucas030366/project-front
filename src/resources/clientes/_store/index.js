const state = {
  clientes: [],
  cliente: null,
  showModalEditClient: false,
  showModalCreateClient: false
}

const types = {
  SET_CLIENTES: "SET_CLIENTES",
  SET_CLIENT: "SET_CLIENT",
  SET_MODAL_EDIT_CLIENT: "SET_MODAL_EDIT_CLIENT",
  SET_MODAL_CREATE_CLIENT: "SET_MODAL_CREATE_CLIENT"
}

const mutations = {
  [types.SET_CLIENT]: (state, { cliente }) => {
    state.cliente = cliente
  },
  [types.SET_MODAL_EDIT_CLIENT]: (state, { showModalEditClient }) => {
    state.showModalEditClient = showModalEditClient
  },
  [types.SET_MODAL_CREATE_CLIENT]: (state, { showModalCreateClient }) => {
    state.showModalCreateClient = showModalCreateClient
  },
  [types.SET_CLIENTES]: (state, clientes) => {
    state.clientes = clientes
  },
}

const actions = {
  setClient: ({ commit }, payload) => {
    commit(types.SET_CLIENT, payload)
  },
  setModalEditClient: ({ commit }, payload) => {
    commit(types.SET_MODAL_EDIT_CLIENT, payload)
  },
  setModalCreateClient: ({ commit }, payload) => {
    commit(types.SET_MODAL_CREATE_CLIENT, payload)
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
const state = {
  clientes: [],
  cliente: null,
  showModalEdit: false,
  showModalCreate: false
}

const types = {
  SET_CLIENTES: "SET_CLIENTES",
  SET_CLIENT: "SET_CLIENT",
  SET_MODAL_EDIT: "SET_MODAL_EDIT",
  SET_MODAL_CREATE: "SET_MODAL_CREATE"
}

const mutations = {
  [types.SET_CLIENT]: (state, { cliente }) => {
    state.cliente = cliente
  },
  [types.SET_MODAL_EDIT]: (state, { showModalEdit }) => {
    state.showModalEdit = showModalEdit
  },
  [types.SET_MODAL_CREATE]: (state, { showModalCreate }) => {
    state.showModalCreate = showModalCreate
  },
  [types.SET_CLIENTES]: (state, clientes) => {
    state.clientes = clientes
  },
}

const actions = {
  setClient: ({ commit }, payload) => {
    commit(types.SET_CLIENT, payload)
  },
  setModalEdit: ({ commit }, payload) => {
    commit(types.SET_MODAL_EDIT, payload)
  },
  setModalCreate: ({ commit }, payload) => {
    commit(types.SET_MODAL_CREATE, payload)
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
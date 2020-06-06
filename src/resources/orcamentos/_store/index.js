const state = {
  orcamentos: [],
  orcamento: null,
  showModalEditOrcamento: false,
  showModalCreateOrcamento: false
}

const types = {
  SET_ORCAMENTOS: "SET_ORCAMENTOS",
  SET_ORCAMENTO: "SET_ORCAMENTO",
  SET_MODAL_EDIT_ORCAMENTO: "SET_MODAL_EDIT_ORCAMENTO",
  SET_MODAL_CREATE_ORCAMENTO: "SET_MODAL_CREATE_ORCAMENTO"
}

const mutations = {
  [types.SET_ORCAMENTO]: (state, { orcamento }) => {
    state.orcamento = orcamento
  },
  [types.SET_MODAL_EDIT_ORCAMENTO]: (state, { showModalEditOrcamento }) => {
    state.showModalEditOrcamento = showModalEditOrcamento
  },
  [types.SET_MODAL_CREATE_ORCAMENTO]: (state, { showModalCreateOrcamento }) => {
    state.showModalCreateOrcamento = showModalCreateOrcamento
  },
  [types.SET_ORCAMENTOS]: (state, orcamentos) => {
    state.orcamentos = orcamentos
  },
}

const actions = {
  setOrcamento: ({ commit }, payload) => {
    commit(types.SET_ORCAMENTO, payload)
  },
  setModalEditOrcamento: ({ commit }, payload) => {
    commit(types.SET_MODAL_EDIT_ORCAMENTO, payload)
  },
  setModalCreateOrcamento: ({ commit }, payload) => {
    commit(types.SET_MODAL_CREATE_ORCAMENTO, payload)
  },
  setOrcamentos: ({ commit }, payload) => {
    commit(types.SET_ORCAMENTOS, payload)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
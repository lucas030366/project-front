import tarefasServices from "../_services/tarefasServices"

export default {
  //  listarTarefas = async ({ commit }) => {
  //   const response = await tarefasServices.getTarefas()
  //   commit("listarTarefas", { tarefas: response.data })
  //  },
  criarTarefa: ({ commit }, { tarefa }) => {
    return tarefasServices.postTarefa(tarefa)
      .then(response => {
        commit("criarTarefa", { tarefa: response.data })
      })
      .catch(erro => commit("setarErro", { erro }))
  },
  listarTarefas: ({ commit }) => {
    return tarefasServices.getTarefas()
      .then(response => {
        commit("listarTarefas", { tarefas: response.data })
      })
      .catch(erro => commit("setarErro", { erro }))
  },
  editarTarefa: ({ commit }, { tarefa }) => {
    return tarefasServices.putTarefa(tarefa)
      .then(response => {
        commit("editarTarefa", { tarefa: response.data })
      })
  },
  deletarTarefa: ({ commit }, { tarefa }) => {
    return tarefasServices.deleteTarefa(tarefa.id)
      .then(response => {
        commit("deletarTarefa", { tarefa })
      })
  },
  concluirTarefa: ({ dispatch }, payload) => {
    const tarefa = Object.assign({}, payload.tarefa)
    tarefa.concluido = !tarefa.concluido
    dispatch("editarTarefa", { tarefa })
  },
  selecionarTarefa: ({ commit }, payload) => {
    commit("selecionarTarefa", payload)
  },
  resetarTarefaSelecionada: ({ commit }) => {
    return commit("selecionarTarefa", { tarefa: null })
  },
  exibirFormulario: ({ commit }, exibir) => {
    commit("exibirFormulario", exibir)
  }

}
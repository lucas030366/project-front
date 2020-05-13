export default {
  tarefasConcluidas: (state, rootState) => {
    return state.tarefas.filter(t => t.concluido)
  },
  tarefasAFazer: state => state.tarefas.filter(t => !t.concluido),
  totalConcluido: (state, getters) => getters.tarefasConcluidas.length,
  buscarTarefaId: state => (id) => state.tarefas.find(t => t.id === id),
  boasVindas: (state, getters, rootState, rootGetters) => {
    return rootGetters.mensagem
  }
}
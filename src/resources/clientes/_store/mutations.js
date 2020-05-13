export default {
  listarTarefas: (state, { tarefas }) => { /*payload.tarefas*/
    return state.tarefas = tarefas
  },
  criarTarefa: (state, { tarefa }) => {
    return state.tarefas.push(tarefa)
  },
  editarTarefa: (state, { tarefa }) => {
    const indice = state.tarefas.findIndex(t => t.id === tarefa.id)
    state.tarefas.splice(indice, 1, tarefa)
  },
  deletarTarefa: (state, { tarefa }) => {
    const indice = state.tarefas.findIndex(t => t.id === tarefa.id)
    state.tarefas.splice(indice, 1)
  },
  selecionarTarefa: (state, { tarefa }) => {
    state.tarefaSelecionada = tarefa
  },
  setarErro: (state, { erro }) => {
    state.erro = erro
  },
  exibirFormulario: (state, exibir) => {
    console.log("Eibir? ",exibir)
    state.exibirForm = exibir
  }
}
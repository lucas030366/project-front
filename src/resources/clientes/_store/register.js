import clientesModule from "./index"

const MODULE_NAME = "clientes"

export default (rootStore) => {

  if (MODULE_NAME in rootStore._modules.root._children) {
    return
  } else {
    rootStore.registerModule(MODULE_NAME, clientesModule)
  }

}
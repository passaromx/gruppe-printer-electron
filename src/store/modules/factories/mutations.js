export default {
  storeFactory: (state, { data }) => {
    const clientIndex = state.clients.findIndex(client => client._id === state.selectedClient._id);
    if (clientIndex > -1) {
      state.clients[clientIndex].factories.push(data);
    }
  },
  updateFactory: (state, { data }) => {
    const clientIndex = state.clients.findIndex(client => client._id === state.selectedClient._id);
    if (clientIndex > -1) {
      const client = state.clients[clientIndex];
      const factoryIndex = client.factories.findIndex(factory => factory._id === data._id);
      if (factoryIndex > -1) Object.assign(client.factories[factoryIndex], data);
    }
  },
  deleteFactory: (state, id) => {
    const clientIndex = state.clients.findIndex(client => client._id === state.selectedClient._id);
    if (clientIndex > -1) {
      const client = state.clients[clientIndex];
      const factoryIndex = client.factories.findIndex(factory => factory._id === id);
      if (factoryIndex > -1) client.factories.splice(factoryIndex, 1);
    }
  }
};

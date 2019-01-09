export default {
  storeFactory: (state, { data }) => {
    const clientIndex = state.clients.findIndex(client => client._id === state.selectedClient._id);
    if (clientIndex > -1) {
      state.clients[clientIndex].factories.push(data);
    }
  }
};

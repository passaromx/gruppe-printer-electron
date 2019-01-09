export default {
  storeUser: (state, { data }) => {
    const clientIndex = state.clients.findIndex(client => client._id === state.selectedClient._id);
    if (clientIndex > -1) {
      state.clients[clientIndex].users.push(data);
    }
  },
  updateUser: (state, { data }) => {
    const clientIndex = state.clients.findIndex(client => client._id === state.selectedClient._id);
    if (clientIndex > -1) {
      const client = state.clients[clientIndex];
      const userIndex = client.users.findIndex(user => user._id === data._id);
      if (userIndex > -1) Object.assign(client.users[userIndex], data);
    }
  },
  deleteUser: (state, id) => {
    const clientIndex = state.clients.findIndex(client => client._id === state.selectedClient._id);
    if (clientIndex > -1) {
      const client = state.clients[clientIndex];
      const userIndex = client.users.findIndex(user => user._id === id);
      if (userIndex > -1) client.users.splice(userIndex, 1);
    }
  }
};

// export const apiURL = 'http://192.168.1.182:1337/';
export const apiURL = 'http://localhost:1337/';
// export const apiURL = 'http://ff0eff48.ngrok.io/';

export const roles = {
  admin: '5c2f94bdf80d6665bf53b9d8',
  client: '5c2f94bdf80d6665bf53b9d9'
};

export const clients = {
  nym: '5c40b928a5888531a0076cbd',
  thyssen: ''
};

export const nymVars = {
  description: {
    value: null,
    styles: {
      top: 49,
      left: 68,
      weight: 500
    }
  },
  productionDate: {
    value: null,
    styles: {
      top: 35,
      left: 68,
      weight: 500
    }
  },
  expireDate: {
    value: null,
    styles: {
      top: 42,
      left: 68,
      weight: 500
    }
  }
};

export const labelListHeaders = [
  {
    text: 'Nombre',
    align: 'left',
    sortable: false,
    value: 'name'
  },
  {
    text: 'SKU',
    value: 'sku',
    align: 'right'
  },
  {
    text: 'Autorización',
    value: 'auth',
    align: 'right',
    sortable: false
  },
  {
    text: 'Etiqueta',
    value: 'label',
    align: 'center',
    sortable: false
  },
  {
    text: 'Acciones',
    sortable: false,
    align: 'center'
  }
];

export const userListHeaders = [
  {
    text: 'Nombre',
    align: 'left',
    value: 'name'
  },
  {
    text: 'Acciones',
    align: 'center',
    value: 'calories'
  }
];


// export const apiURL = 'http://192.168.86.172:1337/';
// export const apiURL = 'http://localhost:1337/';
export const filesURL = 'http://localhost:1337';
export const apiURL = `${filesURL}/`;

export const roles = {
  admin: '5c2f94bdf80d6665bf53b9d8',
  client: '5c2f94bdf80d6665bf53b9d9'
};

export const clients = {
  nym: '5c40b928a5888531a0076cbd',
  thyssen: ''
};

export const nymVars = {
  fields: {
    productionDate: {
      type: 'date',
      label: 'Fecha de producción',
      value: null,
      styles: {
        top: 35,
        left: 68,
        weight: 500
      }
    },
    expireDate: {
      type: 'date',
      label: 'Fecha de caducidad',
      value: null,
      styles: {
        top: 42,
        left: 68,
        weight: 500
      }
    },
    copies: {
      type: 'number',
      label: 'Copias',
      validation: 'required|min_value:1',
      value: null,
      styles: {}
    },
    title: {
      type: 'title',
      class: 'xs12',
      label: 'Lote - Consecutivo'
    },
    line: {
      type: 'number',
      label: 'Líneas',
      validation: 'required|min_value:1',
      value: null,
      styles: {}
    },
    turn: {
      type: 'number',
      label: 'Turno',
      validation: 'required|min_value:1',
      value: null,
      styles: {}
    },
    group: {
      type: 'text',
      label: 'Grupo',
      validation: 'required',
      value: null,
      styles: {}
    },
    sequential: {
      type: 'number',
      label: 'Consecutivo',
      validation: 'required|min_value:1',
      value: null,
      styles: {}
    },
    description: {
      hidden: true,
      value: null,
      label: 'Nomenclatura',
      class: 'xs12',
      styles: {
        top: 49,
        left: 68,
        weight: 500
      }
    },
  },
  descriptionFormat: 'line-turn-group-sequential'
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


export const filesURL = 'http://192.168.86.189:1337';
// export const filesURL = 'http://localhost:1337';
export const apiURL = `${filesURL}/`;

export const roles = {
  admin: '5c2f94bdf80d6665bf53b9d8',
  client: '5c2f94bdf80d6665bf53b9d9'
};

export const clients = {
  nym: '5c40b928a5888531a0076cbd',
  thyssen: '5c38cb394903e5fc92396909'
};

export const thyssenVars = {
  fields: {
    title: {
      type: 'title',
      class: 'xs12',
      label: 'Variables'
    },
    date: {
      type: 'date',
      label: 'Fecha',
      value: new Date().toISOString().substr(0, 10),
      styles: {
        top: 75,
        left: 82,
        weight: 500,
        rotation: -90,
        fontSize: 10
      }
    },
    factory: {
      type: 'text',
      label: 'Planta',
      validation: 'required',
      value: null,
    },
    line: {
      type: 'text',
      label: 'Línea',
      validation: 'required',
      value: 1
    },
    shift: {
      type: 'text',
      label: 'Turno',
      validation: 'required',
      value: 1
    },
    group: {
      type: 'text',
      label: 'Grupo',
      validation: 'required',
      value: 'A',
    },
    // sequential: {
    //   type: 'number',
    //   label: 'Consecutivo',
    //   validation: 'required|min_value:1',
    //   value: null
    // },
    description: {
      value: null,
      class: 'xs12',
      styles: {
        top: 49,
        left: 68,
        weight: 500,
        rotation: -90
      }
    },
    sideDescription: {
      value: null,
      class: 'xs12',
      styles: {
        top: 49,
        left: 68,
        weight: 500,
        rotation: -90
      }
    },
  },
  descriptionFormat: 'factory-date-line-shift-group'
};

export const nymVars = {
  fields: {
    title: {
      type: 'title',
      class: 'xs12',
      label: 'Variables'
    },
    productionDate: {
      type: 'date',
      label: 'Fecha de producción',
      value: new Date().toISOString().substr(0, 10),
      styles: {
        top: 35,
        left: 68,
        weight: 500
      }
    },
    batch: {
      type: 'text',
      label: 'Lote',
      validation: 'required',
      value: 'A',
    },
    sequential: {
      type: 'number',
      label: 'Consecutivo',
      validation: 'required|min_value:1',
      value: '001',
    },
    description: {
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
  descriptionFormat: 'batch-sequential'
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

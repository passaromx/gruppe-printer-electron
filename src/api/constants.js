
// export const filesURL = 'http://localhost:1337';
// export const filesURL = 'http://3.81.203.178:1337';
export const filesURL = 'http://34.239.219.72:1337';

export const apiURL = `${filesURL}/`;

export const roles = {
  admin: '5c2f94bdf80d6665bf53b9d8',
  client: '5c2f94bdf80d6665bf53b9d9'
};

export const clients = {
  myn: '5c40b928a5888531a0076cbd',
  malta: '5c38cb394903e5fc92396909',
  wisium: '5cd6e9f9d7388839466b2d40'
};

export const rowsPerPage = [15, 25, 50, {
  text: '$vuetify.dataIterator.rowsPerPageAll',
  value: -1
}];

const maltaFactories = [
  'BAJ', 'CLN', 'MER', 'MTY', 'TX', 'TLX'
];

export const maltaVars = {
  fields: {
    title: {
      type: 'title',
      class: 'xs12',
      label: 'Variables'
    },
    date: {
      type: 'date',
      label: 'Fecha',
      dateFormat: 'D/M/YY',
      value: new Date().toISOString().substr(0, 10),
      styles: [{
        top: 73.5,
        left: 93.5,
        width: 100,
        weight: 600,
        rotation: -90,
        fontSize: '1.2vh'
      }]
    },
    factory: {
      type: 'select',
      label: 'Planta',
      validation: 'required',
      items: maltaFactories,
      value: maltaFactories[0]
    },
    line: {
      type: 'text',
      label: 'Línea',
      validation: 'required',
      maxlength: 2,
      value: 1
    },
    shift: {
      type: 'text',
      label: 'Turno',
      validation: 'required',
      maxlength: 1,
      value: 1
    },
    weight: {
      type: 'number',
      label: 'Peso neto',
      validation: 'required|min_value:1|max_value:999',
      name: 'weight',
      maxlength: 3,
      value: 40,
      styles: [{
        top: 2.6,
        left: 87,
        weight: 600,
        rotation: 0,
        fontSize: '1.4vh'
      }]
    },
    group: {
      type: 'text',
      label: 'Grupo',
      maxlength: 4,
      validation: 'required|min:4',
      value: 'A001',
    },
    description: {
      value: null,
      class: 'xs12',
      dateFormat: 'DDMMMYYYY',
      styles: [{
        top: 4.8,
        right: 7,
        weight: 500,
        rotation: 0,
        fontSize: '1.8vh'
      },
      {
        bottom: 20,
        left: 8,
        weight: 600,
        fontSize: '1.4vh',
        rotation: 90
      }
      ]
    }
  },
  descriptionFormat: 'factory-date-shift-line-group'
};

export const mynVars = {
  fields: {
    title: {
      type: 'title',
      class: 'xs12',
      label: 'Variables'
    },
    productionDate: {
      type: 'date',
      label: 'Fecha de producción',
      dateFormat: 'DD-MM-YYYY',
      value: new Date().toISOString().substr(0, 10),
      styles: [{
        top: 37.8,
        left: 57,
        weight: 500,
        fontSize: '2.7vh'
      }]
    },
    batch: {
      type: 'text',
      label: 'Lote',
      validation: 'required|min:6|max:8',
      value: 'A000001',
    },
    /* sequential: {
      type: 'number',
      label: 'Consecutivo',
      validation: 'required|min_value:1',
      value: '001',
    }, */
    description: {
      value: null,
      label: 'Nomenclatura',
      class: 'xs12',
      styles: [{
        top: 31.8,
        left: 60,
        weight: 500,
        fontSize: '2.7vh'
      }]
    },
    expiryDays: {
      value: null,
      fromSettings: true,
      addTo: 'productionDate',
      dateFormat: 'DD-MM-YYYY',
      styles: [{
        top: 43.5,
        left: 57,
        weight: 500,
        fontSize: '2.7vh'
      }]
    }
  },
  descriptionFormat: 'batch'
};

export const wisiumVars = {
  fields: {
    title: {
      type: 'title',
      class: 'xs12',
      label: 'Variables'
    },
    batch: {
      type: 'text',
      class: 'xs12',
      label: 'Lote',
      validation: 'required',
      value: 'A000001',
    },
    /* sequential: {
      type: 'number',
      label: 'Consecutivo',
      validation: 'required|min_value:1',
      value: '001',
    }, */
    description: {
      value: null,
      label: 'Nomenclatura',
      class: 'xs12',
      styles: [{
        top: 88.0,
        left: 52,
        weight: 500,
        fontSize: '1.55vh'
      }]
    },
  },
  descriptionFormat: 'batch'
};

export const authorizationListHeaders = [
  {
    text: 'Nombre',
    align: 'left',
    value: 'name'
  },
  {
    text: 'Documento',
    value: 'authPdf',
    sortable: false,
    align: 'center'
  },
  {
    text: 'Acciones',
    sortable: false,
    align: 'center'
  }
];

export const labelListHeaders = [{
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

export const userListHeaders = [{
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

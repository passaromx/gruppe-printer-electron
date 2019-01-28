
// export const filesURL = 'http://192.168.86.189:1337';
export const filesURL = 'http://192.168.100.2:1337';
export const apiURL = `${filesURL}/`;

export const roles = {
  admin: '5c2f94bdf80d6665bf53b9d8',
  client: '5c2f94bdf80d6665bf53b9d9'
};

export const clients = {
  myn: '5c40b928a5888531a0076cbd',
  malta: '5c38cb394903e5fc92396909'
};

const maltaFactories = [
  'BAJ', 'CLN', 'GDL', 'MER', 'MOR', 'MTY', 'STJ', 'TEP', 'TLX'
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
        top: 81,
        left: 93.5,
        width: 100,
        weight: 600,
        rotation: -90,
        fontSize: 9
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
      maxlength: 3,
      value: 40,
      styles: [{
        top: 1.3,
        left: 84,
        weight: 600,
        rotation: 0,
        fontSize: 10
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
      styles: [
        {
          top: 3.5,
          right: 7,
          weight: 500,
          rotation: 0
        },
        {
          bottom: 20,
          left: 7,
          weight: 600,
          fontSize: 10,
          rotation: 90
        }
      ]
    }
  },
  descriptionFormat: 'factory-date-line-shift-group'
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
        top: 35,
        left: 68,
        weight: 500
      }]
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
      styles: [{
        top: 49,
        left: 68,
        weight: 500
      }]
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

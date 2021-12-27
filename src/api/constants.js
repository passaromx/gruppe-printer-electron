// export const filesURL = 'http://localhost:1337';
export const filesURL = 'https://api.gruppesolutions.com.mx';

export const apiURL = `${filesURL}/`;

export const PDF_DOWNLOAD_STATE = {
  IDLE: 'idle',
  DOWNLOADING: 'donwloading',
  PACKAGING: 'packaging',
  DONE: 'done'
};

export const USER_ROLES = {
  ADMINISTRATOR: 'root',
  AUTHENTICATED: 'authenticated',
  CLIENT_ADMIN: 'clientadmin'
};

export const roles = {
  admin: '5c2f94bdf80d6665bf53b9d8',
  client: '5c2f94bdf80d6665bf53b9d9'
};

export const clients = {
  myn: '5c40b928a5888531a0076cbd',
  malta: '5c38cb394903e5fc92396909',
  maltaExport: '5d7bc8789df8ac22b461b2cb',
  maltaPets: '5e4479b5cc7db649979e3532',
  maltaBarcode: '5ee37c988a95810d0ef6fb11',
  wisium: '5cd6e9f9d7388839466b2d40',
  wisiumi: '5e3b4311cc7db649979e28a8',
  micros: '5e8e21818a95810d0ef6b6a9',
  wisiumh: '5fd7a88da47ddac6458271f8',
  wisiumv: '5fd9b487f5d17606525f0abf',
  myncode: '61c4d20ef5d176065261dbd7'
};

export const rowsPerPage = [15, 25, 50, {
  text: '$vuetify.dataIterator.rowsPerPageAll',
  value: -1
}];

const maltaFactories = [
  'BAJ', 'CLN', 'MER', 'MTY', 'TEX', 'TLX'
];

const maltaFactoriesNumbers = [
  // eslint-disable-next-line max-len
  '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'
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
    factoryM: {
      typeM: 'select',
      labelM: 'Maquilador',
      validationM: 'required',
      itemsM: maltaFactoriesNumbers,
      valueM: maltaFactoriesNumbers[0]
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
      // type: 'number',
      // label: 'Peso neto',
      fromSettings: true,
      // validation: 'required|min_value:1|max_value:999',
      // name: 'weight',
      // maxlength: 3,
      value: null,
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
  descriptionFormat: 'factory-date-shift-line-group',
  descriptionFormatM: 'factoryM-date-shift-line-group'
};

export const maltaBarcodeVars = {
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
        top: 70.5,
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
    factoryM: {
      typeM: 'select',
      labelM: 'Maquilador',
      validationM: 'required',
      itemsM: maltaFactoriesNumbers,
      valueM: maltaFactoriesNumbers[0]
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
      // type: 'number',
      // label: 'Peso neto',
      fromSettings: true,
      // validation: 'required|min_value:1|max_value:999',
      // name: 'weight',
      // maxlength: 3,
      value: null,
      styles: [{
        top: 5.6,
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
        top: 7.5,
        right: 7,
        weight: 500,
        rotation: 0,
        fontSize: '1.8vh'
      },
      {
        bottom: 23,
        left: 8,
        weight: 600,
        fontSize: '1.4vh',
        rotation: 90
      }
      ]
    }
  },
  descriptionFormat: 'factory-date-shift-line-group',
  descriptionFormatM: 'factoryM-date-shift-line-group'
};

export const maltaExportVars = {
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
        bottom: 0.5,
        left: 5,
        width: 100,
        weight: 600,
        fontSize: '2vh'
      }]
    },
    factory: {
      type: 'select',
      label: 'Planta',
      validation: 'required',
      items: maltaFactories,
      value: maltaFactories[0]
    },
    factoryM: {
      typeM: 'select',
      labelM: 'Maquilador',
      validationM: 'required',
      itemsM: maltaFactoriesNumbers,
      valueM: maltaFactoriesNumbers[0]
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
        top: 93.3,
        right: 6,
        weight: 500,
        rotation: 0,
        fontSize: '1.6vh'
      }]
    }
  },
  descriptionFormat: 'factory-date-shift-line-group',
  descriptionFormatM: 'factoryM-date-shift-line-group'
};

export const maltaPetsVars = {
  fields: {
    title: {
      type: 'title',
      class: 'xs12',
      label: 'Variables'
    },
    date: {
      type: 'date',
      label: 'Fecha',
      dateFormat: 'DD/MM/YYYY',
      value: new Date().toISOString().substr(0, 10),
      styles: [{
        top: 13,
        left: 20,
        width: 100,
        weight: 600,
        rotation: 0,
        fontSize: '5.2vh'
      }]
    },
    factory: {
      type: 'select',
      label: 'Planta',
      validation: 'required',
      items: maltaFactories,
      value: maltaFactories[0]
    },
    factoryM: {
      typeM: 'select',
      labelM: 'Maquilador',
      validationM: 'required',
      itemsM: maltaFactoriesNumbers,
      valueM: maltaFactoriesNumbers[0]
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
      // fromSettings: true,
      validation: 'required|min_value:1|max_value:999',
      name: 'weight',
      maxlength: 3,
      value: 30,
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
  descriptionFormat: 'factory-date-shift-line-group',
  descriptionFormatM: 'factoryM-date-shift-line-group'
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
      class: 'xs12',
      validation: 'required|min:6|max:16',
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
        left: 55,
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
    productionDate: {
      type: 'date',
      label: 'Fecha de producción',
      dateFormat: 'MM-YYYY',
      value: new Date().toISOString().substr(0, 10),
      styles: [{
        top: 18.8,
        left: 46,
        weight: 500,
        fontSize: '1.5vh'
      }]
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
    expiryDays: {
      value: null,
      fromSettings: true,
      addTo: 'productionDate',
      dateFormat: 'MM-YYYY',
      styles: [{
        top: 91.9,
        left: 37,
        weight: 500,
        fontSize: '2vh'
      }]
    }
  },
  descriptionFormat: 'batch'
};

export const wisiumhVars = {
  fields: {
    title: {
      type: 'title',
      class: 'xs12',
      label: 'Variables'
    },
    batch: {
      type: 'text',
      class: 'xs12',
      label: 'Código',
      validation: 'required',
      value: 'A000000001',
      maxlength: 10
    },
    date: {
      type: 'text',
      class: 'xs12',
      label: 'Número de muestra',
      validation: 'required',
      value: 'A002',
      maxlength: 4,
      styles: [{
        top: 54,
        left: 37,
        weight: 550,
        fontSize: '6vh'
      }]
    },
    productionDate: {
      type: 'text',
      class: 'xs12',
      label: 'Lote',
      validation: 'required',
      value: 'A00000000000003',
      maxlength: 15,
      styles: [{
        top: 60,
        left: 11,
        weight: 550,
        fontSize: '5vh'
      }]
    },
    description: {
      value: null,
      label: 'Nomenclatura',
      class: 'xs12',
      styles: [{
        top: 48,
        left: 18,
        weight: 550,
        fontSize: '6vh'
      }]
    },
  },
  descriptionFormat: 'batch'
};

export const wisiumvVars = {
  fields: {
    title: {
      type: 'title',
      class: 'xs12',
      label: 'Variables'
    },
    batch: {
      type: 'text',
      class: 'xs12',
      label: 'Código del producto',
      validation: 'required',
      value: 'A000000001',
    },
    date: {
      type: 'text',
      class: 'xs12',
      label: 'Número de tarima',
      validation: 'required',
      value: 'A002',
      maxlength: 4,
      styles: [{
        top: 57,
        left: 58,
        weight: 550,
        fontSize: '9vh',
        rotation: 270
      }]
    },
    description: {
      value: null,
      label: 'Nomenclatura',
      class: 'xs12',
      styles: [{
        top: 78,
        left: 40,
        weight: 550,
        fontSize: '11vh',
        rotation: 270
      }]
    },
  },
  descriptionFormat: 'batch'
};

export const microsVars = {
  fields: {
    title: {
      type: 'title',
      class: 'xs12',
      label: 'Variables'
    },
    productionDate: {
      type: 'date',
      label: 'Fecha de producción',
      dateFormat: 'DD/MM/YYYY',
      value: new Date().toISOString().substr(0, 10),
      styles: [{
        top: 10,
        left: 48,
        weight: 500,
        rotation: 90,
        fontSize: '5vh',
        whiteSpace: 'no-wrap'
      }]
    },
    shift: {
      type: 'select',
      label: 'Turno',
      validation: 'required',
      items: ['1', '2', '3'],
      value: '1',
      styles: [
        {
          top: 57,
          left: 52,
          weight: 500,
          rotation: 90,
          fontSize: '5.8vh'
        }
      ]
    },
    weight: {
      type: 'number',
      label: 'Toneladas',
      isTons: true,
      // fromSettings: true,
      validation: 'required|min_value:1|max_value:100',
      name: 'weight',
      maxlength: 3,
      value: 30,
      styles: [{
        top: 15.5,
        left: 69,
        weight: 600,
        rotation: 90,
        fontSize: '5.8vh',
      }]
    },
    smallWeight: {
      value: null,
      type: 'text',
      class: 'xs12',
      label: 'Pesada Chica',
      validation: 'required',
      styles: [
        {
          top: 1,
          left: 15,
          weight: 800,
          fontSize: '2.2vh',
          textTransform: 'uppercase',
          rotation: 90
        }
      ]
    },
    description: {
      value: null,
      class: 'xs12',
      dateFormat: 'DDMMMYYYY',
      styles: [{
        display: 'none',
        top: 1,
        left: 15,
        weight: 800,
        fontSize: '2.1vh',
        textTransform: 'uppercase',
        rotation: 90
      }]
    }
  },
  descriptionFormat: null
};

export const myncodeVars = {
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
        top: 36.8,
        left: 55,
        weight: 500,
        fontSize: '2.7vh'
      }]
    },
    batch: {
      type: 'text',
      label: 'Lote',
      class: 'xs12',
      validation: 'required|min:6|max:16',
      value: 'A000001',
    },
    group: {
      type: 'text',
      label: 'Identificador',
      maxlength: 1,
      class: 'xs12',
      validation: 'required|min:1|max:1',
      value: '1',
    },
    description: {
      value: null,
      label: 'Nomenclatura',
      class: 'xs12',
      styles: [{
        top: 30.8,
        left: 57,
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
        top: 42.5,
        left: 55,
        weight: 500,
        fontSize: '2.7vh'
      }]
    }
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

export const LABELS_HEADERS = {
  ADMIN: [
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
  ],
  CLIENT_ADMIN: [
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
      text: 'Etiqueta',
      value: 'label',
      align: 'center',
      sortable: false
    },
  ]
};

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

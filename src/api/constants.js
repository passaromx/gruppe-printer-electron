export const apiURL = 'http://localhost:1337/';

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

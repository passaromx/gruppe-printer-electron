const Menu = [
  // {
  //   title: 'Resumen',
  //   icon: 'dashboard',
  //   name: 'Dashboard',
  //   isAdmin: true
  // },
  {
    title: 'Precintos',
    icon: 'label',
    name: 'Labels',
    isAdmin: true,
    canAccess: ['root', 'clientadmin']
  },
  {
    title: 'Impresión',
    icon: 'print',
    name: 'Printer',
    canAccess: ['authenticated']
  },
  {
    title: 'Clientes',
    icon: 'group',
    name: 'Clients',
    isAdmin: true,
    canAccess: ['root']
  },
  {
    title: 'Autorizaciones',
    icon: 'picture_as_pdf',
    name: 'Authorizations',
    isAdmin: true,
    canAccess: ['root']
  },
];

export default Menu;

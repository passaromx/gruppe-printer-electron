import moment from 'moment';
import Vue from 'vue';

moment.locale('es');
moment.updateLocale('es', {
  monthsShort: [
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL',
    'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
  ]
});

// Helpers
Vue.filter('prettyDate', val => moment(val).format('L'));
Vue.filter('dateAndTime', val => moment(val).format('DD/MM/YYYY HH:mm'));

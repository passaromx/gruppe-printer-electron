
import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

const dictionary = {
  es: {
    messages: {
      required() {
        return 'Campo requerido.';
      },
      len() {
        return 'Longitud requerido.';
      },
      min(e, n) {
        return `Mínimo ${n[0]} caractéres.`;
      },
      max(e, n) {
        return `Máximo ${n[0]} caractéres.`;
      },
      min_value(e, n) {
        return `El valor del campo debe ser ${n[0]} o superior.`;
      },
      max_value(e, n) {
        return `El valor del campo debe ser menor o igual a ${n[0]}.`;
      },
      email() {
        return 'Introduce un email válido.';
      }
    }
  }
};

Vue.use(VeeValidate, {
  fieldsBagName: 'formFields',
  dictionary
});
Validator.localize('es');

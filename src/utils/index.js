export const set = property => (state, payload) => { state[property] = payload; };

export const showSuccessAlert = (msg, commit) => {
  commit('setSnackbar', {
    type: 'success',
    msg
  }, { root: true });
};

export const handleError = (err, commit, type = 'error') => {
  console.error('handle error', err);
  const status = err.response ? err.response.status : 505;
  let message = '';
  switch (status) {
    case 400:
      message = 'Verifica información e intenta de nuevo';
      break;
    case 401:
      message = 'Credenciales inválidas, verifica e intenta de nuevo';
      break;
    case 403:
      message = 'Lo sentimos, no cuentas con permisos para acceder a este contenido';
      break;
    case 404:
      message = 'Elemento no existe, verifica e intenta de nuevo';
      break;
    case 406:
      message = 'Cambio de contraseña ha expirado, solicitar nuevamente';
      break;
    case 409:
      message = 'Elemento duplicado, modifica e intenta nuevamente';
      break;
    case 426:
      message = 'Pendiente de aprobación, contacta a tu administrador';
      break;
    case 501 || 503:
      message = 'Algo falló, si error persiste contacta al administrador';
      break;
    default:
      message = 'Error de comunicación, intenta más tarde';
      break;
  }

  if (commit) {
    commit('setSnackbar', {
      type,
      msg: message
    }, { root: true });
  } else {
    return message;
  }
};

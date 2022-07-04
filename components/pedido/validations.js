function calcularMontoTotal (cantidad, precio) {
  return cantidad * precio
}

function validarPedido ({ clienteId, fechaPedido, total }) {
  const errores = []

  if (!clienteId || !fechaPedido || !total) {
    errores.push('No se pudo generar el pedido, por falta de datos requeridos')
  }

  if (!clienteId || clienteId === '') {
    errores.push('No se pudo identificar al Cliente')
  }

  if (!total) {
    errores.push('Ingresar el monto total del pedido')
  }

  if (!fechaPedido) {
    errores.push('Ingresar la fecha de emision del pedido')
  }
}

module.exports = {
  calcularMontoTotal,
  validarPedido
}

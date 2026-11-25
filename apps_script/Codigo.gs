/**
 * Mapa de clientes Disma - publicacion con login de Google.
 * Solo las cuentas de PERMITIDOS pueden abrir el mapa.
 * Implementar como app web: "Ejecutar como: usuario que accede a la app web".
 */
const PERMITIDOS = [
  'arodriguez@dismitre.com.ar',
  'ppaez@dismitre.com.ar'
];

function doGet() {
  const email = (Session.getActiveUser().getEmail() || '').toLowerCase();
  if (!PERMITIDOS.includes(email)) {
    return HtmlService.createHtmlOutput(
      '<div style="font-family:Arial;padding:40px">' +
      '<h2>Sin acceso</h2>' +
      '<p>La cuenta <b>' + (email || 'desconocida') + '</b> no tiene permiso para abrir el mapa de clientes de Disma.</p>' +
      '<p>Pedile acceso a Alejandro Rodriguez.</p></div>'
    ).setTitle('Mapa de clientes Disma - sin acceso');
  }
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Mapa de clientes Disma')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Mapa de clientes Disma - publicacion con login de Google.
 * Solo las cuentas de PERMITIDOS pueden abrir el mapa.
 * El mapa se toma siempre de GitHub (index.html del repositorio), asi que
 * cada cambio que se sube a GitHub queda publicado solo (tarda hasta 10 minutos).
 * Implementar como app web: "Ejecutar como: usuario que accede a la app web".
 */
const PERMITIDOS = [
  'arodriguez@dismitre.com.ar',
  'ppaez@dismitre.com.ar',
  'disalejandro@gmail.com'
];
const ORIGEN = 'https://raw.githubusercontent.com/disalejandro8/mapa-clientes-disma/main/index.html';

function doGet() {
  const email = (Session.getActiveUser().getEmail() || '').toLowerCase();
  if (!PERMITIDOS.includes(email)) {
    return HtmlService.createHtmlOutput(
      '<div style="font-family:Arial;padding:40px"><h2>Sin acceso</h2>' +
      '<p>La cuenta <b>' + (email || 'desconocida') + '</b> no tiene permiso para abrir el mapa de clientes de Disma.</p>' +
      '<p>Pedile acceso a Alejandro Rodriguez.</p></div>').setTitle('Mapa de clientes Disma - sin acceso');
  }
  const cache = CacheService.getScriptCache();
  let html = cache.get('mapa');
  if (!html) {
    html = UrlFetchApp.fetch(ORIGEN).getContentText();
    try { cache.put('mapa', html, 600); } catch (e) {}
  }
  return HtmlService.createHtmlOutput(html)
    .setTitle('Mapa de clientes Disma')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

var util = require('./util');
var extractResultados = require('./extractResultadosLoterias');

/**
 * Feito apenas o download, porque ja esta retornando em JSON
 * @param {*} customUrl 
 * @returns 
 */
exports.downloadResultadosFederal = async (customUrl) => {
  customUrl = customUrl || extractResultados.URL_LOTERIAS_CAIXA.federal;
  return await util.downloadResultadosCaixa(customUrl);
}

/*exports.htmlToJson = async function(jsonDownload) {
  return await JSON.parse(jsonDownload);
}*/
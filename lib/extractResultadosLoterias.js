var util = require('./util');

exports.URL_LOTERIAS_CAIXA = {
  megasena: 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena',
  lotofacil: 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/lotofacil',
  quina: 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/quina',
  lotomania: 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/lotomania',
  timemania: 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/timemania',
  duplaSena: 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/duplasena',
  federal: 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/federal',
  loteca: 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/loteca',
  diaDeSorte: 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/diadesorte',
  superSete: 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/supersete'
}

exports.downloadResultados = async function(customUrlLoteria) {
  return await util.downloadResultadosCaixa(customUrlLoteria);
}

var $;

/**
 * Obtém do objeto html o texto (do cheerio)
 * @param {string} value valor string a ser convertido
 */
 function _getText(element) {
  if (element) {
    if ($(element).text()) {
      return $(element).text().trim();
    }
  }
  return undefined;
}

exports.getText = _getText;

/** cria a lista de cidades de distribuicao dos premios */
exports.getCidades = (element) => {
  var resultado = [];
  if (element) {
    var cidades = $(element).find('table tr');
    if (cidades && cidades.length > 0) {
      cidades.each(function(index, element) {
        let tds = $(element).find('td');
        if (tds && tds.length > 1) {
          let cidade = {
            Cidade: _getText(tds[0]),
            UF: _getText(tds[1])
          };
          resultado.push(cidade);
        }
      });
    } 
  }
  return resultado;
}

exports.propsParse = (properties, data, _funcParse) => {
  for (let index = 0; index < properties.length; index++) {
    data[properties[index]] = _funcParse(data[properties[index]]);
  }
  return data;
}



exports.htmlToJson = async function(htmlFile, cbProcessaHtmlEspecifico) {

  // Cria a Promise
  return new Promise(function(resolve, reject) {
    
    let cheerio = require('cheerio');
    $ = cheerio.load(htmlFile);

    let trs = $('body>table>tbody>tr');
    const totalCount = trs.length - 1;
    var qtdProcessada = 0,
      qtdErros = 0;
    var resultados = [];

    trs.each(function(index, element) {

      qtdProcessada++

      var tds = $(element).find('td');
      if (tds && tds.length > 0) {

        // Se possui mais de 3 resultados, indica que é o um sorteio completo, 
        // senão indica que é apenas uma cidade a ser adicionada ao sorteio anterior, 
        // como que possui ganhador do premio
        if (tds.length > 3) {
          let sorteio = cbProcessaHtmlEspecifico(tds);
          resultados.push(sorteio);
        }

      } else {
        qtdErros++;
      };

      if (totalCount === qtdProcessada) {
        console.log('Processo concluído', '| Processados= ', qtdProcessada, ' | Erros=' + qtdErros);
        resolve(resultados);
      }
    });
  });
}
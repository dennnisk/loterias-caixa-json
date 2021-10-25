const util = require('./util');
const cheerio = require('cheerio');

/**
 * Retorna o HTML com os resultados, obtendo o link atualizado cada requisição, pois, a caixa tem trocado o link a cada 24h
 * E também não disponibiliza o resultado em Zip, apenas HTML.
 * 
 * @param {string} customUrlMegaSenaHomePage url da página principal da caixa, com os resultados da mega sena
 * @returns {html} relação dos resultados devolvidos pelo download
 */
exports.downloadResultadosMegaSena = async function(customUrlMegaSenaHomePage) {
  customUrlMegaSenaHomePage = customUrlMegaSenaHomePage || 
    'http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena';
  return await util.downloadResultadosCaixa(customUrlMegaSenaHomePage);
}

exports.saveToFile = function(filePath, html) {
  const fs = require('fs');
  fs.writeFileSync(filePath, html);
}


exports.htmlToJson = async function(htmlData) {
  return new Promise(function(resolve, reject) {
    //  Informa que irá processar o arquivo e o caminho dele
    let cheerio = require('cheerio');

    const $ = cheerio.load(htmlData);

    /**
     * Obtém do objeto html o texto (do cheerio)
     * @param {string} value valor string a ser convertido
     */
    function getText(element) {
      if (element) {
        if ($(element).text()) {
          return $(element).text().trim();
        }
      }
      return undefined;
    }

    /** cria a lista de cidades de distribuicao dos premios */
    function getCidades(element) {
      var resultado = [];
      if (element) {
        var cidades = $(element).find('table tr');
        if (cidades && cidades.length > 0) {
          cidades.each(function(index, element) {
            let tds = $(element).find('td');
            if (tds && tds.length > 1) {
              let cidade = {
                nome: getText(tds[0]),
                uf: getText(tds[1])
              };
              resultado.push(cidade);
            }
          });
        } 
      }
      return resultado;
    }

    let trs = $('body table tbody tr');
    const totalCount = trs.length - 1;
    var qtdProcessada = 0,
      qtdErros = 0;

    var resultados = [];

    trs.each(function(index, element) {

      qtdProcessada++

      var tds = $(element).find('td');
      if (tds && tds.length > 0) {

        let sorteio = {
          concurso: util.parseToInt(getText(tds[0])),
          local: getText(tds[1]),
          dataSorteio: getText(tds[2]),
          dezena1: util.parseToInt(getText(tds[3])),
          dezena2: util.parseToInt(getText(tds[4])),
          dezena3: util.parseToInt(getText(tds[5])),
          dezena4: util.parseToInt(getText(tds[6])),
          dezena5: util.parseToInt(getText(tds[7])),
          dezena6: util.parseToInt(getText(tds[8])),
          dezenas: [],
          ganhadoresFaixa1: util.parseToInt(getText(tds[9])),
          ganhadoresFaixa2: util.parseToInt(getText(tds[10])),
          ganhadoresFaixa3: util.parseToInt(getText(tds[11])),
          rateioFaixa1: util.parseToFloat(getText(tds[12])),
          rateioFaixa2: util.parseToFloat(getText(tds[13])),
          rateioFaixa3: util.parseToFloat(getText(tds[14])),
          cidadesComGanhadores: getCidades(tds[15]),
          valorArrecadado: util.parseToFloat(getText(tds[16])),
          estimativaProximoConcurso: util.parseToFloat(getText(tds[17])),
          valorAcumuladoProximoConcurso: util.parseToFloat(getText(tds[18])),
          acumulado: getText(tds[19]) == 'SIM',
          sorteioEspecial: getText(tds[20]) == 'SIM',
          observacao: getText(tds[21])
        }

        sorteioAnterior = sorteio.sorteio;

        sorteio.dezenas.push(sorteio.dezena1);
        sorteio.dezenas.push(sorteio.dezena2);
        sorteio.dezenas.push(sorteio.dezena3);
        sorteio.dezenas.push(sorteio.dezena4);
        sorteio.dezenas.push(sorteio.dezena5);
        sorteio.dezenas.push(sorteio.dezena6);

        if (sorteio.concurso)
          resultados.push(sorteio);

      } else {
        qtdErros++;
      };

      if (totalCount === index) {
        console.log('Processo concluído', '| Processados= ', qtdProcessada, ' | Erros=' + qtdErros);
        resolve(resultados);
      }
    });
  });
}
var util = require('./util');

exports.downloadResultadosLotomania = async function(customUrlLotomaniaHomePage) {
  customUrlLotomaniaHomePage = customUrlLotomaniaHomePage || 
    'http://loterias.caixa.gov.br/wps/portal/loterias/landing/lotomania';
  return await util.downloadResultadosCaixa(customUrlLotomaniaHomePage);
}


exports.htmlToJson = async function(htmlFile) {

  // Cria a Promise
  return new Promise(function(resolve, reject) {
    
    let cheerio = require('cheerio');
    const $ = cheerio.load(htmlFile);

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
                Cidade: getText(tds[0]),
                UF: getText(tds[1])
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

        // Se possui mais de 3 resultados, indica que é o um sorteio completo, 
        // senão indica que é apenas uma cidade a ser adicionada ao sorteio anterior, 
        // como que possui ganhador do premio
        if (tds.length > 3) {
          var sorteio = {
            concurso: util.parseToInt(getText(tds[0])),
            data: getText(tds[1]),	
            bola1: util.parseToInt(getText(tds[2])),
            bola2: util.parseToInt(getText(tds[3])),
            bola3: util.parseToInt(getText(tds[4])),
            bola4: util.parseToInt(getText(tds[5])),
            bola5: util.parseToInt(getText(tds[6])),
            bola6: util.parseToInt(getText(tds[7])),
            bola7: util.parseToInt(getText(tds[8])),
            bola8: util.parseToInt(getText(tds[9])),
            bola9: util.parseToInt(getText(tds[10])),
            bola10: util.parseToInt(getText(tds[11])),
            bola11: util.parseToInt(getText(tds[12])),
            bola12: util.parseToInt(getText(tds[13])),
            bola13: util.parseToInt(getText(tds[14])),
            bola14: util.parseToInt(getText(tds[15])),
            bola15: util.parseToInt(getText(tds[16])),
            bola16: util.parseToInt(getText(tds[17])),
            bola17: util.parseToInt(getText(tds[18])),
            bola18: util.parseToInt(getText(tds[19])),
            bola19: util.parseToInt(getText(tds[20])),
            bola20: util.parseToInt(getText(tds[21])),
            arrecadacao_Total: getText(tds[22]),
            ganhadores_20_Numeros: getText(tds[23]),
            cidade:  getCidades(tds[24])
          }

          sorteio.bolas = [];
          for (let index = 2; index < 22; index++) {
            sorteio.bolas.push(util.parseToInt(getText(tds[index])));
          }          

          // Acha o proximo valor numerico valido
          let index = 25;
          while(isNaN(util.parseToInt(getText(tds[index]))) && (index < 100)) {
            index++;
          }

          if (index < 100) {
            sorteio.uf = util.parseToInt(getText(tds[index]));
            sorteio.ganhadores_19_Numeros = util.parseToInt(getText(tds[index+1]));
            sorteio.ganhadores_18_Numeros = util.parseToInt(getText(tds[index+2]));
            sorteio.ganhadores_17_Numeros = util.parseToInt(getText(tds[index+3]));
            sorteio.ganhadores_16_Numeros = util.parseToInt(getText(tds[index+4]));
            sorteio.ganhadores_Nenhum_Numero = util.parseToInt(getText(tds[index+5]));
            sorteio.valor_Rateio_20_Numeros = util.parseToFloat(getText(tds[index+6]));
            sorteio.valor_Rateio_19_Numeros = util.parseToFloat(getText(tds[index+7]));
            sorteio.valor_Rateio_18_Numeros = util.parseToFloat(getText(tds[index+8]));
            sorteio.valor_Rateio_17_Numeros = util.parseToFloat(getText(tds[index+9]));
            sorteio.valor_Rateio_16_Numeros = util.parseToFloat(getText(tds[index+10]));
            sorteio.valor_Rateio_Nenhum_Numero = util.parseToFloat(getText(tds[index+11]));
            sorteio.acumulado_20_Numeros = util.parseToFloat(getText(tds[index+12]));
            sorteio.estimativa_Premio = util.parseToFloat(getText(tds[index+13]));
            sorteio.valor_Acumulado_Especial = util.parseToFloat(getText(tds[index+14]));
          }

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
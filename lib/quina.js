var util = require('./util');

exports.downloadResultadosQuina = async function(customUrlQuinaHomePage) {
  customUrlQuinaHomePage = customUrlQuinaHomePage || 
    'http://loterias.caixa.gov.br/wps/portal/loterias/landing/quina';
  return await util.downloadResultadosCaixa(customUrlQuinaHomePage);
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
            data_Sorteio: getText(tds[1]),
            dezena1: util.parseToInt(getText(tds[2])),
            dezena2: util.parseToInt(getText(tds[3])),
            dezena3: util.parseToInt(getText(tds[4])),
            dezena4: util.parseToInt(getText(tds[5])),
            dezena5: util.parseToInt(getText(tds[6])),
            dezenas: [],
            arrecadacao_Total: util.parseToFloat(getText(tds[7])),
            ganhadores_Quina: util.parseToInt(getText(tds[8])),
            cidades: getCidades(tds[9])
            
          }

          sorteio.dezenas.push(sorteio.dezena1);
          sorteio.dezenas.push(sorteio.dezena2);
          sorteio.dezenas.push(sorteio.dezena3);
          sorteio.dezenas.push(sorteio.dezena4);
          sorteio.dezenas.push(sorteio.dezena5);          

          // Acha o proximo valor numerico valido
          let index = 9;
          while(isNaN(util.parseToFloat(getText(tds[index]), true))) {
            index++;
          }

          sorteio.rateio_Quina = util.parseToFloat(getText(tds[index]));
          sorteio.ganhadores_Quadra = util.parseToInt(getText(tds[index+1]));
          sorteio.rateio_Quadra = util.parseToFloat(getText(tds[index+2]));
          sorteio.ganhadores_Terno = util.parseToInt(getText(tds[index+3]));
          sorteio.rateio_Terno = util.parseToFloat(getText(tds[index+4]));
          sorteio.ganhadores_Duque = util.parseToInt(getText(tds[index+5]));
          sorteio.rateio_Duque = util.parseToFloat(getText(tds[index+6]));
          sorteio.acumulado = getText(tds[index+7]) == 'SIM';
          sorteio.valor_Acumulado = util.parseToFloat(getText(tds[index+8]));
          sorteio.estimativa_Premio = util.parseToFloat(getText(tds[index+9]));
          sorteio.valor_Acumulado_Sorteio_Especial_Sao_Joao = util.parseToFloat(getText(tds[index+10]));

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
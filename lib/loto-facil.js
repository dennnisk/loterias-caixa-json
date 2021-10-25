var util = require('./util');

exports.downloadResultadosLotoFacil = async function(customUrlLotoFacilHomePage) {
  customUrlLotoFacilHomePage = customUrlLotoFacilHomePage || 
    'http://loterias.caixa.gov.br/wps/portal/loterias/landing/lotofacil';
  return await util.downloadResultadosCaixa(customUrlLotoFacilHomePage);
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

    let trs = $('body>table>tbody>tr');
    const totalCount = trs.length - 1;
    var qtdProcessada = 0,
      qtdErros = 0;
    var indiceUltimoJogo = 0;
    var resultados = [];

    trs.each(function(index, element) {

      qtdProcessada++

      var tds = $(element).find('td');
      if (tds && tds.length > 0) {

        // Se possui mais de 3 resultados, indica que é o um sorteio completo, 
        // senão indica que é apenas uma cidade a ser adicionada ao sorteio anterior, 
        // como que possui ganhador do premio
        if (tds.length > 3) {
          var sorteio = {};

          sorteio.Concurso = util.parseToInt(getText(tds[0]));
          sorteio.Data = getText(tds[1]);
          sorteio.Bola1 = util.parseToInt(getText(tds[2]));
          sorteio.Bola2 = util.parseToInt(getText(tds[3]));
          sorteio.Bola3 = util.parseToInt(getText(tds[4]));
          sorteio.Bola4 = util.parseToInt(getText(tds[5]));
          sorteio.Bola5 = util.parseToInt(getText(tds[6]));
          sorteio.Bola6 = util.parseToInt(getText(tds[7]));
          sorteio.Bola7 = util.parseToInt(getText(tds[8]));
          sorteio.Bola8 = util.parseToInt(getText(tds[9]));
          sorteio.Bola9 = util.parseToInt(getText(tds[10]));
          sorteio.Bola10 = util.parseToInt(getText(tds[11]));
          sorteio.Bola11 = util.parseToInt(getText(tds[12]));
          sorteio.Bola12 = util.parseToInt(getText(tds[13]));
          sorteio.Bola13 = util.parseToInt(getText(tds[14]));
          sorteio.Bola14 = util.parseToInt(getText(tds[15]));
          sorteio.Bola15 = util.parseToInt(getText(tds[16]));
          sorteio.Arrecadacao_Total = util.parseToFloat(getText(tds[17]));
          sorteio.Ganhadores_15_Numeros = util.parseToInt(getText(tds[18]));
          sorteio.Cidades = getCidades(tds[19]);
          
          let index = 0;
          while(isNaN(util.parseToInt(getText(tds[21+index])))) {
            index++;
          }
          //console.log(sorteio.Concurso + ", " + index);
          //let index = 0;

          if (sorteio.Concurso >= 727) {
            index += 0;
          }
          let base = 21; // 21 campos pelo menos a serem "pulados"
          
          sorteio.Ganhadores_14_Numeros = util.parseToInt(getText(tds[base + index]));
          sorteio.Ganhadores_13_Numeros = util.parseToInt(getText(tds[base + 1 + index]));
          sorteio.Ganhadores_12_Numeros = util.parseToInt(getText(tds[base + 2 + index]));
          sorteio.Ganhadores_11_Numeros = util.parseToInt(getText(tds[base + 3 + index]));
          sorteio.Valor_Rateio_15_Numeros = util.parseToFloat(getText(tds[base + 4 + index]));
          sorteio.Valor_Rateio_14_Numeros = util.parseToFloat(getText(tds[base + 5 + index]));
          sorteio.Valor_Rateio_13_Numeros = util.parseToFloat(getText(tds[base + 6 + index]));
          sorteio.Valor_Rateio_12_Numeros = util.parseToFloat(getText(tds[base + 7 + index]));
          sorteio.Valor_Rateio_11_Numeros = util.parseToFloat(getText(tds[base + 8 + index]));
          sorteio.Acumulado_15_Numeros = util.parseToFloat(getText(tds[base + 9 + index]));
          sorteio.Estimativa_Premio = util.parseToFloat(getText(tds[base + 10 + index]));
          sorteio.Valor_Acumulado_Especial = util.parseToFloat(getText(tds[base + 11 + index]));

          indiceUltimoJogo = resultados.push(sorteio);
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
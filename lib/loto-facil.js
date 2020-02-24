var util = require('./util');

exports.downloadResultadosLotoFacil = function(folder) {
  const url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_lotfac.zip';
  return util.downloadResultados(folder, url, 'D_lotfac', 'd_lotfac.htm');
}


exports.htmlToJson = function(htmlFile) {

  //  Informa que irá processar o arquivo e o caminho dele
  console.log("... Convertendo arquivo HTML em JSON. Arquivo:", htmlFile);

  let cheerio = require('cheerio');
  //asa
  // Cria a Promise
  return new Promise(function(resolve, reject) {

    // Processa o  arquivo
    fs = require('fs');
    fs.readFile(htmlFile, 'latin1', function(err, html) {

      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      const $ = cheerio.load(html);

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

      let trs = $('tr');
      const totalCount = trs.length - 1;
      var qtdProcessada = 0,
        qtdErros = 0;
      var indiceUltimoJogo = 0;
      var resultados = [];

      trs.each(function(index, element) {

        qtdProcessada++

        var tds = $(this).find('td');
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
            sorteio.Cidades = [{
              Cidade: getText(tds[19]),
              UF: getText(tds[20])
            }];
            sorteio.Ganhadores_14_Numeros = util.parseToInt(getText(tds[21]));
            sorteio.Ganhadores_13_Numeros = util.parseToInt(getText(tds[22]));
            sorteio.Ganhadores_12_Numeros = util.parseToInt(getText(tds[23]));
            sorteio.Ganhadores_11_Numeros = util.parseToInt(getText(tds[24]));
            sorteio.Valor_Rateio_15_Numeros = util.parseToFloat(getText(tds[25]));
            sorteio.Valor_Rateio_14_Numeros = util.parseToFloat(getText(tds[26]));
            sorteio.Valor_Rateio_13_Numeros = util.parseToFloat(getText(tds[27]));
            sorteio.Valor_Rateio_12_Numeros = util.parseToFloat(getText(tds[28]));
            sorteio.Valor_Rateio_11_Numeros = util.parseToFloat(getText(tds[29]));
            sorteio.Acumulado_15_Numeros = util.parseToFloat(getText(tds[30]));
            sorteio.Estimativa_Premio = util.parseToFloat(getText(tds[31]));
            sorteio.Valor_Acumulado_Especial = util.parseToFloat(getText(tds[32]));

            indiceUltimoJogo = resultados.push(sorteio);
          } else {
            // possivelmente apenas está adicionando uma cidade como resultado
            if (indiceUltimoJogo > 0) {
              resultados[indiceUltimoJogo - 1].Cidades.push({
                Cidade: getText(tds[0]),
                UF: getText(tds[1])
              });
            }
          }

        } else {
          qtdErros++;
        };

        if (totalCount === index) {
          console.log('Processo concluído', '| Processados= ', qtdProcessada, ' | Erros=' + qtdErros);
          resolve(resultados);
        }
      });
    });
  });
}
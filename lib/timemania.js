var util = require('./util');
var extractResultados = require('./extractResultadosLoterias');


exports.downloadResultadosTimemania = async (customUrl) => {
  customUrl = customUrl || extractResultados.URL_LOTERIAS_CAIXA.timemania;
  return await util.downloadResultadosCaixa(customUrl);
}

exports.htmlToJson = async function(htmlFile) {

  /**
   * Função para processar e extrair os dados do HTML
   * @param {*} tds 
   * @returns 
   */
  function _processData(tds) {
    // Acha o proximo valor numerico valido apos as cidades
    let index = 12;
    while(isNaN(util.parseToFloat(extractResultados.getText(tds[index])))) {
      index++;
    }

    var sorteio = {
      concurso: util.parseToInt(extractResultados.getText(tds[0])),
      data_Sorteio: extractResultados.getText(tds[1]),
      bola1: extractResultados.getText(tds[2]),
      bola2: extractResultados.getText(tds[3]),
      bola3: extractResultados.getText(tds[4]),
      bola4: extractResultados.getText(tds[5]),
      bola5: extractResultados.getText(tds[6]),
      bola6: extractResultados.getText(tds[7]),
      bola7: extractResultados.getText(tds[8]),
      time_Coracao: extractResultados.getText(tds[9]),
      valor_Arrecadado: extractResultados.getText(tds[10]),
      ganhadores_7_Numeros: util.parseToInt(extractResultados.getText(tds[11])),
      cidade: extractResultados.getCidades(tds[12]),
      ganhadores_6_Numeros: util.parseToInt(extractResultados.getText(tds[index + 13 - 13])),
      ganhadores_5_Numeros: util.parseToInt(extractResultados.getText(tds[index + 14 - 13])),
      ganhadores_4_Numeros: util.parseToInt(extractResultados.getText(tds[index + 15 - 13])),
      ganhadores_3_Numeros: util.parseToInt(extractResultados.getText(tds[index + 16 - 13])),
      ganhadores_Time_Coracao: util.parseToInt(extractResultados.getText(tds[index + 17 - 13])),
      valor_Rateio_7_Numeros: util.parseToFloat(extractResultados.getText(tds[index + 18 - 13])),
      valor_Rateio_6_Numeros: util.parseToFloat(extractResultados.getText(tds[index + 19 - 13])),
      valor_Rateio_5_Numeros: util.parseToFloat(extractResultados.getText(tds[index + 20 - 13])),
      valor_Rateio_4_Numeros: util.parseToFloat(extractResultados.getText(tds[index + 21 - 13])),
      valor_Rateio_3_Numeros: util.parseToFloat(extractResultados.getText(tds[index + 22 - 13])),
      valor_Time_Coracao: util.parseToFloat(extractResultados.getText(tds[index + 23 - 13])),
      valor_Acumulado: util.parseToFloat(extractResultados.getText(tds[index + 24 - 13])),
      estimativa_Premio: util.parseToFloat(extractResultados.getText(tds[index + 25 - 13])),
      bolas : []
    }

    sorteio.bolas.push(sorteio.bola1);
    sorteio.bolas.push(sorteio.bola2);
    sorteio.bolas.push(sorteio.bola3);
    sorteio.bolas.push(sorteio.bola4);
    sorteio.bolas.push(sorteio.bola5);
    sorteio.bolas.push(sorteio.bola6);
    sorteio.bolas.push(sorteio.bola7);

    return sorteio;
  }

  return await extractResultados.htmlToJson(htmlFile, _processData);
}
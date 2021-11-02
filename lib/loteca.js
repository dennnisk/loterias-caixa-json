var util = require('./util');
var extractResultados = require('./extractResultadosLoterias');


exports.downloadResultadosLoteca = async (customUrl) => {
  customUrl = customUrl || extractResultados.URL_LOTERIAS_CAIXA.loteca;
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
    let cidadeIdx = 3;
    let index = cidadeIdx;
    while(isNaN(util.parseToFloat(extractResultados.getText(tds[index])))) {
      index++;
    }
    cidadeIdx++;

    var sorteio = {
      concurso: extractResultados.getText(tds[0]),
      data_Sorteio: extractResultados.getText(tds[1]),
      ganhadores_14_Acertos: extractResultados.getText(tds[2]),
      cidade: extractResultados.getCidades(tds[3]),
      valor_Rateio_14_Acertos: extractResultados.getText(tds[index + 4 - cidadeIdx]),
      acumulado: extractResultados.getText(tds[index + 5 - cidadeIdx]),
      valor_Acumulado_14_Acertos: extractResultados.getText(tds[index + 6 - cidadeIdx]),
      ganhadores_13_Acertos: extractResultados.getText(tds[index + 7 - cidadeIdx]),
      valor_Rateio_13_Acertos: extractResultados.getText(tds[index + 8 - cidadeIdx]),
      ganhadores_12_Acertos: extractResultados.getText(tds[index + 9 - cidadeIdx]),
      valor_Rateio_12_Acertos: extractResultados.getText(tds[index + 10 - cidadeIdx]),
      jogo_1: extractResultados.getText(tds[index + 11 - cidadeIdx]),
      jogo_2: extractResultados.getText(tds[index + 12 - cidadeIdx]),
      jogo_3: extractResultados.getText(tds[index + 13 - cidadeIdx]),
      jogo_4: extractResultados.getText(tds[index + 14 - cidadeIdx]),
      jogo_5: extractResultados.getText(tds[index + 15 - cidadeIdx]),
      jogo_6: extractResultados.getText(tds[index + 16 - cidadeIdx]),
      jogo_7: extractResultados.getText(tds[index + 17 - cidadeIdx]),
      jogo_8: extractResultados.getText(tds[index + 18 - cidadeIdx]),
      jogo_9: extractResultados.getText(tds[index + 19 - cidadeIdx]),
      jogo_10: extractResultados.getText(tds[index + 20 - cidadeIdx]),
      jogo_11: extractResultados.getText(tds[index + 21 - cidadeIdx]),
      jogo_12: extractResultados.getText(tds[index + 22 - cidadeIdx]),
      jogo_13: extractResultados.getText(tds[index + 23 - cidadeIdx]),
      jogo_14: extractResultados.getText(tds[index + 24 - cidadeIdx]),
      jogos: [],
      arrecadacao_Total: extractResultados.getText(tds[index + 25 - cidadeIdx]),
      estimativa_Prêmio: extractResultados.getText(tds[index + 26 - cidadeIdx])
    }

    var intergerProps = ['ganhadores_14_Acertos', 'ganhadores_13_Acertos', 'ganhadores_12_Acertos', 'jogo_1', 'jogo_2', 'jogo_3', 'jogo_4', 'jogo_5', 'jogo_6', 'jogo_7', 'jogo_8', 'jogo_9', 'jogo_10', 'jogo_11', 'jogo_12', 'jogo_13', 'jogo_14'];
    sorteio = extractResultados.propsParse(intergerProps, sorteio, util.parseToInt);

    var floatProps = ['valor_Rateio_14_Acertos', 'acumulado', 'valor_Acumulado_14_Acertos', 'valor_Rateio_13_Acertos', 'valor_Rateio_12_Acertos', 'arrecadacao_Total', 'estimativa_Prêmio'];
    sorteio = extractResultados.propsParse(floatProps, sorteio, util.parseToFloat);

    sorteio.acumulado = sorteio.acumulado == 'SIM';
    for (let i = 1; i < 15; i++) {
      sorteio.jogos.push(sorteio["jogo_"+i]);
    }
    
    return sorteio;
  }

  return await extractResultados.htmlToJson(htmlFile, _processData);
}
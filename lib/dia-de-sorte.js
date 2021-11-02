var util = require('./util');
var extractResultados = require('./extractResultadosLoterias');


exports.downloadResultadosDiaDeSorte = async (customUrl) => {
  customUrl = customUrl || extractResultados.URL_LOTERIAS_CAIXA.diaDeSorte;
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
    let cidadeIdx = 21;
    let index = cidadeIdx;
    while(isNaN(util.parseToFloat(extractResultados.getText(tds[index])))) {
      index++;
    }
    cidadeIdx++;

    var sorteio = {
      concurso: extractResultados.getText(tds[0]),
      local: extractResultados.getText(tds[1]),
      data_do_Sorteio: extractResultados.getText(tds[2]),
      numero_1: extractResultados.getText(tds[3]),
      numero_2: extractResultados.getText(tds[4]),
      numero_3: extractResultados.getText(tds[5]),
      numero_4: extractResultados.getText(tds[6]),
      numero_5: extractResultados.getText(tds[7]),
      numero_6: extractResultados.getText(tds[8]),
      numero_7: extractResultados.getText(tds[9]),
      numeros: [],
      mes_da_Sorte: extractResultados.getText(tds[10]),
      ganhadores_Faixa_1: extractResultados.getText(tds[11]),
      ganhadores_Faixa_2: extractResultados.getText(tds[12]),
      ganhadores_Faixa_3: extractResultados.getText(tds[13]),
      ganhadores_Faixa_4: extractResultados.getText(tds[14]),
      ganhadores_Faixa_5: extractResultados.getText(tds[15]),
      rateio_Faixa_1: extractResultados.getText(tds[16]),
      rateio_Faixa_2: extractResultados.getText(tds[17]),
      rateio_Faixa_3: extractResultados.getText(tds[18]),
      rateio_Faixa_4: extractResultados.getText(tds[19]),
      rateio_Faixa_5: extractResultados.getText(tds[20]),
      cidade: extractResultados.getCidades(tds[21]),
      valor_Arrecadado: extractResultados.getText(tds[index + 22 - cidadeIdx]),
      estimativa_proximo_concurso: extractResultados.getText(tds[index + 23 - cidadeIdx]),
      valor_Acumulado_Proximo_Concurso: extractResultados.getText(tds[index + 24 - cidadeIdx]),
      acumulado: extractResultados.getText(tds[index + 25 - cidadeIdx]),
      sorteio_Especial: extractResultados.getText(tds[index + 26 - cidadeIdx]),
      observacao: extractResultados.getText(tds[index + 27 - cidadeIdx])
    }

    var intergerProps = ['concurso', 'numero_1', 'numero_2', 'numero_3', 'numero_4', 'numero_5', 'numero_6', 'numero_7', 'mes_da_Sorte', 'ganhadores_Faixa_1', 'ganhadores_Faixa_2', 'ganhadores_Faixa_3', 'ganhadores_Faixa_4', 'ganhadores_Faixa_5'];
    sorteio = extractResultados.propsParse(intergerProps, sorteio, util.parseToInt);

    var floatProps = ['rateio_Faixa_1', 'rateio_Faixa_2', 'rateio_Faixa_3', 'rateio_Faixa_4', 'rateio_Faixa_5', 'valor_Arrecadado', 'estimativa_proximo_concurso', 'valor_Acumulado_Proximo_Concurso'];
    sorteio = extractResultados.propsParse(floatProps, sorteio, util.parseToFloat);

    sorteio.acumulado = sorteio.acumulado == 'SIM';
    sorteio.sorteio_Especial = sorteio.sorteio_Especial == 'SIM';

    for (let i = 1; i < 8; i++) {
      sorteio.numeros.push(sorteio["numero_"+i]);
    }
    
    return sorteio;
  }

  return await extractResultados.htmlToJson(htmlFile, _processData);
}
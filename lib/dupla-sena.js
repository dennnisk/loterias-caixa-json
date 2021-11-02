var util = require('./util');
var extractResultados = require('./extractResultadosLoterias');


exports.downloadResultadosDuplaSena = async (customUrl) => {
  customUrl = customUrl || extractResultados.URL_LOTERIAS_CAIXA.duplaSena;
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
    let cidadeIdx = 10;
    let index = cidadeIdx;
    while(isNaN(util.parseToFloat(extractResultados.getText(tds[index]), true))) {
      index++;
    }

    var sorteio = {
      concurso : extractResultados.getText(tds[ 0]),
      data_Sorteio : extractResultados.getText(tds[ 1]),
      numero_1_Sorteio1 : extractResultados.getText(tds[ 2]),
      numero_2_Sorteio1 : extractResultados.getText(tds[ 3]),
      numero_3_Sorteio1 : extractResultados.getText(tds[ 4]),
      numero_4_Sorteio1 : extractResultados.getText(tds[ 5]),
      numero_5_Sorteio1 : extractResultados.getText(tds[ 6]),
      numero_6_Sorteio1 : extractResultados.getText(tds[ 7]),
      sorteio1: [],
      arrecadacao_Total : extractResultados.getText(tds[ 8]),
      ganhadores_Sena_Sorteio1 : extractResultados.getText(tds[ 9]),
      cidade : extractResultados.getCidades(tds[10]),
      rateio_Sena_Sorteio1 : extractResultados.getText(tds[index + 11 - cidadeIdx]),
      acumulado_Sena_Sorteio1 : extractResultados.getText(tds[index + 12 - cidadeIdx]),
      valor_Acumulado_Sena_Sorteio1 : extractResultados.getText(tds[index + 13 - cidadeIdx]),
      ganhadores_Quina_Sorteio1 : extractResultados.getText(tds[index + 14 - cidadeIdx]),
      rateio_Quina_Sorteio1 : extractResultados.getText(tds[index + 15 - cidadeIdx]),
      ganhadores_Quadra_Sorteio1 : extractResultados.getText(tds[index + 16 - cidadeIdx]),
      rateio_Quadra_Sorteio1 : extractResultados.getText(tds[index + 17 - cidadeIdx]),
      ganhadores_Terno_Sorteio1 : extractResultados.getText(tds[index + 18 - cidadeIdx]),
      rateio_Terno_Sorteio1 : extractResultados.getText(tds[index + 19 - cidadeIdx]),
      numero_1_Sorteio2 : extractResultados.getText(tds[index + 20 - cidadeIdx]),
      numero_2_Sorteio2 : extractResultados.getText(tds[index + 21 - cidadeIdx]),
      numero_3_Sorteio2 : extractResultados.getText(tds[index + 22 - cidadeIdx]),
      numero_4_Sorteio2 : extractResultados.getText(tds[index + 23 - cidadeIdx]),
      numero_5_Sorteio2 : extractResultados.getText(tds[index + 24 - cidadeIdx]),
      numero_6_Sorteio2 : extractResultados.getText(tds[index + 25 - cidadeIdx]),
      sorteio2: [],
      ganhadores_Sena_Sorteio2 : extractResultados.getText(tds[index + 26 - cidadeIdx]),
      rateio_Sena_Sorteio2 : extractResultados.getText(tds[index + 27 - cidadeIdx]),
      ganhadores_Quina_Sorteio2 : extractResultados.getText(tds[index + 28 - cidadeIdx]),
      rateio_Quina_Sorteio2 : extractResultados.getText(tds[index + 29 - cidadeIdx]),
      ganhadores_Quadra_Sorteio2 : extractResultados.getText(tds[index + 30 - cidadeIdx]),
      rateio_Quadra_Sorteio2 : extractResultados.getText(tds[index + 31 - cidadeIdx]),
      ganhadores_Terno_Sorteio2 : extractResultados.getText(tds[index + 32 - cidadeIdx]),
      rateio_Terno_Sorteio2 : extractResultados.getText(tds[index + 33 - cidadeIdx]),
      estimativa_Premio : extractResultados.getText(tds[index + 34 - cidadeIdx]),
      acumulado_Especial_de_Pascoa : extractResultados.getText(tds[index + 35 - cidadeIdx]),
    }

    var intergerProps = ['concurso', 'numero_1_Sorteio1', 'numero_2_Sorteio1', 'numero_3_Sorteio1', 'numero_4_Sorteio1', 'numero_5_Sorteio1', 'numero_6_Sorteio1', 'ganhadores_Sena_Sorteio1', 'ganhadores_Quina_Sorteio1', 'ganhadores_Quadra_Sorteio1', 'ganhadores_Terno_Sorteio1', 'numero_1_Sorteio2', 'numero_2_Sorteio2', 'numero_3_Sorteio2', 'numero_4_Sorteio2', 'numero_5_Sorteio2', 'numero_6_Sorteio2', 'ganhadores_Sena_Sorteio2', 'ganhadores_Quina_Sorteio2', 'ganhadores_Quadra_Sorteio2', 'ganhadores_Terno_Sorteio2'];
    sorteio = extractResultados.propsParse(intergerProps, sorteio, util.parseToInt);

    var floatProps = ['arrecadacao_Total', 'rateio_Sena_Sorteio1', 'acumulado_Sena_Sorteio1', 'valor_Acumulado_Sena_Sorteio1', 'rateio_Quina_Sorteio1', 'rateio_Quadra_Sorteio1', 'rateio_Terno_Sorteio1', 'rateio_Sena_Sorteio2', 'rateio_Quina_Sorteio2', 'rateio_Quadra_Sorteio2', 'rateio_Terno_Sorteio2', 'estimativa_Premio', 'acumulado_Especial_de_Pascoa'];
    sorteio = extractResultados.propsParse(floatProps, sorteio, util.parseToFloat);

    sorteio.acumulado_Especial_de_Pascoa = sorteio.acumulado_Especial_de_Pascoa == 'SIM';
    sorteio.acumulado_Sena_Sorteio1 = sorteio.acumulado_Sena_Sorteio1 == 'SIM';
    
    sorteio.sorteio1.push(sorteio.numero_1_Sorteio1);
    sorteio.sorteio1.push(sorteio.numero_2_Sorteio1);
    sorteio.sorteio1.push(sorteio.numero_3_Sorteio1);
    sorteio.sorteio1.push(sorteio.numero_4_Sorteio1);
    sorteio.sorteio1.push(sorteio.numero_5_Sorteio1);
    sorteio.sorteio1.push(sorteio.numero_6_Sorteio1);

    sorteio.sorteio2.push(sorteio.numero_1_Sorteio2);
    sorteio.sorteio2.push(sorteio.numero_2_Sorteio2);
    sorteio.sorteio2.push(sorteio.numero_3_Sorteio2);
    sorteio.sorteio2.push(sorteio.numero_4_Sorteio2);
    sorteio.sorteio2.push(sorteio.numero_5_Sorteio2);
    sorteio.sorteio2.push(sorteio.numero_6_Sorteio2);

    return sorteio;
  }

  return await extractResultados.htmlToJson(htmlFile, _processData);
}
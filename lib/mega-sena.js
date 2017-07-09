
exports.downloadResultadosMegaSena = function (folder) {
  let util = require('./util');
  const url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_megase.zip';
  return util.downloadResultados(folde, url, 'D_megase', 'D_MEGA.HTM');
}


exports.htmlToJson = function (htmlFile) {
    
    //  Informa que irá processar o arquivo e o caminho dele
    console.debug("... Convertendo arquivo HTML em JSON. Arquivo:", htmlFile);

    let cheerio = require('cheerio');

    // Cria a Promise
    return new Promise(function(resolve, reject) {
     
      // Processa o  arquivo
      fs = require('fs');
      fs.readFile(htmlFile, 'latin1', function (err, html) {
          
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        const $ = cheerio.load(html);

        function getText(element){
          if (element) {
              return $(element).text();
          } 
              return undefined;
        }

        let trs = $('tr');
        const totalCount = trs.length-1;
        var qtdProcessada = 0, qtdErros = 0;

        var resultados = [];

        trs.each(function (index, element) {
          
          qtdProcessada++

          var tds = $(this).find('td[rowspan]');
          if (tds && tds.length > 0) {
            var sorteio = {};
            sorteio.Concurso 			= getText(tds[0]);
            sorteio.DataSorteio 	= getText(tds[1]);
            sorteio.Dezena1 			= getText(tds[2]);
            sorteio.Dezena2    		= getText(tds[3]);
            sorteio.Dezena3    		= getText(tds[4]);
            sorteio.Dezena4    		= getText(tds[5]);
            sorteio.Dezena5    		= getText(tds[6]);
            sorteio.Dezena6    		= getText(tds[7]);
            sorteio.Arrecadacao_Total = getText(tds[8]);
            sorteio.Ganhadores_Sena   = getText(tds[9]);
            sorteio.Cidade            = getText(tds[10]);
            sorteio.UF                = getText(tds[11]);
            sorteio.Rateio_Sena       = getText(tds[12]);
            sorteio.Ganhadores_Quina  = getText(tds[13]);
            sorteio.Rateio_Quina      = getText(tds[14]);
            sorteio.Ganhadores_Quadra        = getText(tds[15]);
            sorteio.Rateio_Quadra            = getText(tds[16]);
            sorteio.Acumulado                = getText(tds[17]);
            sorteio.Valor_Acumulado          = getText(tds[18]);
            sorteio.Estimativa_Prêmio        = getText(tds[19]);
            sorteio.Acumulado_Mega_da_Virada = getText(tds[20]);

            resultados.push(sorteio);

          } else {
              qtdErros++;
          };

          if (totalCount === index) {
              console.debug('Processo concluído', '| Processados= ', qtdProcessada, ' | Erros='+ qtdErros);
              resolve(resultados);
          }
        });
      });    
  });
}

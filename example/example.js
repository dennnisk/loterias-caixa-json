var loteriasCaixaJson = require('./../index');
var util = require('../lib/util');
var path = require('path');
var fs = require('fs');
var Axios = require('axios');

const { http, https } = require('follow-redirects');
const followRedirects = require('follow-redirects');

async function downloadFile(fileUrl, outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath);
  return Axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then(async response => {
    response.data.pipe(writer);
    return finished(writer); //this is a Promise
  });
}


var testa = async function() {
  let diretorioTemporario = path.resolve(path.join('example', 'temp'));

  var url = 'http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena';
  var arquivo = await util.downloadResultados(diretorioTemporario, url, '', 'paginaMegaSenaCaixa.html');
  
  console.log(arquivo);
  
  let cheerio =  require('cheerio');

  let html = await fs.readFileSync(arquivo, 'latin1');

  const $ = cheerio.load(html);

  var link = $('a[class="title zeta"]');

  var base = $('base');


  var novaUrl = base.attr('href') + link.attr('href');
  console.log(novaUrl);

  var novoDownload = await util.downloadResultados(diretorioTemporario, novaUrl, '', 'resultados.html');

  console.log(novoDownload);

  try {
    await downloadFile(novoDownload, "C:/Users/dennn/Desktop/megasena/loterias-caixa-json/example/temp/resultados2.html");
    console.log("ok");
  } catch (error) {
    console.log("error", error);
  }


}

testa();


/*
loteriasCaixaJson.megaSena(diretorioTemporario)
  .then((jsonArray) => {
    // Retorno de todos os jogos da mega sena em formato json
    console.debug('--------- [ MEGA SENA ] ---------');
    console.debug(jsonArray);
  }).catch((err) => {
    console.error(err);
  });
*/
/*
// Mega sena
loteriasCaixaJson.megaSena(diretorioTemporario)
  .then((jsonArray) => {
    // Retorno de todos os jogos da mega sena em formato json
    console.debug('--------- [ MEGA SENA ] ---------');
    console.debug(jsonArray);
  }).catch((err) => {
    console.error(err);
  });

// Loto Fácil
loteriasCaixaJson.lotoFacil(diretorioTemporario)
  .then((jsonArray) => {
    // Retorno de todos os jogos da mega sena em formato json
    console.debug('--------- [ LOTO FACIL ] ---------');
    console.debug(jsonArray);
  }).catch((err) => {
    console.error(err);
  });*/




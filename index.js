const megaSena = require('./lib/mega-sena');
const lotoFacil = require('./lib/loto-facil');
const quina = require('./lib/quina');
const lotomania = require('./lib/lotomania');
const timemania = require('./lib/timemania');
const duplaSena = require('./lib/dupla-sena');
const loteca = require('./lib/loteca');
const diaDeSorte = require('./lib/dia-de-sorte');


exports.diaDeSorte = async function(htmlResultados, saveHtmlToFile) {

  if (!htmlResultados) {
    htmlResultados = await diaDeSorte.downloadResultadosDiaDeSorte();
    if (saveHtmlToFile)
      require('fs').writeFileSync(saveHtmlToFile, htmlResultados);
    console.log('DONWNLOAD, concluido');
  }

  return await diaDeSorte.htmlToJson(htmlResultados);
};


exports.loteca = async function(htmlResultados, saveHtmlToFile) {

  if (!htmlResultados) {
    htmlResultados = await loteca.downloadResultadosLoteca();
    if (saveHtmlToFile)
      require('fs').writeFileSync(saveHtmlToFile, htmlResultados);
    console.log('DONWNLOAD, concluido');
  }

  return await loteca.htmlToJson(htmlResultados);
};


exports.timemania = async function(htmlResultados, saveHtmlToFile) {

  if (!htmlResultados) {
    htmlResultados = await timemania.downloadResultadosTimemania();
    if (saveHtmlToFile)
      require('fs').writeFileSync(saveHtmlToFile, htmlResultados);
    console.log('DONWNLOAD, concluido');
  }

  return await timemania.htmlToJson(htmlResultados);
};


exports.duplaSena = async function(htmlResultados, saveHtmlToFile) {

  if (!htmlResultados) {
    htmlResultados = await duplaSena.downloadResultadosDuplaSena();
    if (saveHtmlToFile)
      require('fs').writeFileSync(saveHtmlToFile, htmlResultados);
    console.log('DONWNLOAD, concluido');
  }

  return await duplaSena.htmlToJson(htmlResultados);
};



exports.megaSena = async function(htmlResultados, saveHtmlToFile) {

  if (!htmlResultados) {
    htmlResultados = await megaSena.downloadResultadosMegaSena();
    if (saveHtmlToFile)
      require('fs').writeFileSync(saveHtmlToFile, htmlResultados);
    console.log('DONWNLOAD, concluido');
  }

  return await megaSena.htmlToJson(htmlResultados);
};



exports.lotoFacil = async function(htmlResultados, saveHtmlToFile) {
  if (!htmlResultados) {
    htmlResultados = await lotoFacil.downloadResultadosLotoFacil();
    require('fs').writeFileSync(saveHtmlToFile, htmlResultados);
    console.log('DONWNLOAD, concluido');
  }

  return await lotoFacil.htmlToJson(htmlResultados);
};



exports.quina = async function(htmlResultados, saveHtmlToFile) {
  if (!htmlResultados) {
    htmlResultados = await quina.downloadResultadosQuina();
    require('fs').writeFileSync(saveHtmlToFile, htmlResultados);
    console.log('DONWNLOAD, concluido');
  }

  return await quina.htmlToJson(htmlResultados);
};



exports.lotomania = async function(htmlResultados, saveHtmlToFile) {
  if (!htmlResultados) {
    htmlResultados = await lotomania.downloadResultadosLotomania();
    
    if (saveHtmlToFile) {
      require('fs').writeFileSync(saveHtmlToFile, htmlResultados);
    }
    console.log('DONWNLOAD, concluido');
  }

  return await lotomania.htmlToJson(htmlResultados);
};
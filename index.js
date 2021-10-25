const megaSena = require('./lib/mega-sena');
const lotoFacil = require('./lib/loto-facil');
const quina = require('./lib/quina');
const lotomania = require('./lib/lotomania');

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
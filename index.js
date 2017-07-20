var path = require('path');



exports.megaSena = function(tempDirectory) {
  let megaSena = require('./lib/mega-sena');

  return megaSena.downloadResultadosMegaSena(path.normalize(tempDirectory))
    .then(function(nomeArquivoComResultados) {
      return megaSena.htmlToJson(nomeArquivoComResultados);
    });
};



exports.lotoFacil = function(tempDirectory) {
  let lotoFacil = require('./lib/loto-facil');

  return lotoFacil.downloadResultadosLotoFacil(path.normalize(tempDirectory))
    .then(function(nomeArquivoComResultados) {
      return lotoFacil.htmlToJson(nomeArquivoComResultados);
    });
};
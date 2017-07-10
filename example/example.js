var loteriasCaixaJson = require('./../index');
var path = require('path');

let diretorioTemporario = path.join('example', 'temp');

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
  });
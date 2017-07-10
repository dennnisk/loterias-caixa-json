var loteriasCaixaJson = require('./../index');
var path = require('path');

let diretorioTemporario = path.join('example', 'temp');

// Mega sena
loteriasCaixaJson.megaSena(diretorioTemporario)
  .then((json) => {
    // Retorno de todos os jogos da mega sena em formato json
    console.debug('--------- [ MEGA SENA ] ---------');
    console.debug(json);
  }).catch((err) => {
    console.error(err);
  });

// Loto Fácil
loteriasCaixaJson.logoFacil(diretorioTemporario)
  .then((json) => {
    // Retorno de todos os jogos da mega sena em formato json
    console.debug('--------- [ LOTO FACIL ] ---------');
    console.debug(json);
  }).catch((err) => {
    console.error(err);
  });
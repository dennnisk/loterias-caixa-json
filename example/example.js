var loteriasCaixaJson = require('./../index');

// Mega sena
loteriasCaixaJson.megaSena('./temp/')
  .then((json) => {
    // Retorno de todos os jogos da mega sena em formato json
    console.debug('--------- [ MEGA SENA ] ---------');
    console.debug(json);
  }).catch((err) => {
    console.error(err);
  });

// Loto Fácil
loteriasCaixaJson.logoFacil('./temp/')
  .then((json) => {
    // Retorno de todos os jogos da mega sena em formato json
    console.debug('--------- [ LOTO FACIL ] ---------');
    console.debug(json);
  }).catch((err) => {
    console.error(err);
  });
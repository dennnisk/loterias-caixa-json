var loteriasCaixaJson = require('./../index');

async function makeJson() {

  try {
    console.debug('Mega sena :::::::::::::: ');
    let megasenaJson = await loteriasCaixaJson.megaSena(undefined, __dirname + '/temp/megasena.html');
    require('fs').writeFileSync(__dirname + '/temp/megasena.json', JSON.stringify(megasenaJson, null, 2));

    console.debug('Loto Fácil :::::::::::::: ');
    let lotoFacilJson = await loteriasCaixaJson.lotoFacil(undefined, __dirname + '/temp/lotoFacil.html');
    require('fs').writeFileSync(__dirname + '/temp/lotoFacil.json', JSON.stringify(lotoFacilJson, null, 2));

    console.debug('Quina :::::::::::::: ');
    let quinaJson = await loteriasCaixaJson.quina(undefined, __dirname + '/temp/quina.html');
    require('fs').writeFileSync(__dirname + '/temp/quina.json', JSON.stringify(quinaJson, null, 2));

    console.debug('Lotomania :::::::::::::: ');
    let lotomaniaJson = await loteriasCaixaJson.lotomania(undefined, __dirname + '/temp/lotomania.html');
    require('fs').writeFileSync(__dirname + '/temp/lotomania.json', JSON.stringify(lotomaniaJson, null, 2));

  } catch (error) {
    console.error(error);
  }
}

makeJson();
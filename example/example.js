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
    
    console.debug('Time Mania :::::::::::::: ');
    let timemania = await loteriasCaixaJson.timemania(undefined, __dirname + '/temp/timemania.html');
    require('fs').writeFileSync(__dirname + '/temp/timemania.json', JSON.stringify(timemania, null, 2));
    
    console.debug('Dupla Sena :::::::::::::: ');
    let duplaSena = await loteriasCaixaJson.duplaSena(undefined, __dirname + '/temp/duplaSena.html');
    require('fs').writeFileSync(__dirname + '/temp/duplaSena.json', JSON.stringify(duplaSena, null, 2));

    console.debug('Loteca :::::::::::::: ');
    let loteca = await loteriasCaixaJson.loteca(undefined, __dirname + '/temp/loteca.html');
    require('fs').writeFileSync(__dirname + '/temp/loteca.json', JSON.stringify(loteca, null, 2));

    console.debug('Dia de Sorte :::::::::::::: ');
    let diaDeSorte = await loteriasCaixaJson.diaDeSorte(undefined, __dirname + '/temp/diaDeSorte.html');
    require('fs').writeFileSync(__dirname + '/temp/diaDeSorte.json', JSON.stringify(diaDeSorte, null, 2));

  } catch (error) {
    console.error(error);
  }
}
console.log("teste");
makeJson();
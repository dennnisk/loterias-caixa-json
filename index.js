
var path = require('path');

exports.megaSena = function(tempDirectory) {
	let megaSena = require('./lib/mega-sena');

	return new Promise(function(resolve, reject) {
		megaSena.downloadResultadosMegaSena(path.normalize(tempDirectory))
			.then(function(nomeArquivoComResultados) {
				return megaSena.htmlToJson(nomeArquivoComResultados);
			}).then(function (jsonRegistros) {
				resolve(jsonRegistros);
			}).catch(function (err) {
				reject(err);
			});
	});
};

exports.logoFacil = function(tempDirectory) {
	let lotoFacil = require('./lib/loto-facil');

	return lotoFacil.downloadResultadosLotoFacil(path.normalize(tempDirectory))
			.then(function(nomeArquivoComResultados) {
				return lotoFacil.htmlToJson(nomeArquivoComResultados);
			}).catch(function (err) {
				return err;
			});
};


var request = require('request');
var fs = require('fs'); // fs para escrever diretamente para o disco, much win
var path = require('path');
var admZip = require('adm-zip');


var _unzip = function (fileId, destinationFolder) {
  let zip = new admZip(fileId);
  zip.extractAllTo(destinationFolder, true);
}


var _download = function (arquivo, options, callback) {
  var p = new Promise(function (resolve, reject) {

    const {
      pasta,
      nome
    } = options;

    var id = nome;
    var dest = path.join(pasta, id);

    var dir = path.normalize(pasta);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, 0744);
    }

    var writeStream = fs.createWriteStream(dest);

    // Avisando a promise que acabamos por aqui
    writeStream.on('finish', function () {
      resolve(id);
    });

    // Capturando erros da write stream
    writeStream.on('error', function (err) {
      fs.unlink(dest, reject.bind(null, err));
    });

    var readStream = request.get(arquivo, {
      jar: true
    });

    // Capturando erros da request stream
    readStream.on('error', function (err) {
      fs.unlink(dest, reject.bind(null, err));
    });

    // Iniciando a transferência de dados
    readStream.pipe(writeStream);
  });

  // Manter compatibilidade com callbacks
  if (!callback)
    return p;

  p.then(function (id) {
    callback(null, id);
  }).catch(function (err) {
    callback(err);
  });
};



/**
 * Faz o download dos resultados da loteria desejada
 * @param {string} folder Diretório temporario
 * @param {string} url exemplo: 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_megase.zip'
 * @param {string} loteria exemplo: megasena
 * @param {string} arquivoComResultados exemplo: 'D_MEGA.HTM'
 */
exports.downloadResultados = function (folder, url, loteria, arquivoComResultados) {
  return new Promise(function (resolve, reject) {
    // Cria a promise
    //const url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_megase.zip';

    folder = path.normalize((folder) ? folder : './temp/');

    const options = {
      pasta: folder,
      nome: loteria + '.zip' //'megasena.zip'
    };

    _download(url, options)
      .then(function (fileId) {
        fileId = path.join(folder, fileId);
        pastaDestino = path.join(folder, loteria);
        _unzip(fileId, pastaDestino);
        let nomeArquivoHTMLResultados = path.join(pastaDestino, arquivoComResultados);
        resolve(nomeArquivoHTMLResultados);
      }).catch(function (err) {
        console.error('Erro ao realizar o download ou extração do zip da loteria ' + loteria, err);
        reject(err);
      });

  });
}


/**
 * Converte o texto do html da caixa para numero com decimais
 * @param {string} value valor string a ser convertido
 */
exports.parseToFloat = function (value) {
  if (value) {
    value = value.replace(/\./g, '');
    value = value.replace(/\,/g, '.');
  }
  return parseFloat(value) == NaN ? value : parseFloat(value);
}


/**
 * Converte o texto do html da caixa para numero com decimais
 * @param {string} value valor string a ser convertido
 */
exports.parseToInt = function (value) {
  if (value) {
    value = value.replace(/\./g, '');
    value = value.replace(/\,/g, '.');
  }
  return parseInt(value) == NaN ? value : parseInt(value);
}
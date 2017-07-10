# loterias-caixa-json
Módulo feito em node.js para obter o resultado das loterias da caixa e devolver um JSON com todos os dados.

## Exemplo de uso

You can see and example at the folder `example`

```javascript
var loteriasCaixaJson = require('loterias-caixa-json');

// Mega sena
loteriasCaixaJson.megaSena('./temp/')
  .then((jsonArray) => {
    // Retorno de todos os jogos da mega sena em formato json
    console.debug(jsonArray);
  }).catch((err) => {
    console.error(err);
  });

// Loto Fácil
loteriasCaixaJson.lotoFacil('./temp/')
  .then((jsonArray) => {
    // Retorno de todos os jogos da mega sena em formato json
    console.debug(jsonArray);
  }).catch((err) => {
    console.error(err);
  });
```

## Exemplo dos Retornos

### Mega-Sena
```javascript

megaSena = {
	"Concurso": 1947,
	"DataSorteio": "08/07/2017",
	"Dezena1": 52,
	"Dezena2": 59,
	"Dezena4": 40,
	"Dezena5": 8,
	"Dezena3": 55,
	"Dezena6": 33,
	"Arrecadacao_Total": 45280627,
	"Ganhadores_Sena": 0,
	"Cidade": " ",
	"UF": " ",
	"Rateio_Sena": 0,
	"Ganhadores_Quina": 63,
	"Rateio_Quina": 41438.63,
	"Ganhadores_Quadra": 4250,
	"Rateio_Quadra": 877.52,
	"Acumulado": null,
	"Valor_Acumulado": 31543054.69,
	"Estimativa_Prêmio": 36000000,
	"Acumulado_Mega_da_Virada": 36527380.26
};
```

### Loto Fácil

```javascript
lotoFacil = {
	"Concurso": 1534,
	"Data": "07/07/2017",
	"Bola1": 10,
	"Bola2": 11,
	"Bola3": 9,
	"Bola4": 4,
	"Bola5": 5,
	"Bola6": 21,
	"Bola7": 17,
	"Bola8": 13,
	"Bola9": 24,
	"Bola10": 16,
	"Bola11": 8,
	"Bola12": 1,
	"Bola13": 12,
	"Bola14": 19,
	"Bola15": 14,
	"Arrecadacao_Total": 24031176,
	"Ganhadores_15_Numeros": 1,
	"Cidades": [{
		"Cidade": "SANTA INÊS",
		"UF": "MA"
	}],
	"Ganhadores_14_Numeros": 357,
	"Ganhadores_13_Numeros": 13908,
	"Ganhadores_12_Numeros": 186284,
	"Ganhadores_11_Numeros": 1034775,
	"Valor_Rateio_15_Numeros": 2051963.67,
	"Valor_Rateio_14_Numeros": 1768.55,
	"Valor_Rateio_13_Numeros": 20,
	"Valor_Rateio_12_Numeros": 8,
	"Valor_Rateio_11_Numeros": 4,
	"Acumulado_15_Numeros": 0,
	"Estimativa_Premio": 1700000,
	"Valor_Acumulado_Especial": 51034869.58
}

```



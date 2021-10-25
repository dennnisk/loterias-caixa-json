# loterias-caixa-json
Módulo feito em node.js para obter o resultado das loterias da caixa e devolver um JSON com todos os dados.

## Versão 2.0

Alterado para utilizar o novo formato da caixa, para realizar os downloads e gerar os JSONs

## Exemplo de uso

You can see and example at the folder `example`

```javascript
var loteriasCaixaJson = require('loterias-caixa-json');

// (...)

try {
	// Realizada o download e retorna o JSON com os resultados da Mega Sena
	let megaSenaJson = await loteriasCaixaJson.megaSena();
	console.debug(megaSenaJson);

	// Realizada o download e retorna o JSON com os resultados da Loto Fácil
	let lotoFacilJson = await loteriasCaixaJson.lotoFacil()
	console.debug(lotoFacilJson);

	// Realizada o download e retorna o JSON com os resultados da Quina
	let quina = await loteriasCaixaJson.quina()
	console.debug(quina);

	// Realizada o download e retorna o JSON com os resultados da Lotomania
	let lotomania = await loteriasCaixaJson.lotomania()
	console.debug(lotomania);

} catch (error) {
	console.error(error);
}

```

## Exemplo dos Retornos

### Mega-Sena
```json
[
  {
    "concurso": 1850,
    "local": "IPU, CE",
    "dataSorteio": "24/08/2016",
    "dezena1": 23,
    "dezena2": 24,
    "dezena3": 32,
    "dezena4": 38,
    "dezena5": 40,
    "dezena6": 41,
    "dezenas": [23,24,32,38,40,41],
    "ganhadoresFaixa1": 1,
    "ganhadoresFaixa2": 81,
    "ganhadoresFaixa3": 5935,
    "rateioFaixa1": 58632725.66,
    "rateioFaixa2": 48339.16,
    "rateioFaixa3": 942.46,
    "cidadesComGanhadores": [
      {"nome": "RIO DE JANEIRO","uf": "RJ"}
    ],
    "valorArrecadado": null,
    "estimativaProximoConcurso": null,
    "valorAcumuladoProximoConcurso": 67912631.5,
    "acumulado": false,
    "sorteioEspecial": false,
    "observacao": "NAO"
  }
]
```

### Loto Fácil

```json
[
  {
    "Concurso": 1,
    "Data": "29/09/2003",
    "Bola1": 2,
    "Bola2": 3,
    "Bola3": 5,
    "Bola4": 6,
    "Bola5": 9,
    "Bola6": 10,
    "Bola7": 11,
    "Bola8": 13,
    "Bola9": 14,
    "Bola10": 16,
    "Bola11": 18,
    "Bola12": 20,
    "Bola13": 23,
    "Bola14": 24,
    "Bola15": 25,
    "Arrecadacao_Total": 0,
    "Ganhadores_15_Numeros": 5,
    "Cidades": [{"UF": "BA"}],
    "Ganhadores_14_Numeros": 154,
    "Ganhadores_13_Numeros": 4645,
    "Ganhadores_12_Numeros": 48807,
    "Ganhadores_11_Numeros": 257593,
    "Valor_Rateio_15_Numeros": 49765.82,
    "Valor_Rateio_14_Numeros": 689.84,
    "Valor_Rateio_13_Numeros": 10,
    "Valor_Rateio_12_Numeros": 4,
    "Valor_Rateio_11_Numeros": 2,
    "Acumulado_15_Numeros": 0,
    "Estimativa_Premio": 0,
    "Valor_Acumulado_Especial": 0
  }
]
```

### Quina

```json
[
  {
    "concurso": 3406,
    "data_Sorteio": "01/02/2014",
    "dezena1": 23,
    "dezena2": 37,
    "dezena3": 41,
    "dezena4": 44,
    "dezena5": 80,
    "dezenas": [23,37,41,44,80],
    "arrecadacao_Total": 6258402,
    "ganhadores_Quina": 2,
    "cidades": [
      {"Cidade": "CIANORTE","UF": "PR"},
      {"Cidade": "ITATIBA","UF": "SP"}
    ],
    "rateio_Quina": 903760.93,
    "ganhadores_Quadra": 92,
    "rateio_Quadra": 5240.29,
    "ganhadores_Terno": 6759,
    "rateio_Terno": 101.89,
    "ganhadores_Duque": 0,
    "rateio_Duque": 0,
    "acumulado": false,
    "valor_Acumulado": 0,
    "estimativa_Premio": 0,
    "valor_Acumulado_Sorteio_Especial_Sao_Joao": 53169239.62
  }
]
```


### Lotomania

```json
{
    "concurso": 1549,
    "data": "25/04/2015",
    "bola1": 3,
    "bola2": 6,
    "bola3": 14,
    "bola4": 21,
    "bola5": 37,
    "bola6": 46,
    "bola7": 49,
    "bola8": 56,
    "bola9": 59,
    "bola10": 60,
    "bola11": 63,
    "bola12": 64,
    "bola13": 66,
    "bola14": 74,
    "bola15": 78,
    "bola16": 79,
    "bola17": 84,
    "bola18": 92,
    "bola19": 94,
    "bola20": 95,
    "arrecadacao_Total": "6.446.841,00",
    "ganhadores_20_Numeros": "1",
    "cidade": [
      {"Cidade": "NOVO ORIENTE DE MINAS","UF": "MG"},
      {"Cidade": "MONTE CASTELO","UF": "SC"}
    ],
    "bolas": [3,6,14,21,37,46,49,56,59,60,63,64,66,74,78,79,84,92,94,95],
    "uf": 9,
    "ganhadores_19_Numeros": 102,
    "ganhadores_18_Numeros": 1084,
    "ganhadores_17_Numeros": 6895,
    "ganhadores_16_Numeros": 1,
    "ganhadores_Nenhum_Numero": 3554440,
    "valor_Rateio_20_Numeros": 35315.39,
    "valor_Rateio_19_Numeros": 3116.06,
    "valor_Rateio_18_Numeros": 183.25,
    "valor_Rateio_17_Numeros": 28.81,
    "valor_Rateio_16_Numeros": 158919.25,
    "valor_Rateio_Nenhum_Numero": 0,
    "acumulado_20_Numeros": 400000,
    "estimativa_Premio": 1856680.07,
    "valor_Acumulado_Especial": null
  }
```

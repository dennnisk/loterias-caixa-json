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

	// Realizada o download e retorna o JSON com os resultados da Timemania
	let timemania = await loteriasCaixaJson.timemania()
	console.debug(timemania);

	// Realizada o download e retorna o JSON com os resultados da Supla Sena
	let duplaSena = await loteriasCaixaJson.duplaSena()
	console.debug(duplaSena);

	// Realizada o download e retorna o JSON com os resultados da Loteca
	let loteca = await loteriasCaixaJson.loteca()
	console.debug(loteca);

	// Realizada o download e retorna o JSON com os resultados da Dia de Sorte
	let diaDeSorte = await loteriasCaixaJson.diaDeSorte()
	console.debug(diaDeSorte);

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

### Timemania

*Importante: o site da Caixa, no momento do desenvolvimento, não estava disponibilizando as Bolas Corretamente, por isso os campos "bolaX" não possuem as dezenas no exemplo, mas está desenvolvido para extrair os dados.*

```json
{
    "concurso": 373,
    "data_Sorteio": "05/12/2012",
    "bola1": "dezena1",
    "bola2": "dezena2",
    "bola3": "dezena3",
    "bola4": "dezena4",
    "bola5": "dezena5",
    "bola6": "dezena6",
    "bola7": "dezena7",
    "time_Coracao": "PONTE PRETA/SP",
    "valor_Arrecadado": "3.307.986,00",
    "ganhadores_7_Numeros": 1,
    "cidade": [
      {
        "Cidade": "SÃO PAULO",
        "UF": "SP"
      }
    ],
    "ganhadores_6_Numeros": 11,
    "ganhadores_5_Numeros": 370,
    "ganhadores_4_Numeros": 6403,
    "ganhadores_3_Numeros": 58233,
    "ganhadores_Time_Coracao": 14671,
    "valor_Rateio_7_Numeros": 8021889.1,
    "valor_Rateio_6_Numeros": 16461.9,
    "valor_Rateio_5_Numeros": 699.15,
    "valor_Rateio_4_Numeros": 6,
    "valor_Rateio_3_Numeros": 2,
    "valor_Time_Coracao": 5,
    "valor_Acumulado": 0,
    "estimativa_Premio": 150000,
    "bolas": [
      "dezena1",
      "dezena2",
      "dezena3",
      "dezena4",
      "dezena5",
      "dezena6",
      "dezena7"
    ]
  }
```  

### Dupla Sena

```json
{
    "concurso": 2212,
    "data_Sorteio": "17/04/2021",
    "numero_1_Sorteio1": 14,
    "numero_2_Sorteio1": 31,
    "numero_3_Sorteio1": 33,
    "numero_4_Sorteio1": 42,
    "numero_5_Sorteio1": 47,
    "numero_6_Sorteio1": 50,
    "sorteio1": [14,31,33,42,47,50],
    "arrecadacao_Total": 95241005,
    "ganhadores_Sena_Sorteio1": 4,
    "cidade": [
      {"Cidade": "BARBACENA","UF": "MG"},
      {"Cidade": "CAMPO GRANDE","UF": "MS"},
      {"Cidade": "BELEM","UF": "PA"},
      {"Cidade": "RIO DE JANEIRO","UF": "RJ"},
      {"Cidade": "BAURU","UF": "SP"},
      {"Cidade": "GUARULHOS","UF": "SP"},
      {"Cidade": "SAO PAULO","UF": "SP"}
    ],
    "rateio_Sena_Sorteio1": "NAO",
    "acumulado_Sena_Sorteio1": false,
    "valor_Acumulado_Sena_Sorteio1": 722,
    "ganhadores_Quina_Sorteio1": 4002,
    "rateio_Quina_Sorteio1": 38620,
    "ganhadores_Quadra_Sorteio1": 85,
    "rateio_Quadra_Sorteio1": 680930,
    "ganhadores_Terno_Sorteio1": 2,
    "rateio_Terno_Sorteio1": 6,
    "numero_1_Sorteio2": 7,
    "numero_2_Sorteio2": 11,
    "numero_3_Sorteio2": 14,
    "numero_4_Sorteio2": 27,
    "numero_5_Sorteio2": 35,
    "numero_6_Sorteio2": 3,
    "sorteio2": [7,11,14,27,35,3],
    "ganhadores_Sena_Sorteio2": 1059699,
    "rateio_Sena_Sorteio2": 655,
    "ganhadores_Quina_Sorteio2": 3971,
    "rateio_Quina_Sorteio2": 37439,
    "ganhadores_Quadra_Sorteio2": 88,
    "rateio_Quadra_Sorteio2": 676364,
    "ganhadores_Terno_Sorteio2": 2,
    "rateio_Terno_Sorteio2": 150000,
    "estimativa_Premio": 0,
    "acumulado_Especial_de_Pascoa": false
  }
  ```



### Loteca

*Importante: o site da Caixa, no momento do desenvolvimento, não estava disponibilizando os Jogos Corretamente, por isso os campos "jogo_X" não possuem as dezenas corretamente, mas foi feito para funcionar quando o site da caixa for corrigido.*


```json
  {
    "concurso": "591",
    "data_Sorteio": "28/01/2014",
    "ganhadores_14_Acertos": 3,
    "cidade": [
      {"Cidade": "SANTO ANTÔNIO DO MONTE","UF": "MG"},
      {"Cidade": "AMAMBAÍ","UF": "MS"},
      {"Cidade": "SÃO PAULO","UF": "SP"}
    ],
    "valor_Rateio_14_Acertos": 327587.94,
    "acumulado": false,
    "valor_Acumulado_14_Acertos": 0,
    "ganhadores_13_Acertos": 54,
    "valor_Rateio_13_Acertos": 1512.73,
    "ganhadores_12_Acertos": 0,
    "valor_Rateio_12_Acertos": 0,
    "jogo_1": "coluna01",
    "jogo_2": "coluna02",
    "jogo_3": "coluna03",
    "jogo_4": "coluna04",
    "jogo_5": "coluna05",
    "jogo_6": "coluna06",
    "jogo_7": "coluna07",
    "jogo_8": "coluna08",
    "jogo_9": "coluna09",
    "jogo_10": "coluna10",
    "jogo_11": "coluna11",
    "jogo_12": "coluna12",
    "jogo_13": "coluna13",
    "jogo_14": "coluna14",
    "jogos": ["coluna01","coluna02","coluna03","coluna04","coluna05","coluna06","coluna07","coluna08","coluna09","coluna10","coluna11","coluna12","coluna13","coluna14"],
    "arrecadacao_Total": 2032452.5,
    "estimativa_Prêmio": 300000
  }
  ```


### Dia de Sorte

```json
  {
    "concurso": 25,
    "local": "SÃO PAULO, SP",
    "data_do_Sorteio": "17/07/2018",
    "numero_1": 1,
    "numero_2": 10,
    "numero_3": 13,
    "numero_4": 17,
    "numero_5": 21,
    "numero_6": 25,
    "numero_7": 29,
    "numeros": [1,10,13,17,21,25,29],
    "mes_da_Sorte": 7,
    "ganhadores_Faixa_1": 10,
    "ganhadores_Faixa_2": 392,
    "ganhadores_Faixa_3": 8017,
    "ganhadores_Faixa_4": 75597,
    "ganhadores_Faixa_5": 210521,
    "rateio_Faixa_1": 66134.25,
    "rateio_Faixa_2": 1032.91,
    "rateio_Faixa_3": 20,
    "rateio_Faixa_4": 4,
    "rateio_Faixa_5": 2,
    "cidade": [
      { "Cidade": "SALVADOR", "UF": "BA" }, 
      { "Cidade": "POTE", "UF": "MG" }, 
      { "Cidade": "SANTA LUZIA", "UF": "MG" }, 
      { "Cidade": "QUERÊNCIA", "UF": "MT" }, 
      { "Cidade": "COLORADO", "UF": "PR" }, 
      { "Cidade": "CAMPO DOS GOYTACAZES", "UF": "RJ" }, 
      { "Cidade": "RIO DE JANEIRO", "UF": "RJ" }, 
      { "Cidade": "BAURU", "UF": "SP" }, 
      { "Cidade": "ITU", "UF": "SP" }, 
      { "Cidade": "SÃO JOSÉ DO RIO PRETO", "UF": "SP" } 
    ],
    "valor_Arrecadado": 5152216,
    "estimativa_proximo_concurso": 500000,
    "valor_Acumulado_Proximo_Concurso": 0,
    "acumulado": false,
    "sorteio_Especial": true,
    "observacao": ""
  }
  ```
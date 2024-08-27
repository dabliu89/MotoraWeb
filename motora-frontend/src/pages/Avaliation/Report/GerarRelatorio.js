const { avaliarIMC } = require('../Classification/BMI');
const { avaliarRCE } = require('../Classification/RCE');
const { avaliarDesempenho } = require('../Classification/6Minutos');
const { avaliarSentarAlcancar } = require('../Classification/SentarEAlcancar');
const { avaliarAbdominais } = require('../Classification/AbdominaisEm1Minuto');
const { avaliarArremesso } = require('../Classification/ArremessoDeMedicineball');
const { avaliarCorrida } = require('../Classification/CorridaDe20Metros');
const { criarPDF } = require('./GeneratePDF');

function combinarResultados(resultados) {
    return {
        'Teste de IMC': avaliarIMC(resultados.massa, resultados.estatura, resultados.sexo, resultados.idade),
        'Teste de RCE': avaliarRCE(resultados.perimetroCintura, resultados.estatura),
        'Teste de 6 Minutos': avaliarDesempenho(resultados.distanciaPercorrida, resultados.idade, resultados.sexo),
        'Teste de Sentar e Alcançar': avaliarSentarAlcancar(resultados.sentarAlcancar, resultados.idade, resultados.sexo),
        'Teste de Abdominais': avaliarAbdominais(resultados.abdominais, resultados.idade, resultados.sexo),
        'Arremesso de Medicine Ball': avaliarArremesso(resultados.arremesso, resultados.idade, resultados.sexo),
        'Corrida de 20 Metros': avaliarCorrida(resultados.corrida, resultados.idade, resultados.sexo)
    };
}

const dadosDeEntrada = {
    massa: 60,
    estatura: 1.70,
    sexo: 'Rapazes',
    idade: 15,
    perimetroCintura: 80,
    distanciaPercorrida: 900,
    sentarAlcancar: 30,
    abdominais: 35,
    arremesso: 250,
    corrida: 4.0
};

async function gerarRelatorio() {
    const resultados = combinarResultados(dadosDeEntrada);
    await criarPDF(resultados);
}
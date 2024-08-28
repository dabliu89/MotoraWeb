export function classificarCorrida(tempo, idade, sexo) {
    const pontosDeCorte = {
        'Rapazes': [4.81, 4.52, 4.31, 4.25, 4.09, 4.00, 3.88, 3.72, 3.54, 3.40, 3.28, 3.22],
        'Moças': [5.22, 4.88, 4.66, 4.58, 4.44, 4.36, 4.28, 4.17, 4.16, 4.07, 4.01, 3.91]
    };

    if (idade < 6 || idade > 17) {
        return "Idade fora do intervalo permitido (6-17 anos)";
    }

    const indiceIdade = idade - 6;
    const corteCorrida = sexo === 'Rapazes' ? pontosDeCorte['Rapazes'][indiceIdade] : pontosDeCorte['Moças'][indiceIdade];

    if (tempo <= corteCorrida) {
        return "Zona Saudável";
    } else {
        return "Zona de Risco à Saúde";
    }
}

export function avaliarCorrida(tempo, idade, sexo) {
    const classificacao = classificarCorrida(tempo, idade, sexo);
    return `Tempo: ${tempo.toFixed(1)} segundos - Classificação: ${classificacao}`;
}
function classificarAbdominais(qtdAbdominais, idade, sexo) {
    const pontosDeCorte = {
        'Rapazes': [18, 18, 24, 26, 31, 37, 41, 42, 43, 45, 46, 47],
        'Moças': [18, 18, 18, 20, 26, 30, 30, 33, 34, 34, 34, 34]
    };

    if (idade < 6 || idade > 17) {
        return "Idade fora do intervalo permitido (6-17 anos)";
    }

    const indiceIdade = idade - 6;
    const corteAbdominais = sexo === 'Rapazes' ? pontosDeCorte['Rapazes'][indiceIdade] : pontosDeCorte['Moças'][indiceIdade];

    if (qtdAbdominais >= corteAbdominais) {
        return "Zona Saudável";
    } else {
        return "Zona de Risco à Saúde";
    }
}

function avaliarAbdominais(qtdAbdominais, idade, sexo) {
    const classificacao = classificarAbdominais(qtdAbdominais, idade, sexo);
    return `Quantidade de abdominais: ${qtdAbdominais} - Classificação: ${classificacao}`;
}
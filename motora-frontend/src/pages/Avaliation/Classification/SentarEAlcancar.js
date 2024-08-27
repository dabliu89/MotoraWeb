function classificarSentarAlcancar(valorTeste, idade, sexo) {
    const pontosDeCorte = {
        'Rapazes': [29, 29, 32.5, 29, 29.5, 29.5, 29.5, 26.5, 30.5, 31, 34.5, 34],
        'Moças': [40.5, 40.5, 39.5, 35.0, 36.5, 34.5, 39.5, 38.5, 38.5, 38.5, 39.5, 39.5]
    };

    if (idade < 6 || idade > 17) {
        return "Idade fora do intervalo permitido (6-17 anos)";
    }

    const indiceIdade = idade - 6;
    const corteSentarAlcancar = sexo === 'Rapazes' ? pontosDeCorte['Rapazes'][indiceIdade] : pontosDeCorte['Moças'][indiceIdade];

    if (valorTeste >= corteSentarAlcancar) {
        return "Zona Saudável";
    } else {
        return "Zona de Risco à Saúde";
    }
}

function avaliarSentarAlcancar(valorTeste, idade, sexo) {
    const classificacao = classificarSentarAlcancar(valorTeste, idade, sexo);
    return `Valor do teste: ${valorTeste} cm - Classificação: ${classificacao}`;
}
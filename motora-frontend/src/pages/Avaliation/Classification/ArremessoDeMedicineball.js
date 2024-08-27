function classificarArremesso(valorTeste, idade, sexo) {
    const pontosDeCorte = {
        'Rapazes': [147.0, 168.7, 190.0, 210.0, 232.0, 260.0, 290.0, 335.0, 400.0, 440.0, 480.0, 500.0],
        'Moças': [125.0, 140.0, 158.1, 175.0, 202.0, 228.0, 260.0, 280.0, 290.0, 306.0, 310.0, 315.0]
    };

    if (idade < 6 || idade > 17) {
        return "Idade fora do intervalo permitido (6-17 anos)";
    }

    const indiceIdade = idade - 6;
    const corteArremesso = sexo === 'Rapazes' ? pontosDeCorte['Rapazes'][indiceIdade] : pontosDeCorte['Moças'][indiceIdade];

    if (valorTeste >= corteArremesso) {
        return "Zona Saudável";
    } else {
        return "Zona de Risco à Saúde";
    }
}

function avaliarArremesso(valorTeste, idade, sexo) {
    const classificacao = classificarArremesso(valorTeste, idade, sexo);
    return `Valor do teste: ${valorTeste} cm - Classificação: ${classificacao}`;
}
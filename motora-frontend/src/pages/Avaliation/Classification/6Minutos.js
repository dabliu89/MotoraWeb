function classificarDistancia(metros, idade, sexo) {
    const pontosDeCorte = {
        'Rapazes': [675, 730, 768, 820, 856, 930, 966, 995, 1060, 1130, 1190, 1190],
        'Moças': [630, 683, 715, 745, 790, 840, 900, 940, 985, 1005, 1070, 1110]
    };

    if (idade < 6 || idade > 17) {
        return "Idade fora do intervalo permitido (6-17 anos)";
    }

    const indiceIdade = idade - 6;
    const corteDistancia = sexo === 'Rapazes' ? pontosDeCorte['Rapazes'][indiceIdade] : pontosDeCorte['Moças'][indiceIdade];

    if (metros >= corteDistancia) {
        return "Zona de Risco à Saúde";
    } else {
        return "Zona Saudável";
    }
}

function avaliarDesempenho(metros, idade, sexo) {
    const classificacao = classificarDistancia(metros, idade, sexo);
    return `Distância: ${metros} metros - Classificação: ${classificacao}`;
}
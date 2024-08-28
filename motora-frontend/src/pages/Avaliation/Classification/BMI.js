export function calcularIMC(massa, estatura) {
    return massa / (estatura * estatura);
}

export function classificarIMC(imc, idade, sexo) {
    const pontosDeCorte = {
        'Rapazes': [17.7, 17.8, 19.2, 19.3, 20.7, 22.1, 22.2, 22.0, 22.2, 23.0, 24.0, 25.4],
        'Moças': [17.0, 17.1, 18.2, 19.1, 20.9, 22.3, 22.6, 22.0, 22.0, 22.4, 24.0, 24.0]
    };

    if (idade < 6 || idade > 17) {
        return "Idade fora do intervalo permitido (6-17 anos)";
    }

    const indiceIdade = idade - 6;
    const corteIMC = sexo === 'Rapazes' ? pontosDeCorte['Rapazes'][indiceIdade] : pontosDeCorte['Moças'][indiceIdade];

    if (imc >= corteIMC) {
        return "Zona de Risco à Saúde";
    } else {
        return "Zona Saudável";
    }
}

export function avaliarIMC(massa, estatura, sexo, idade) {
    const imc = calcularIMC(massa, estatura);
    const classificacao = classificarIMC(imc, idade, sexo);
    return `IMC: ${imc.toFixed(2)} - Classificação: ${classificacao}`;
}
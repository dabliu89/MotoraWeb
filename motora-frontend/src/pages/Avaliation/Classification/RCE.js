function calcularRCE(perimetroCintura, estatura) {
    return perimetroCintura / (estatura * 100);
}

function classificarRCE(rce) {
    const pontoDeCorte = 0.5;

    if (rce >= pontoDeCorte) {
        return "Zona de Risco à Saúde";
    } else {
        return "Zona Saudável";
    }
}

function avaliarRCE(perimetroCintura, estatura) {
    const rce = calcularRCE(perimetroCintura, estatura);
    const classificacao = classificarRCE(rce);
    return `RCE: ${rce.toFixed(2)} - Classificação: ${classificacao}`;
}
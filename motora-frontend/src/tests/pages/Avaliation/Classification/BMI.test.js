import { calcularIMC, classificarIMC, avaliarIMC } from '../../../../pages/Avaliation/Classification/BMI';

describe('Testes para a função calcularIMC', () => {
    
    test('Deve calcular o IMC corretamente', () => {
        expect(calcularIMC(70, 1.75)).toBeCloseTo(22.86, 2);
    });
    
    test('Deve calcular o IMC para outra massa e estatura', () => {
        expect(calcularIMC(60, 1.60)).toBeCloseTo(23.44, 2);
    });
    
});

describe('Testes para a função classificarIMC', () => {
    
    test('Deve classificar como "Zona Saudável" para Rapazes com IMC abaixo do ponto de corte', () => {
        expect(classificarIMC(17.5, 10, 'Rapazes')).toBe('Zona Saudável');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para Rapazes com IMC acima do ponto de corte', () => {
        expect(classificarIMC(24.5, 16, 'Rapazes')).toBe('Zona de Risco à Saúde');
    });
    
    test('Deve classificar como "Zona Saudável" para Moças com IMC abaixo do ponto de corte', () => {
        expect(classificarIMC(19.0, 12, 'Moças')).toBe('Zona Saudável');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para Moças com IMC acima do ponto de corte', () => {
        expect(classificarIMC(25.0, 14, 'Moças')).toBe('Zona de Risco à Saúde');
    });

    test('Deve retornar mensagem de erro para idade fora do intervalo permitido', () => {
        expect(classificarIMC(20, 5, 'Rapazes')).toBe("Idade fora do intervalo permitido (6-17 anos)");
    });
    
});

describe('Testes para a função avaliarIMC', () => {
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Rapazes', () => {
        expect(avaliarIMC(70, 1.75, 'Rapazes', 16)).toBe('IMC: 22.86 - Classificação: Zona Saudável');
    });
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Moças', () => {
        expect(avaliarIMC(50, 1.60, 'Moças', 14)).toBe('IMC: 19.53 - Classificação: Zona Saudável');
    });
    
    test('Deve retornar mensagem de erro em avaliarIMC para idade fora do intervalo', () => {
        expect(avaliarIMC(55, 1.50, 'Rapazes', 18)).toBe('IMC: 24.44 - Classificação: Idade fora do intervalo permitido (6-17 anos)');
    });

});

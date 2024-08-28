import { calcularRCE, classificarRCE, avaliarRCE } from '../../../pages/Avaliation/Classification/RCE';

describe('Testes para a função calcularRCE', () => {
    
    test('Deve calcular o RCE corretamente', () => {
        expect(calcularRCE(80, 1.75)).toBeCloseTo(0.46, 2);
    });
    
    test('Deve calcular o RCE para outro perimetro de cintura e estatura', () => {
        expect(calcularRCE(95, 1.60)).toBeCloseTo(0.59, 2);
    });
    
});

describe('Testes para a função classificarRCE', () => {
    
    test('Deve classificar como "Zona Saudável" para RCE abaixo do ponto de corte', () => {
        expect(classificarRCE(0.46)).toBe('Zona Saudável');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para RCE igual ao ponto de corte', () => {
        expect(classificarRCE(0.5)).toBe('Zona de Risco à Saúde');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para RCE acima do ponto de corte', () => {
        expect(classificarRCE(0.55)).toBe('Zona de Risco à Saúde');
    });
    
});

describe('Testes para a função avaliarRCE', () => {
    
    test('Deve avaliar corretamente e retornar mensagem formatada para RCE na zona saudável', () => {
        expect(avaliarRCE(70, 1.80)).toBe('RCE: 0.39 - Classificação: Zona Saudável');
    });
    
    test('Deve avaliar corretamente e retornar mensagem formatada para RCE na zona de risco à saúde', () => {
        expect(avaliarRCE(100, 1.70)).toBe('RCE: 0.59 - Classificação: Zona de Risco à Saúde');
    });

});

import { classificarCorrida, avaliarCorrida } from '../../../pages/Avaliation/Classification/CorridaDe20Metros';

describe('Testes para a função classificarCorrida', () => {
    
    test('Deve classificar como "Zona Saudável" para Rapazes com tempo abaixo do ponto de corte', () => {
        expect(classificarCorrida(3.5, 10, 'Rapazes')).toBe('Zona Saudável');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para Rapazes com tempo acima do ponto de corte', () => {
        expect(classificarCorrida(5.0, 10, 'Rapazes')).toBe('Zona de Risco à Saúde');
    });
    
    test('Deve classificar como "Zona Saudável" para Moças com tempo abaixo do ponto de corte', () => {
        expect(classificarCorrida(4.0, 12, 'Moças')).toBe('Zona Saudável');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para Moças com tempo acima do ponto de corte', () => {
        expect(classificarCorrida(5.5, 12, 'Moças')).toBe('Zona de Risco à Saúde');
    });

    test('Deve retornar mensagem de erro para idade fora do intervalo permitido', () => {
        expect(classificarCorrida(4.0, 5, 'Rapazes')).toBe("Idade fora do intervalo permitido (6-17 anos)");
    });
    
});

describe('Testes para a função avaliarCorrida', () => {
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Rapazes', () => {
        expect(avaliarCorrida(3.5, 10, 'Rapazes')).toBe('Tempo: 3.5 segundos - Classificação: Zona Saudável');
    });
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Moças', () => {
        expect(avaliarCorrida(4.0, 12, 'Moças')).toBe('Tempo: 4.0 segundos - Classificação: Zona Saudável');
    });
    
    test('Deve retornar mensagem de erro em avaliarCorrida para idade fora do intervalo', () => {
        expect(avaliarCorrida(4.5, 18, 'Rapazes')).toBe('Tempo: 4.5 segundos - Classificação: Idade fora do intervalo permitido (6-17 anos)');
    });

});

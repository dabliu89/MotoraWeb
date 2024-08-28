import { classificarSentarAlcancar, avaliarSentarAlcancar } from '../../../../pages/Avaliation/Classification/SentarEAlcancar';

describe('Testes para a função classificarSentarAlcancar', () => {
    
    test('Deve classificar como "Zona Saudável" para Rapazes com valor de teste acima do ponto de corte', () => {
        expect(classificarSentarAlcancar(35, 10, 'Rapazes')).toBe('Zona Saudável');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para Rapazes com valor de teste abaixo do ponto de corte', () => {
        expect(classificarSentarAlcancar(25, 10, 'Rapazes')).toBe('Zona de Risco à Saúde');
    });
    
    test('Deve classificar como "Zona Saudável" para Moças com valor de teste acima do ponto de corte', () => {
        expect(classificarSentarAlcancar(40, 12, 'Moças')).toBe('Zona Saudável');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para Moças com valor de teste abaixo do ponto de corte', () => {
        expect(classificarSentarAlcancar(30, 12, 'Moças')).toBe('Zona de Risco à Saúde');
    });

    test('Deve retornar mensagem de erro para idade fora do intervalo permitido', () => {
        expect(classificarSentarAlcancar(40, 18, 'Rapazes')).toBe("Idade fora do intervalo permitido (6-17 anos)");
    });
    
});

describe('Testes para a função avaliarSentarAlcancar', () => {
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Rapazes', () => {
        expect(avaliarSentarAlcancar(35, 10, 'Rapazes')).toBe('Valor do teste: 35 cm - Classificação: Zona Saudável');
    });
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Moças', () => {
        expect(avaliarSentarAlcancar(40, 12, 'Moças')).toBe('Valor do teste: 40 cm - Classificação: Zona Saudável');
    });
    
    test('Deve retornar mensagem de erro em avaliarSentarAlcancar para idade fora do intervalo', () => {
        expect(avaliarSentarAlcancar(30, 18, 'Moças')).toBe('Valor do teste: 30 cm - Classificação: Idade fora do intervalo permitido (6-17 anos)');
    });

});

import { classificarAbdominais, avaliarAbdominais } from '../../../../pages/Avaliation/Classification/AbdominaisEm1Minuto';

describe('Testes para a função classificarAbdominais', () => {
    
    test('Deve classificar como "Zona Saudável" para Rapazes com abdominais acima do ponto de corte', () => {
        expect(classificarAbdominais(20, 10, 'Rapazes')).toBe('Zona de Risco à Saúde');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para Rapazes com abdominais abaixo do ponto de corte', () => {
        expect(classificarAbdominais(15, 10, 'Rapazes')).toBe('Zona de Risco à Saúde');
    });
    
    test('Deve classificar como "Zona Saudável" para Moças com abdominais acima do ponto de corte', () => {
        expect(classificarAbdominais(20, 12, 'Moças')).toBe('Zona de Risco à Saúde');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para Moças com abdominais abaixo do ponto de corte', () => {
        expect(classificarAbdominais(15, 12, 'Moças')).toBe('Zona de Risco à Saúde');
    });

    test('Deve retornar mensagem de erro para idade fora do intervalo permitido', () => {
        expect(classificarAbdominais(20, 5, 'Rapazes')).toBe("Idade fora do intervalo permitido (6-17 anos)");
    });
    
});

describe('Testes para a função avaliarAbdominais', () => {
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Rapazes', () => {
        expect(avaliarAbdominais(20, 10, 'Rapazes')).toBe('Quantidade de abdominais: 20 - Classificação: Zona de Risco à Saúde');
    });
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Moças', () => {
        expect(avaliarAbdominais(18, 12, 'Moças')).toBe('Quantidade de abdominais: 18 - Classificação: Zona de Risco à Saúde');
    });
    
    test('Deve retornar mensagem de erro em avaliarAbdominais para idade fora do intervalo', () => {
        expect(avaliarAbdominais(20, 18, 'Rapazes')).toBe('Quantidade de abdominais: 20 - Classificação: Idade fora do intervalo permitido (6-17 anos)');
    });

});

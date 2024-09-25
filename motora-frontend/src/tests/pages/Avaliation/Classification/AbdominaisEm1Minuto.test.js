import { classificarAbdominais, avaliarAbdominais } from '../../../../pages/Avaliation/Classification/AbdominaisEm1Minuto';

describe('Testes para a função classificarAbdominais', () => {
    
    test('Deve classificar como "Zona Saudável" para Rapazes com abdominais no ponto de corte', () => {
        expect(classificarAbdominais(32, 10, 'Rapazes')).toBe('Zona Saudável');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para Rapazes com abdominais abaixo do ponto de corte', () => {
        expect(classificarAbdominais(23, 10, 'Rapazes')).toBe('Zona de Risco à Saúde');
    });

    test('Deve classificar como "Zona Saudável" para Moças com abdominais no ponto de corte', () => {
        expect(classificarAbdominais(18, 6, 'Moças')).toBe('Zona Saudável');
    });

    test('Deve classificar como "Zona de Risco à Saúde" para Moças com abdominais abaixo do ponto de corte', () => {
        expect(classificarAbdominais(17, 6, 'Moças')).toBe('Zona de Risco à Saúde');
    });

    test('Deve classificar corretamente para Rapazes no ponto de corte máximo (47 abdominais para 17 anos)', () => {
        expect(classificarAbdominais(47, 17, 'Rapazes')).toBe('Zona Saudável');
    });
    
    test('Deve classificar corretamente para Moças no ponto de corte máximo (34 abdominais para 17 anos)', () => {
        expect(classificarAbdominais(34, 17, 'Moças')).toBe('Zona Saudável');
    });

    test('Deve classificar corretamente Rapazes com abdominais abaixo do ponto de corte máximo', () => {
        expect(classificarAbdominais(46, 17, 'Rapazes')).toBe('Zona de Risco à Saúde');
    });

    test('Deve retornar mensagem de erro para idade fora do intervalo permitido', () => {
        expect(classificarAbdominais(20, 5, 'Rapazes')).toBe("Idade fora do intervalo permitido (6-17 anos)");
    });
    
    test('Deve retornar mensagem de erro para idade acima do intervalo permitido', () => {
        expect(classificarAbdominais(20, 18, 'Moças')).toBe("Idade fora do intervalo permitido (6-17 anos)");
    });
    
});

describe('Testes para a função avaliarAbdominais', () => {
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Rapazes', () => {
        expect(avaliarAbdominais(32, 10, 'Rapazes')).toBe('Quantidade de abdominais: 32 - Classificação: Zona Saudável');
    });
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Moças', () => {
        expect(avaliarAbdominais(18, 6, 'Moças')).toBe('Quantidade de abdominais: 18 - Classificação: Zona Saudável');
    });

    test('Deve avaliar corretamente e retornar mensagem de Zona de Risco para Rapazes', () => {
        expect(avaliarAbdominais(23, 10, 'Rapazes')).toBe('Quantidade de abdominais: 23 - Classificação: Zona de Risco à Saúde');
    });
    
    test('Deve avaliar corretamente e retornar mensagem de Zona de Risco para Moças', () => {
        expect(avaliarAbdominais(17, 6, 'Moças')).toBe('Quantidade de abdominais: 17 - Classificação: Zona de Risco à Saúde');
    });
    
    test('Deve retornar mensagem de erro para idade fora do intervalo em avaliarAbdominais', () => {
        expect(avaliarAbdominais(20, 18, 'Rapazes')).toBe('Quantidade de abdominais: 20 - Classificação: Idade fora do intervalo permitido (6-17 anos)');
    });
    
});

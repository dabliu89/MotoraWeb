import { classificarArremesso, avaliarArremesso } from '../../../../pages/Avaliation/Classification/ArremessoDeMedicineball';

describe('Testes para a função classificarArremesso', () => {
    
    test('Deve classificar como "Zona Saudável" para Rapazes com valor de teste acima do ponto de corte', () => {
        expect(classificarArremesso(200, 10, 'Rapazes')).toBe('Zona de Risco à Saúde');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para Rapazes com valor de teste abaixo do ponto de corte', () => {
        expect(classificarArremesso(150, 10, 'Rapazes')).toBe('Zona de Risco à Saúde');
    });
    
    test('Deve classificar como "Zona Saudável" para Moças com valor de teste acima do ponto de corte', () => {
        expect(classificarArremesso(180, 12, 'Moças')).toBe('Zona de Risco à Saúde');
    });
    
    test('Deve classificar como "Zona de Risco à Saúde" para Moças com valor de teste abaixo do ponto de corte', () => {
        expect(classificarArremesso(150, 12, 'Moças')).toBe('Zona de Risco à Saúde');
    });

    test('Deve retornar mensagem de erro para idade fora do intervalo permitido', () => {
        expect(classificarArremesso(200, 5, 'Rapazes')).toBe("Idade fora do intervalo permitido (6-17 anos)");
    });
    
});

describe('Testes para a função avaliarArremesso', () => {
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Rapazes', () => {
        expect(avaliarArremesso(210, 10, 'Rapazes')).toBe('Valor do teste: 210 cm - Classificação: Zona de Risco à Saúde');
    });
    
    test('Deve avaliar corretamente e retornar mensagem formatada para Moças', () => {
        expect(avaliarArremesso(300, 12, 'Moças')).toBe('Valor do teste: 300 cm - Classificação: Zona Saudável');
    });
    
    test('Deve retornar mensagem de erro em avaliarArremesso para idade fora do intervalo', () => {
        expect(avaliarArremesso(200, 18, 'Rapazes')).toBe('Valor do teste: 200 cm - Classificação: Idade fora do intervalo permitido (6-17 anos)');
    });

});
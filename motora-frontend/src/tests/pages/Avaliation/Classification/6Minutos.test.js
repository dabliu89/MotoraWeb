import { classificarDistancia, avaliarDesempenho } from '../../../../pages/Avaliation/Classification/6Minutos';

describe('Testes para classificarDistancia e avaliarDesempenho', () => {
    
    test('Classificar distância para Rapazes', () => {
        expect(classificarDistancia(700, 6, 'Rapazes')).toBe('Zona Saudável');
        expect(classificarDistancia(600, 8, 'Rapazes')).toBe('Zona de Risco à Saúde');
        expect(classificarDistancia(820, 9, 'Rapazes')).toBe('Zona Saudável');
        expect(classificarDistancia(1200, 12, 'Rapazes')).toBe('Zona Saudável');
    });

    test('Classificar distância para Moças', () => {
        expect(classificarDistancia(650, 6, 'Moças')).toBe('Zona Saudável');
        expect(classificarDistancia(700, 8, 'Moças')).toBe('Zona de Risco à Saúde');
        expect(classificarDistancia(740, 9, 'Moças')).toBe('Zona de Risco à Saúde');
        expect(classificarDistancia(1200, 12, 'Moças')).toBe('Zona Saudável');
    });

    test('Idade fora do intervalo permitido', () => {
        expect(classificarDistancia(700, 5, 'Rapazes')).toBe('Idade fora do intervalo permitido (6-17 anos)');
        expect(classificarDistancia(700, 18, 'Moças')).toBe('Idade fora do intervalo permitido (6-17 anos)');
    });

    test('avaliarDesempenho retorna a string correta', () => {
        expect(avaliarDesempenho(700, 6, 'Rapazes')).toBe('Distância: 700 metros - Classificação: Zona Saudável');
        expect(avaliarDesempenho(600, 8, 'Moças')).toBe('Distância: 600 metros - Classificação: Zona de Risco à Saúde');
        expect(avaliarDesempenho(800, 12, 'Rapazes')).toBe('Distância: 800 metros - Classificação: Zona de Risco à Saúde');
        expect(avaliarDesempenho(1200, 12, 'Moças')).toBe('Distância: 1200 metros - Classificação: Zona Saudável');
    });
});
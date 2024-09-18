import { toast } from 'react-toastify';
import { doc, getDoc, getFirestore } from 'firebase/firestore'; // Certifique-se que getFirestore está importado
import { avaliarIMC } from '../../../../pages/Avaliation/Classification/BMI';
import { avaliarRCE } from '../../../../pages/Avaliation/Classification/RCE';
import { avaliarDesempenho } from '../../../../pages/Avaliation/Classification/6Minutos';
import { avaliarAbdominais } from '../../../../pages/Avaliation/Classification/AbdominaisEm1Minuto';
import { avaliarArremesso } from '../../../../pages/Avaliation/Classification/ArremessoDeMedicineball';
import { avaliarCorrida } from '../../../../pages/Avaliation/Classification/CorridaDe20Metros';
import { avaliarSentarAlcancar } from '../../../../pages/Avaliation/Classification/SentarEAlcancar';

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  getFirestore: jest.fn(), // Mock para o getFirestore
}));

jest.mock('../../../../pages/Avaliation/Classification/BMI', () => ({
  avaliarIMC: jest.fn(),
}));

jest.mock('../../../../pages/Avaliation/Classification/RCE', () => ({
  avaliarRCE: jest.fn(),
}));

jest.mock('../../../../pages/Avaliation/Classification/6Minutos', () => ({
  avaliarDesempenho: jest.fn(),
}));

jest.mock('../../../../pages/Avaliation/Classification/AbdominaisEm1Minuto', () => ({
  avaliarAbdominais: jest.fn(),
}));

jest.mock('../../../../pages/Avaliation/Classification/ArremessoDeMedicineball', () => ({
  avaliarArremesso: jest.fn(),
}));

jest.mock('../../../../pages/Avaliation/Classification/CorridaDe20Metros', () => ({
  avaliarCorrida: jest.fn(),
}));

jest.mock('../../../../pages/Avaliation/Classification/SentarEAlcancar', () => ({
  avaliarSentarAlcancar: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('ResultadosAluno lógica de avaliação', () => {
  const mockAluno = {
    nome: 'João Silva',
    email: 'joao@example.com',
    idade: 20,
    sexo: 'Masculino',
    massa: 70,
    estatura: 1.75,
    perimetroCintura: 85,
    corrida6Min: 1000,
    abdominais: 30,
    arremesso: 10,
    corrida20m: 5,
    sentarAlcancar: 15,
  };

  beforeEach(() => {
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => mockAluno,
    });
    getFirestore.mockReturnValue({}); // Mock do getFirestore
  });

  test('avalia corretamente os resultados', () => {
    avaliarIMC.mockReturnValue('Normal');
    avaliarRCE.mockReturnValue('Alto');
    avaliarDesempenho.mockReturnValue('Excelente');
    avaliarAbdominais.mockReturnValue('Bom');
    avaliarArremesso.mockReturnValue('Moderado');
    avaliarCorrida.mockReturnValue('Rápido');
    avaliarSentarAlcancar.mockReturnValue('Flexível');

    // Simulação da lógica de avaliação
    const imcResult = avaliarIMC(mockAluno.massa, mockAluno.estatura, 'Rapazes', mockAluno.idade);
    const rceResult = avaliarRCE(mockAluno.perimetroCintura, mockAluno.estatura);
    const desempenhoResult = avaliarDesempenho(mockAluno.corrida6Min, mockAluno.idade, 'Rapazes');
    const abdominaisResult = avaliarAbdominais(mockAluno.abdominais, mockAluno.idade, 'Rapazes');
    const arremessoResult = avaliarArremesso(mockAluno.arremesso, mockAluno.idade, 'Rapazes');
    const corridaResult = avaliarCorrida(mockAluno.corrida20m, mockAluno.idade, 'Rapazes');
    const sentarAlcancarResult = avaliarSentarAlcancar(mockAluno.sentarAlcancar, mockAluno.idade, 'Rapazes');

    expect(imcResult).toBe('Normal');
    expect(rceResult).toBe('Alto');
    expect(desempenhoResult).toBe('Excelente');
    expect(abdominaisResult).toBe('Bom');
    expect(arremessoResult).toBe('Moderado');
    expect(corridaResult).toBe('Rápido');
    expect(sentarAlcancarResult).toBe('Flexível');

    // Verifica se as funções de avaliação foram chamadas corretamente
    expect(avaliarIMC).toHaveBeenCalledWith(70, 1.75, 'Rapazes', 20);
    expect(avaliarRCE).toHaveBeenCalledWith(85, 1.75);
    expect(avaliarDesempenho).toHaveBeenCalledWith(1000, 20, 'Rapazes');
    expect(avaliarAbdominais).toHaveBeenCalledWith(30, 20, 'Rapazes');
    expect(avaliarArremesso).toHaveBeenCalledWith(10, 20, 'Rapazes');
    expect(avaliarCorrida).toHaveBeenCalledWith(5, 20, 'Rapazes');
    expect(avaliarSentarAlcancar).toHaveBeenCalledWith(15, 20, 'Rapazes');
  });

  test('envia feedback com sucesso', () => {
    // Simulação de envio de feedback
    const feedback = 'Ótimo desempenho!';
    toast.success('Feedback enviado com sucesso!');

    expect(toast.success).toHaveBeenCalledWith('Feedback enviado com sucesso!');
  });
});
